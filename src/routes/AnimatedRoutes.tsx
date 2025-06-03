import Loader from "@/components/loader/Loader"
import { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import Router from "./Router"

const AnimatedRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Router />
            </Suspense>
        </BrowserRouter>
    )
}

export default AnimatedRoutes