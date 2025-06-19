export const publicPaths = {
    home: '/',
    contact: '/contacto',
    notFound: '*',
}

export const authPaths = {
    login: '/login',
    register: '/register',
}

export const userPaths = {
    profile: '/perfil',
    map: '/mapa',
    favorites: '/favoritos',
    technicianRating: '/calificacion-tecnico/:technicianId',
}

export const technicianPaths = {
    dashboard: '/panel/tecnico',
    schedule: '/panel/tecnico/agenda',
    howToUse: '/panel/tecnico/guia-de-uso',
    rating: '/panel/tecnico/calificacion',
    bookings: '/panel/tecnico/reservas',
}