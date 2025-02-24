import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  Bell,
  ChevronDown,
  Download,
  TrendingUp,
  DollarSign,
  UserCheck,
  BarChart3,
  Clock,
  Search,
  CalendarDays,
  Filter,
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

const attendanceData = [
  { name: 'Ene', value: 1200 },
  { name: 'Feb', value: 1800 },
  { name: 'Mar', value: 1600 },
  { name: 'Abr', value: 2100 },
  { name: 'May', value: 1900 },
  { name: 'Jun', value: 2400 },
];

const categoryData = [
  { name: 'Conferencias', value: 35 },
  { name: 'Talleres', value: 25 },
  { name: 'Networking', value: 20 },
  { name: 'Ferias', value: 15 },
  { name: 'Otros', value: 5 },
];

const satisfactionData = [
  { name: 'Muy satisfecho', value: 45 },
  { name: 'Satisfecho', value: 30 },
  { name: 'Neutral', value: 15 },
  { name: 'Insatisfecho', value: 7 },
  { name: 'Muy insatisfecho', value: 3 },
];

const COLORS = ['#94A3B8', '#60A5FA', '#34D399', '#F472B6', '#A78BFA'];

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Calendar, label: 'Eventos', active: false },
  { icon: Users, label: 'Asistentes', active: false },
  { icon: Settings, label: 'Configuración', active: false },
];

function StatCard({ title, value, icon: Icon, trend, color }: {
  title: string;
  value: string;
  icon: any;
  trend?: { value: string; positive: boolean };
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-2xl font-mono font-medium text-gray-900">
            {value}
          </p>
          {trend && (
            <div className="mt-2 flex items-center">
              <span
                className={`text-sm font-medium ${
                  trend.positive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {trend.value}
              </span>
              <TrendingUp
                className={`ml-1 w-4 h-4 ${
                  trend.positive ? 'text-emerald-600' : 'text-red-600'
                } ${!trend.positive ? 'transform rotate-180' : ''}`}
              />
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-lg ${color} bg-opacity-10`}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm font-mono text-blue-600">
          {payload[0].value.toLocaleString()} asistentes
        </p>
      </div>
    );
  }
  return null;
}

function Dashboard() {
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 px-4 py-6">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">OACMA</span>
        </div>

        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                item.active
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <span className="text-sm font-medium">Últimos 30 días</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=32&h=32&q=80"
                  alt="Profile"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  Carlos Ruiz
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard de Eventos
              </h1>
              <p className="text-gray-600">
                Resumen de actividad y métricas clave
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Exportar Datos</span>
            </button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total de Eventos"
              value="124"
              icon={Calendar}
              trend={{ value: '+12.5%', positive: true }}
              color="text-blue-600"
            />
            <StatCard
              title="Asistentes Totales"
              value="8,492"
              icon={Users}
              trend={{ value: '+18.2%', positive: true }}
              color="text-emerald-600"
            />
            <StatCard
              title="Ingresos Generados"
              value="$142,384"
              icon={DollarSign}
              trend={{ value: '+8.1%', positive: true }}
              color="text-orange-600"
            />
            <StatCard
              title="Tasa de Asistencia"
              value="94.2%"
              icon={UserCheck}
              trend={{ value: '-2.4%', positive: false }}
              color="text-violet-600"
            />
          </div>

          {/* Charts grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Attendance trend */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Tendencia de Asistencia
                  </h2>
                  <p className="text-sm text-gray-600">
                    Últimos 6 meses
                  </p>
                </div>
                <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="name"
                      stroke="#6B7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#6B7280"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563EB"
                      strokeWidth={2}
                      dot={{ fill: '#2563EB', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Distribución por Categoría
                  </h2>
                  <p className="text-sm text-gray-600">
                    Eventos activos
                  </p>
                </div>
                <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                  <Clock className="w-4 h-4" />
                </button>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {categoryData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600">{item.name}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Satisfaction chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Satisfacción del Evento
                </h2>
                <p className="text-sm text-gray-600">
                  Basado en encuestas post-evento
                </p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="name"
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#6B7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;