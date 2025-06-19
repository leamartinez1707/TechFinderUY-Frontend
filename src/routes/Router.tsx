import { FC, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import PrivateRoute from "@/layouts/PrivateRouteLayout";
import { authPaths, publicPaths, technicianPaths, userPaths } from "./routesConfig";
import PageWrapper from "@/components/motion/PageWrapper";
import { AnimatePresence } from "motion/react"
import { Loader } from "lucide-react";

const HomePage = lazy(() => import("@/pages/HomePage"));
const NotFound = lazy(() => import("@/pages/NotFoundPage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));

// User pages 
const ProfilePage = lazy(() => import("@/pages/User/ProfilePage"));
const FavoritesPage = lazy(() => import("@/pages/User/FavoritesPage"));

// Dashboard page (accessible to both users and technicians)
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));

// Technician pages
const Schedule = lazy(() => import("@/components/technician/Schedule"));
const HowToUse = lazy(() => import("@/pages/Tech/HowToUsePage"));
const BookingsPage = lazy(() => import("@/pages/Tech/BookingsPage"));

const RatingPage = lazy(() => import("@/pages/Tech/RatingPage"));

// Rutas comunes
const publicRoutes = [
    { path: publicPaths.home, element: <HomePage />, index: true },
    { path: publicPaths.contact, element: <ContactPage /> },
    { path: publicPaths.notFound, element: <NotFound /> },
];

// Rutas de autenticación
const authRoutes = [
    { path: authPaths.login, element: <AuthPage /> },
    { path: authPaths.register, element: <AuthPage /> },
];

// Rutas privadas
const userRoutes = [
    { path: userPaths.profile, element: <ProfilePage /> },
    { path: userPaths.favorites, element: <FavoritesPage /> },
    { path: userPaths.map, element: <DashboardPage /> },
    { path: userPaths.technicianRating, element: <RatingPage /> },
];

// Rutas para técnicos
const technicianRoutes = [
    { path: technicianPaths.schedule, element: <Schedule /> },
    { path: technicianPaths.howToUse, element: <HowToUse /> },
    { path: technicianPaths.rating, element: <RatingPage /> },
    { path: technicianPaths.bookings, element: <BookingsPage /> },
    { path: technicianPaths.dashboard, element: <DashboardPage /> },
];

const Router: FC = () => {
    const { isAuthenticated, isLoading, user } = useAuth();

    const location = useLocation();

    // Evita redirigir en rutas privadas como /panel
    const isOnPublicPage = location.pathname === '/login' || location.pathname === '/register';

    if (isLoading) return <Loader />;

    if (isAuthenticated && isOnPublicPage) {
        return user?.technician ? <Navigate to="/panel/tecnico" replace /> : <Navigate to="/mapa" replace />;
    }

    return (

        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Rutas de autenticacion */}
                <Route element={<MainLayout />}>
                    {authRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={<PageWrapper>{element}</PageWrapper>} />
                    ))}

                    {/* Rutas comunes */}

                    {/* Rutas publicas */}
                    {publicRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={<PageWrapper>{element}</PageWrapper>} />
                    ))}
                    {/* Rutas del usuario */}
                    {userRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<PageWrapper><PrivateRoute element={element} requiredRole="user" /></PageWrapper>}
                        />
                    ))}
                    {/* Rutas del tecnico */}
                    {technicianRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<PageWrapper><PrivateRoute element={element} requiredRole="technician" /></PageWrapper>}
                        />
                    ))}
                </Route>

                {/* Ruta 404 */}
                <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
        </AnimatePresence>

    );
};

export default Router;
