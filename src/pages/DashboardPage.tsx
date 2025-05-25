import DashboardUi from "@/components/technician/DashboardUI"
import UserDashboard from "@/components/user/UserDashboard"
import { useAuth } from "@/context/AuthContext"

const DashboardPage = () => {
    const { user } = useAuth()

    // const isTechnician = user && 'technician' in user && user.technician !== null ? true : false
    return (
        <div>
            {user?.technician ? <DashboardUi /> : <UserDashboard />}
        </div>
    )
}

export default DashboardPage;