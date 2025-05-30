import { useAuth } from "@/context/AuthContext"
import { useUsers } from "@/context/UsersContext"
import BookingsList from "@/components/bookings/BookingsList"
import { useBooking } from "@/context/BookingContext"
import { useBookingsPagination } from "@/hooks/useBookingsPagination"
import BookingsOrderButton from "@/components/bookings/BookingsOrderButton"
import BasicInformation from "@/components/user/profile/BasicInformation"
import UserData from "@/components/user/profile/UserData"
import { useEditProfile } from "@/hooks/useEditUserProfile"
import { useEffect } from "react"

const ProfilePage = () => {
  const { user } = useAuth()
  const { updateUserData } = useUsers()
  const { bookings, getUserBookings } = useBooking()

  const { activeTab, bookingCounts, bookingsOrder, currentPage, handleTabChange, paginatedBookings, setBookingsOrder, setCurrentPage, totalPages } = useBookingsPagination({ bookings })

  const { isEditingPersonal, isEditingContact, editedPersonal, editedContact, setIsEditingContact, setIsEditingPersonal, setEditedPersonal, setEditedContact, handleSaveContact, handleSavePersonal, passwordData, setIsChangingPassword, setPasswordData, handleChangePassword, isChangingPassword, passwordErrors, setPasswordErrors } = useEditProfile({ user, updateUserData })

  // Efecto para cargar las reservas al montar el componente
  useEffect(() => {
    if (user?.username && !user?.technician) {
      // Cargar las reservas al montar el componente
      getUserBookings(user.username);
    }
  }, []);

  // Restablece la página actual a 1 cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Actualizar estados de edición cuando cambia el usuario
  useEffect(() => {
    if (user) {
      setEditedPersonal({
        firstName: user?.firstName,
        lastName: user?.lastName,
      })

      setEditedContact({
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
      })
    }
  }, [user])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información básica */}
        <BasicInformation
          user={user}
        />
        {/* Columna derecha - Tabs con diferentes secciones */}
        <UserData
          user={user}
          isEditingPersonal={isEditingPersonal}
          isEditingContact={isEditingContact}
          editedPersonal={editedPersonal}
          editedContact={editedContact}
          setIsEditingPersonal={setIsEditingPersonal}
          setIsEditingContact={setIsEditingContact}
          setEditedPersonal={setEditedPersonal}
          setEditedContact={setEditedContact}
          handleSavePersonal={handleSavePersonal}
          handleSaveContact={handleSaveContact}
          passwordData={passwordData}
          setIsChangingPassword={setIsChangingPassword}
          setPasswordData={setPasswordData}
          handleChangePassword={handleChangePassword}
          isChangingPassword={isChangingPassword}
          passwordErrors={passwordErrors}
          setPasswordErrors={setPasswordErrors}
        />
      </div>
      <div className="mt-8 border-t pt-6">
        <h2 className="text-2xl font-bold mb-4">Historial de mis reservas</h2>
        <div>
          <p className="text-lg mb-4 text-gray-700 font-sans">- Puedes cambiar el orden de las reservas por fecha de creación, haciendo click en el boton de orden.</p>
          <BookingsOrderButton
            bookingsOrder={bookingsOrder}
            setBookingsOrder={setBookingsOrder}
          />
        </div>
        <BookingsList
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          bookingCounts={bookingCounts}
          paginatedBookings={paginatedBookings}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}

export default ProfilePage;

