import { useAuth } from "@/context/AuthContext";
import { useUsers } from "@/context/UsersContext";
import { Star } from "lucide-react"

const FavoriteIcon = ({ technicianId }: { technicianId: number }) => {

    const { addUserFavorite, deleteUserFavorite, favorites } = useUsers()
    const { user } = useAuth();
    if (!user) return null;
    const isFavorite = favorites.find(fav => (fav.technician.id === technicianId && fav.user.id === user.id))?.id;

    const handleFavorites = () => {
        if (isFavorite) {
            deleteUserFavorite(user.id, technicianId);
        } else {
            addUserFavorite(user.id, technicianId);
        }
    }

    return (
        <Star
            onClick={() => handleFavorites()}
            className={`${isFavorite ? 'fill-yellow-400' : 'fill-transparent'} hover:fill-transparent transition-colors duration-100 hover:cursor-pointer`} />
    )
}

export default FavoriteIcon;