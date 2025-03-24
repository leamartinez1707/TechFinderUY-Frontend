import React, { Suspense } from "react";
import { routes } from "./routesConfig";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import AuthLayout from "../layouts/AuthLayout";
import Loader from "../components/loader/Loader";


const HomePage = React.lazy(() => import("../pages/HomePage"));
const NotFound = React.lazy(() => import("../pages/NotFoundPage"));
const AuthPage = React.lazy(() => import("../pages/AuthPage"));
const ContactPage = React.lazy(() => import("../pages/ContactPage"));
const DashboardPage = React.lazy(() => import("../pages/DashboardPage"));
const ProfilePage = React.lazy(() => import("../pages/User/ProfilePage"));

// Mapeo de rutas
const routesMap = [
    { path: routes.home, element: <HomePage />, index: true },
    { path: routes.contact, element: <ContactPage /> },
    { path: routes.notFound, element: <NotFound /> },
    { path: routes.dashboard, element: <DashboardPage /> },
    { path: routes.profile, element: <ProfilePage /> }
];

const authRoutes = [
    { path: routes.login, element: <AuthPage /> },
    { path: routes.register, element: <AuthPage /> },
]

const Router = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Routes>

                    <Route element={<AuthLayout />}>
                        {authRoutes.map(({ path, element }) => (
                            <Route key={path} element={element} path={path} />
                        ))}
                    </Route>

                    <Route element={<MainLayout />}>
                        {routesMap.map(({ path, element, index }) => (
                            <Route key={path} element={element} path={path} index={index} />
                        ))}
                    </Route>

                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default Router