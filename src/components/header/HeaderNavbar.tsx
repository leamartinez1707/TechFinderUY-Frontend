import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { isTechnician } from "@/utils"

const HeaderNavbar = () => {

  const [isOpen, setIsOpen] = useState(false)

  const { isAuthenticated, logout, user } = useAuth()


  const authNavItems = [
    { name: 'Iniciar sesión', url: '/login' },
    { name: 'Registrarse', url: '/register' },
    { name: 'Contacto', url: '/contacto' },
  ]

  const publicNavItems = [
    { name: 'Inicio', url: '/' },
    { name: 'Contacto', url: '/contacto' },
  ]

  const userNavItems = [
    { name: 'Mapa', url: '/mapa' },
    { name: 'Perfil', url: '/perfil' },
    { name: 'Favoritos', url: '/favoritos' },
  ]

  const technicianNavItems = [
    { name: 'Panel', url: '/panel/tecnico' },
    { name: 'Reservas', url: '/panel/tecnico/reservas' },
    { name: 'Guía de uso', url: '/panel/tecnico/guia-de-uso' },
  ]

  return (
    <header className="w-full fixed top-0 antialiased text-gray-700 mx-auto bg-gray-100 border-b-2 border-gray-50 shadow-md z-50 ">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-0 text-right mx-auto max-w-7xl">

        <div className="flex flex-row w-full items-center justify-between p-4 md:flex-1">
          <Link to="/" className="text-lg font-semibold tracking-widest text-gray-900 rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">buscoTécnico</Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg md:hidden focus:outline-none focus:shadow-outline cursor-pointer" >

            {!isOpen ? (
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            )
            }
          </button>
        </div>

        <nav className={`${isOpen ? 'block' : 'hidden'} md:block flex flex-col w-full pb-4 md:flex-row md:pb-0`}>

          {!isAuthenticated ? authNavItems.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) => isActive ? 'font-semibold hover:underline py-2 px-4 rounded-sm transition-transform ease-out duration-200 md:w-full' :
                'py-2 px-4 md:w-full hover:underline'}
              to={item.url} >
              {item.name}
            </NavLink>
          ))
            : (
              <>
                {
                  publicNavItems.map((item, index) => (
                    <NavLink
                      key={index}
                      className={({ isActive }) => isActive ? 'font-semibold hover:underline py-2 px-4 rounded-sm transition-transform ease-out duration-200 md:w-full mr-auto md:mr-0' :
                        'py-2 px-4 md:w-full hover:underline mr-auto'}
                      to={item.url} >
                      {item.name}
                    </NavLink>
                  ))
                }
                {
                  isTechnician(user!) ? technicianNavItems.map((item, index) => (
                    <NavLink
                      key={index}
                      className={({ isActive }) => isActive ? 'font-semibold hover:underline py-2 px-4 rounded-sm transition-transform ease-out duration-200 md:w-full mr-auto md:mr-0' :
                        'py-2 px-4 md:w-full hover:underline mr-auto'}
                      to={item.url} >
                      {item.name}
                    </NavLink>
                  )) : !isTechnician(user!) && userNavItems.map((item, index) => (
                    <NavLink
                      key={index}
                      className={({ isActive }) => isActive ? 'font-semibold hover:underline py-2 px-4 rounded-sm transition-transform ease-out duration-200 md:w-full mr-auto md:mr-0' :
                        'py-2 px-4 md:w-full hover:underline mr-auto'}
                      to={item.url} >
                      {item.name}
                    </NavLink>
                  ))
                }

                <button
                  onClick={logout}
                  className="py-2 px-4 text-red-500 hover:cursor-pointer hover:underline mr-auto">Cerrar sesión</button>
              </>
            )
          }
        </nav>
      </div>
    </header>
  )
}
{/* <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script> */ }


export default HeaderNavbar