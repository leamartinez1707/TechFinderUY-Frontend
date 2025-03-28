// export const routes = {
//     home: "/",
//     login: "/login",
//     register: "/register",
//     dashboard: "/panel",
//     profile: "/perfil",

//     schedule: "/panel/tecnico/agenda",

//     contact: "/contacto",
//     notFound: "*",
// };

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
    dashboard: '/panel',
}

export const technicianPaths = {
    schedule: '/panel/tecnico/agenda',
    howToUse: '/panel/tecnico/guia-de-uso',
}

export const bothUserPaths = {
    dashboard: '/panel',
}