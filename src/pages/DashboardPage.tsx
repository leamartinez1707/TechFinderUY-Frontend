import DashboardUi from "@/components/technician/DashboardUI"
import UserDashboard from "@/components/user/UserDashboard"
import { useAuth } from "@/context/AuthContext"

const DashboardPage = () => {
    const { user } = useAuth()
    const isTechnician = user && 'technician' in user && user.technician !== null ? true : false
    return (
        <>
            {isTechnician ? <DashboardUi /> : <UserDashboard />}
        </>
    )
}

export default DashboardPage;