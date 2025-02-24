import React, { useState } from 'react';
import {
  Star,
  StarHalf,
  MapPin,
  Grid2x2,
  List,
  ChevronDown,
  Heart,
  Mail,
  Phone,
  Clock,
  Filter,
  SlidersHorizontal,
  Check,
} from 'lucide-react';
import { Listbox, Transition, Switch } from '@headlessui/react';

const sortOptions = [
  { id: 'rating', name: 'Calificación' },
  { id: 'name', name: 'Nombre' },
  { id: 'popularity', name: 'Popularidad' },
  { id: 'price', name: 'Precio promedio' },
];

const providers = [
  {
    id: 1,
    name: 'TechnoEvents Solutions',
    category: 'Producción Audiovisual',
    rating: 4.8,
    reviews: 128,
    locations: ['Ciudad de México', 'Monterrey'],
    services: ['Sonido', 'Iluminación', 'Video Mapping'],
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&h=300&q=80',
    availability: true,
    priceRange: '$$',
    description: 'Especialistas en producción audiovisual para eventos corporativos y conciertos.',
  },
  {
    id: 2,
    name: 'Catering Deluxe',
    category: 'Servicios de Catering',
    rating: 4.6,
    reviews: 95,
    locations: ['Guadalajara', 'Ciudad de México'],
    services: ['Banquetes', 'Coffee Break', 'Coctelería'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&h=300&q=80',
    availability: true,
    priceRange: '$$$',
    description: 'Experiencias gastronómicas únicas para eventos exclusivos.',
  },
  {
    id: 3,
    name: 'EventSpace Pro',
    category: 'Venues',
    rating: 4.9,
    reviews: 156,
    locations: ['Ciudad de México'],
    services: ['Salones', 'Jardines', 'Terrazas'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=300&h=300&q=80',
    availability: false,
    priceRange: '$$$$',
    description: 'Los espacios más exclusivos para eventos corporativos y sociales.',
  },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={`w-4 h-4 ${
              starValue <= rating
                ? 'text-yellow-400 fill-current'
                : starValue - 0.5 <= rating
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
            }`}
          />
        );
      })}
    </div>
  );
}

function ProviderCard({ provider, isListView }: { provider: typeof providers[0]; isListView: boolean }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
        isListView ? 'flex gap-6' : ''
      }`}
    >
      <div className={isListView ? 'w-48 shrink-0' : ''}>
        <div className={`${isListView ? 'h-full' : 'aspect-square'} relative`}>
          <img
            src={provider.image}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors duration-300"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
              }`}
            />
          </button>
        </div>
      </div>

      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {provider.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{provider.category}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              provider.availability
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {provider.availability ? 'Disponible' : 'No disponible'}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <RatingStars rating={provider.rating} />
          <span className="text-sm text-gray-600">
            {provider.rating} ({provider.reviews} reseñas)
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{provider.locations.join(', ')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {provider.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300">
            Contactar
          </button>
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300">
            <Mail className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Providers() {
  const [isListView, setIsListView] = useState(false);
  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Directorio de Proveedores
            </h1>
            <p className="text-gray-600">
              Encuentra los mejores proveedores para tu evento
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setIsListView(false)}
                className={`p-2 rounded ${
                  !isListView ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                }`}
              >
                <Grid2x2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsListView(true)}
                className={`p-2 rounded ${
                  isListView ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <Listbox value={sortBy} onChange={setSortBy}>
              <div className="relative">
                <Listbox.Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Ordenar por: {sortBy.name}</span>
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
                    {sortOptions.map((option) => (
                      <Listbox.Option
                        key={option.id}
                        value={option}
                        className={({ active }) =>
                          `${
                            active ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                          } cursor-pointer select-none relative py-2 pl-10 pr-4`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {option.name}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
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
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Filtros
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Comparar proveedores
                  </h3>
                  <Switch
                    checked={showComparison}
                    onChange={setShowComparison}
                    className={`${
                      showComparison ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        showComparison ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Categorías
                  </h3>
                  <div className="space-y-2">
                    {['Todos', 'Audiovisual', 'Catering', 'Venues', 'Decoración'].map(
                      (category) => (
                        <label
                          key={category}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          {category}
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Rango de precios
                  </h3>
                  <div className="space-y-2">
                    {['$', '$$', '$$$', '$$$$'].map((price) => (
                      <label
                        key={price}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        {price}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Calificación mínima
                  </h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <input
                          type="radio"
                          name="rating"
                          className="border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex items-center gap-1">
                          <RatingStars rating={rating} />
                          <span>y más</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Provider grid */}
          <div className="flex-1">
            <div
              className={
                isListView
                  ? 'space-y-6'
                  : 'grid grid-cols-1 md:grid-cols-2 gap-6'
              }
            >
              {providers.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  isListView={isListView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Providers;