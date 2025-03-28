// PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import type { AuthUser, UserTechnician } from "../types";
import { useAuth } from "@/context/AuthContext";

interface PrivateRouteProps {
    element: React.ReactNode;
    requiredRole?: "technician" | "user" | 'any' // Rol que se requiere para acceder
}

const roles = {
    technician: "technician",
    user: "user",
    any: "any"
} as const; // Definimos los roles como constantes para evitar errores de escritura

// Guard que valida si el usuario es un técnico
function isTechnician(user: AuthUser | null): user is UserTechnician {
    return user !== null && 'technician' in user && user.technician.id !== undefined;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, requiredRole }) => {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Si hay un rol requerido, validamos si el usuario tiene el rol adecuado
    if (requiredRole) {
        if (requiredRole === roles.technician && !isTechnician(user)) {
            return <Navigate to="/not-found" />;
        }

        if (requiredRole === roles.user && isTechnician(user)) {
            return <Navigate to="/not-found" />;
        }
    }

    return <>{element}</>; // Si pasa las validaciones, renderiza el componente
};

export default PrivateRoute;
