import { Coordinates, Review } from "@/types"
import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180)
}

// Función para calcular la distancia entre dos puntos (fórmula de Haversine)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radio de la Tierra en km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distancia en km
  return distance
}

// Función para formatear fecha
export const formatDate = (date: Date | string) => {
  const validDate = typeof date === "string" ? new Date(date) : date;
  return validDate.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Función para obtener color de fondo basado en la calificación
export const getRatingColor = (rating: number) => {
  if (rating >= 4) return "bg-green-100 text-green-800"
  if (rating >= 3) return "bg-yellow-100 text-yellow-800"
  return "bg-red-100 text-red-800"
}

export const averageRating = (reviews: Review[]) => {
  if (!reviews || reviews.length === 0) return 0
  return reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0
}

export const getRouteDistance = async (start: Coordinates, end: Coordinates) => {
  try {
    const url = 'https://api.openrouteservice.org/v2/matrix/driving-car'
    const response = await axios(url, {
      params: {
        api_key: process.env.VITE_OPEN_ROUTE_API,
        start: `${start.lng},${start.lat}`, // Formato: lng,lat
        end: `${end.lng},${end.lat}`,
      }
    })
    return response
  } catch (error) {
    console.error('Error fetching route distance:', error)
    throw error
  }
}


export const searchDirectionLatLon = async (direccion: string) => {
  if (!direccion) return;
  try {
    const respuesta = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`
    );
    const data = await respuesta.json();
    return data.length > 0 ? { lat: parseFloat(data[0].lat), long: parseFloat(data[0].lon) } : null;
  } catch {
    return null;
  }
}


export const getPasswordStrength = (password: string): { strength: number; text: string; color: string } => {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const levels = [
    { text: 'Muy débil', color: 'bg-red-500' },
    { text: 'Débil', color: 'bg-orange-500' },
    { text: 'Regular', color: 'bg-yellow-500' },
    { text: 'Fuerte', color: 'bg-green-500' },
    { text: 'Muy fuerte', color: 'bg-green-600' }
  ];

  return { strength, ...levels[strength] };
};