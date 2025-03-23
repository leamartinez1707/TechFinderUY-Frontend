import DashboardUi from "@/components/technician/DashboardUI"
import UserDashboard from "@/components/user/UserDashboard"
import { useAuth } from "@/context/AuthContext"

const DashboardPage = () => {
    const { user } = useAuth()
    console.log(user)
    const isTechnician = user && 'technician' in user && user.technician.id ? true : false
    console.log(isTechnician)
    return (
        <>
            {isTechnician ? <DashboardUi /> : <UserDashboard />}
        </>
    )
}

export default DashboardPage;