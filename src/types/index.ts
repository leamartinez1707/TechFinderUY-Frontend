import { z } from "zod";
import { signInSchema, signUpSchema, signUpUserSchema } from "../schemas/auth-schema";
import { ReviewSchema, TechReviewSchema } from "@/schemas/technician-schema";

export type SignUp = z.infer<typeof signUpSchema>;
export type SignUpUser = z.infer<typeof signUpUserSchema>;
export type SignIn = z.infer<typeof signInSchema>;

export type AuthUser = User | UserTechnician | null;
// Usuario logueado
export type LoggedUser = User & { technician?: Technician };

// User types

export type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
}

export interface PersonalFormData {
    firstName: string
    lastName: string
}

export interface ContactFormData {
    email: string
    phone: string
    address: string
}

export interface PasswordFormData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export interface PasswordErrors {
    currentPassword: string
    newPassword: string
    confirmPassword: string
}

export type UserTechnician = User & { technician: Technician };

// Technician

export type TechnicianReview = z.infer<typeof TechReviewSchema>;

export type Review = z.infer<typeof ReviewSchema>;

export type Coordinates = {
    lat: number;
    lng: number;
}

export type EditProfileData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export type EditTechnicalData = {
    specialization: string;
    services: string[];
}
export type EditLocationData = {
    latitude: number;
    longitude: number;
    address: string;
}

// Tecnicos en la lista de tecnicos
export type Technicians = {
    specialization: string;
    services: string[];
    id: number;
    latitude: string;
    longitude: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
}

export type Technician = {
    id: number;
    specialization: string;
    latitude: string;
    longitude: string;
    services: string[];
}


// Bookings

export type CreateBooking = {
    date: string,
    status: string,
    comment: string,
    user: number,
    technician: number
}

export type Booking = {
    id: number;
    date: string;
    status: string;
    comment: string;
}

export type Bookings = {
    id: number;
    date: string;
    status: string;
    comment: string;
    user: object;
    technician: {
        user: object
    };
}

export interface BookingsArray {
    id: number;
    date: string;
    status: string;
    comment: string;
    user: BookingUser;
    technician: BookingTechnician;
}

export interface BookingTechnician {
    id: number;
    specialization: string;
    latitude: number;
    longitude: number;
    services: string[];
    user: string;
    reviews: BookingReview[];
    bookings: BookingReview[];
}

export interface BookingReview {
    id: number;
    rating: number;
    comment: string;
    date: Date;
    user: string;
    technician: string;
}

export interface BookingUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    isActive: boolean;
    technician: Technician;
    reviews: Review[];
    bookings: string[];
}

// Tipos básicos para las reservas
export type BookingStatus = "Pendiente" | "Aceptado" | "Completado" | "Rechazado";