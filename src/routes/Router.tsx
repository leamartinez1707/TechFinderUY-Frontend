import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import PrivateRoute from "@/layouts/PrivateRouteLayout";
import { authPaths, publicPaths, technicianPaths, userPaths } from "./routesConfig";
import RatingPage from "@/pages/Tech/RatingPage";
import BookingsPage from "@/pages/Tech/BookingsPage";
import PageWrapper from "@/components/motion/PageWrapper";
import { AnimatePresence } from "motion/react"
import React from "react";

const HomePage = React.lazy(() => import("@/pages/HomePage"));
const NotFound = React.lazy(() => import("@//pages/NotFoundPage"));
const AuthPage = React.lazy(() => import("@//pages/AuthPage"));
const ContactPage = React.lazy(() => import("@/pages/ContactPage"));
// User pages 
const ProfilePage = React.lazy(() => import("@/pages/User/ProfilePage"));
const FavoritesPage = React.lazy(() => import("@/pages/User/FavoritesPage"));

// Dashboard page (accessible to both users and technicians)
const DashboardPage = React.lazy(() => import("@/pages/DashboardPage"));

// Technician pages
const Schedule = React.lazy(() => import("@/components/technician/Schedule"));
const HowToUse = React.lazy(() => import("@/pages/Tech/HowToUsePage"));

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
];

// Rutas para técnicos
const technicianRoutes = [
    { path: technicianPaths.schedule, element: <Schedule /> },
    { path: technicianPaths.howToUse, element: <HowToUse /> },
    { path: technicianPaths.rating, element: <RatingPage /> },
    { path: technicianPaths.bookings, element: <BookingsPage /> },
    { path: technicianPaths.dashboard, element: <DashboardPage /> },
];

const Router: React.FC = () => {

    const location = useLocation();
    return (

        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Rutas públicas */}
                <Route element={<AuthLayout />}>
                    {authRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={<PageWrapper>{element}</PageWrapper>} />
                    ))}
                </Route>

                {/* Rutas comunes */}
                <Route element={<MainLayout />}>
                    {publicRoutes.map(({ path, element }) => (
                        <Route key={path} path={path} element={<PageWrapper>{element}</PageWrapper>} />
                    ))}

                    {userRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<PageWrapper><PrivateRoute element={element} requiredRole="user" /></PageWrapper>}
                        />
                    ))}

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
