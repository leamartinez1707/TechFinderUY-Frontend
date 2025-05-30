import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Loader from "@/components/loader/Loader";
import PrivateRoute from "@/layouts/PrivateRouteLayout";
import { authPaths, publicPaths, technicianPaths, userPaths, bothUserPaths } from "./routesConfig";
import RatingPage from "@/pages/Tech/RatingPage";
import BookingsPage from "@/pages/Tech/BookingsPage";

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
];

// Rutas para técnicos
const technicianRoutes = [
    { path: technicianPaths.schedule, element: <Schedule /> },
    { path: technicianPaths.howToUse, element: <HowToUse /> },
    { path: technicianPaths.rating, element: <RatingPage /> },
    { path: technicianPaths.bookings, element: <BookingsPage /> },
];

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* Rutas públicas */}
                    <Route element={<AuthLayout />}>
                        {authRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                    </Route>

                    {/* Rutas comunes */}
                    <Route element={<MainLayout />}>
                        {publicRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}

                        {/* Rutas de usuario */}
                        {userRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={<PrivateRoute element={element} requiredRole="user" />} />
                        ))}

                        {/* Rutas de técnico */}
                        {technicianRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={<PrivateRoute element={element} requiredRole="technician" />} />
                        ))}

                        {/* Rutas comunes accesibles para ambos roles (usuarios y técnicos) */}
                        <Route
                            key={bothUserPaths.dashboard}
                            path={bothUserPaths.dashboard}
                            element={<PrivateRoute element={<DashboardPage />} requiredRole="any" />}
                        />
                    </Route>

                    {/* Ruta 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
