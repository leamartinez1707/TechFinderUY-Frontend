import Loader from "@/components/loader/Loader"
import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import Router from "./Router"

const AnimatedRoutes = () => {

    console.log('Environemnt:', import.meta.env.ENVIRONMENT)
    // Deshabilitar console logs en producción
    if (import.meta.env.ENVIRONMENT === 'production') {
        console.log = () => { }
        console.warn = () => { }
        console.error = () => { }
    }

    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Router />
            </Suspense>
        </BrowserRouter>
    )
}

export default AnimatedRoutes