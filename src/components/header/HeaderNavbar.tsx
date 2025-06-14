import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { isTechnician } from "@/utils"
import { LogInIcon, Star, User2Icon } from "lucide-react"

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
    <header className="fixed top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800">
          buscoTécnico
        </Link>

        {/* Botón hamburguesa (solo visible en mobile) */}
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

        {/* Navegación: visible siempre en desktop, toggle en mobile */}
        <nav
          className={`${isOpen ? 'block' : 'hidden'
            } absolute top-16 left-0 w-full bg-white md:bg-transparent md:static md:flex md:items-center md:gap-6 md:w-auto`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center px-4 md:px-0 py-4 md:py-0 gap-2 md:gap-4">
            {!isAuthenticated ? (
              authNavItems.map((item) => (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={({ isActive }) =>
                    isActive
                      ? 'font-semibold underline'
                      : 'text-gray-700 hover:underline'
                  }
                >
                  {item.name}
                </NavLink>
              ))
            ) : (
              <>
                {publicNavItems.map((item) => (
                  <NavLink
                    key={item.url}
                    to={item.url}
                    className={({ isActive }) =>
                      isActive
                        ? 'font-semibold underline'
                        : 'text-gray-700 hover:underline'
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}

                {(isTechnician(user!) ? technicianNavItems : userNavItems).map(
                  (item) => (
                    <NavLink
                      key={item.url}
                      to={item.url}
                      className={({ isActive }) =>
                        isActive
                          ? 'font-semibold underline flex items-center gap-1'
                          : 'text-gray-700 hover:underline flex items-center gap-1'
                      }
                    >
                      {item.url.includes('perfil') ? (
                        <User2Icon />
                      ) : item.url.includes('favoritos') ? (
                        <Star />
                      ) : (
                        item.name
                      )}
                    </NavLink>
                  )
                )}

                <button
                  onClick={logout}
                  className="text-gray-700 hover:underline flex items-center gap-1"
                >
                  <LogInIcon />
                  Salir
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default HeaderNavbar