import React, { useState } from 'react';
import { Search, Calendar, MapPin, Filter, ChevronDown } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const categories = [
  'Todos',
  'Conferencias',
  'Talleres',
  'Networking',
  'Ferias',
  'Seminarios',
];

const locations = [
  'Ciudad de México',
  'Guadalajara',
  'Monterrey',
  'Puebla',
  'Querétaro',
];

const events = [
  {
    id: 1,
    title: 'Conferencia de Innovación Tecnológica 2025',
    date: new Date('2025-04-15T10:00:00'),
    location: 'Ciudad de México',
    category: 'Conferencias',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    description: 'Únete a los líderes de la industria para explorar las últimas tendencias en tecnología e innovación.',
  },
  {
    id: 2,
    title: 'Workshop: Desarrollo Web Avanzado',
    date: new Date('2025-05-20T14:00:00'),
    location: 'Guadalajara',
    category: 'Talleres',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    description: 'Aprende las últimas técnicas y mejores prácticas en desarrollo web moderno.',
  },
  {
    id: 3,
    title: 'Networking: Tech Startups',
    date: new Date('2025-03-10T18:00:00'),
    location: 'Monterrey',
    category: 'Networking',
    status: 'finished',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    description: 'Conecta con otros emprendedores y expertos del ecosistema tecnológico.',
  },
  // Añade más eventos aquí...
];

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  finished: 'bg-gray-100 text-gray-700',
};

const statusLabels = {
  active: 'Activo',
  pending: 'Pendiente',
  finished: 'Finalizado',
};

function EventCard({ event }: { event: typeof events[0] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[event.status]}`}>
          {statusLabels[event.status]}
        </div>
        <h3 className="mt-4 text-xl font-semibold text-gray-900 font-montserrat">
          {event.title}
        </h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="font-roboto-mono text-sm">
              {format(event.date, "d 'de' MMMM, yyyy - HH:mm", { locale: es })}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>
        <p className="mt-4 text-gray-600 text-sm line-clamp-2">
          {event.description}
        </p>
        <button className="mt-6 w-full bg-violet-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-violet-700 focus:ring-4 focus:ring-violet-200 transition-all duration-300">
          Ver más
        </button>
      </div>
    </div>
  );
}

function Events() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            Eventos
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar eventos..."
              className="w-full md:w-80 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="relative">
              <Listbox.Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>Categoría: {selectedCategory}</span>
                <ChevronDown className="w-4 h-4" />
              </Listbox.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  {categories.map((category) => (
                    <Listbox.Option
                      key={category}
                      value={category}
                      className={({ active }) =>
                        `${
                          active ? 'bg-violet-50 text-violet-900' : 'text-gray-900'
                        } cursor-pointer select-none relative py-2 pl-10 pr-4`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {category}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600">
                              <Check className="w-4 h-4" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          {/* Status filters */}
          <div className="flex gap-2">
            {Object.entries(statusLabels).map(([status, label]) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${statusColors[status]} bg-opacity-20 hover:bg-opacity-30 transition-colors duration-300`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;