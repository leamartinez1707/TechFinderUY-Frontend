import { useState } from 'react';
import { Search, MapPin, Filter, Star, Clock } from 'lucide-react';
import { specialization } from '@/utils';

const SearchFilters = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Encuentra tu técnico ideal</h1>
                <p className="text-gray-600">
                    Conecta con técnicos certificados y confiables en tu área para reparar tus dispositivos electrónicos.
                </p>
            </div>

            {/* Main Search */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por servicio, marca o problema..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                </div>

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="lg:w-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                    <option value="">Todas las categorías</option>
                    {specialization.map(category => (
                        <option key={category.id} value={category.nombre.toLowerCase()}>{category.nombre}</option>
                    ))}
                </select>

                <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                    <Filter className="w-5 h-5" />
                    Filtros
                </button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Calificación mínima</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">Cualquiera</option>
                            <option value="4">4+ estrellas</option>
                            <option value="4.5">4.5+ estrellas</option>
                            <option value="5">Solo 5 estrellas</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilidad</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">Cualquiera</option>
                            <option value="now">Disponible ahora</option>
                            <option value="today">Hoy</option>
                            <option value="week">Esta semana</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rango de precios</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="">Cualquiera</option>
                            <option value="low">$500 - $1,500</option>
                            <option value="mid">$1,500 - $3,000</option>
                            <option value="high">$3,000+</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Quick Stats */}
            <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>12 técnicos en tu zona</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>8 disponibles hoy</span>
                </div>
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>Promedio 4.8★</span>
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;