import { useUsers } from "@/context/UsersContext"
import ReviewsData from "@/components/reviews/ReviewsData"
import { useAuth } from "@/context/AuthContext"
import { isTechnician } from "@/utils"

export const RatingPage = () => {
    const { user } = useAuth()
    const { reviews, allReviews } = useUsers()
    if (!user) return null; // Ensure user is defined before proceeding
    return (
        <ReviewsData
            reviews={isTechnician(user) ? reviews : allReviews}
        />
    )
}

export default RatingPage;

