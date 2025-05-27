/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react"
import { Mail, Phone, Home, Lock, Edit, Save, X, Camera, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { enqueueSnackbar } from "notistack"
import { useAuth } from "@/context/AuthContext"
import { useUsers } from "@/context/UsersContext"
import { PersonalFormData, ContactFormData, PasswordFormData, PasswordErrors } from "@/types"

const ProfilePage = () => {
  const { user } = useAuth()
  const { updateUserData } = useUsers()
  // Estado para el modo de edición
  const [isEditingPersonal, setIsEditingPersonal] = useState<boolean>(false)
  const [isEditingContact, setIsEditingContact] = useState<boolean>(false)
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false)

  // Estados para los datos editados
  const [editedPersonal, setEditedPersonal] = useState<PersonalFormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  })

  const [editedContact, setEditedContact] = useState<ContactFormData>({
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })

  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

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

  // Manejadores para guardar cambios
  const handleSavePersonal = async (): Promise<void> => {
    try {
      if (user?.id) {
        const updatedFields: Partial<typeof editedPersonal> = {}
        if (editedPersonal.firstName !== user.firstName) {
          updatedFields.firstName = editedPersonal.firstName
        }
        if (editedPersonal.lastName !== user.lastName) {
          updatedFields.lastName = editedPersonal.lastName
        }

        if (Object.keys(updatedFields).length > 0) {
          await updateUserData(user.id, updatedFields)
          enqueueSnackbar('Datos personales actualizados', { variant: 'success' })
        } else {
          enqueueSnackbar('No se realizaron cambios', { variant: 'info' })
        }
        setIsEditingPersonal(false)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }
    } catch (error) {
      enqueueSnackbar('Error al actualizar datos personales', { variant: 'error' })
    }
  }

  const handleSaveContact = async () => {
    try {
      if (user?.id) {
        const updatedFields: Partial<typeof editedContact> = {}

        if (editedContact.email !== user.email) {
          updatedFields.email = editedContact.email
        }

        if (editedContact.phone !== user.phone) {
          updatedFields.phone = editedContact.phone
        }

        if (editedContact.address !== user.address) {
          updatedFields.address = editedContact.address
        }
        // Solo hacer la actualización si hay algo que cambiar
        if (Object.keys(updatedFields).length > 0) {
          await updateUserData(user.id, updatedFields)
          enqueueSnackbar('Datos de contacto actualizados', { variant: 'success' })
        } else {
          enqueueSnackbar('No se realizaron cambios', { variant: 'info' })
        }
        setIsEditingContact(false)
      }
    } catch (error) {
      enqueueSnackbar('Error al actualizar datos de contacto', { variant: 'error' })
    }
  }


  const handleChangePassword = async (): Promise<void> => {
    // Validar contraseña actual
    if (passwordData.currentPassword.length < 6) {
      setPasswordErrors({
        ...passwordErrors,
        currentPassword: "La contraseña actual es incorrecta",
      })
      return
    }

    // Validar nueva contraseña
    if (passwordData.newPassword.length < 6) {
      setPasswordErrors({
        ...passwordErrors,
        newPassword: "La contraseña debe tener al menos 6 caracteres",
      })
      return
    }

    // Validar confirmación
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErrors({
        ...passwordErrors,
        confirmPassword: "Las contraseñas no coinciden",
      })
      return
    }

    try {
      // Aquí normalmente enviarías los datos al backend
      if (user?.id) {
        await updateUserData(user.id, {
          password: passwordData.newPassword,
        })
        enqueueSnackbar('Contraseña actualizada correctamente', { variant: 'success' })
      }
      // Limpiar campos y errores
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      setPasswordErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      setIsChangingPassword(false)
    } catch (error) {
      enqueueSnackbar('Error al actualizar la contraseña', { variant: 'error' })
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda - Información básica */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative mb-4">
                {/* <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatarUrl} alt={`${user?.firstName} ${user?.lastName}`} />
                  <AvatarFallback className="text-lg">{getInitials(user?.firstName, user?.lastName)}</AvatarFallback>
                </Avatar> */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Cambiar foto</span>
                </Button>
              </div>

              <h2 className="text-xl font-bold mt-2">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-muted-foreground">@{user?.username}</p>

              <div className="w-full mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user?.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user?.address}</span>
                </div>
              </div>

              <Separator className="my-6" />
              {/* <div className="w-full">
                <p className="text-sm text-muted-foreground">Miembro desde {formatDate(user?.createdAt)}</p>
              </div> */}
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha - Tabs con diferentes secciones */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Datos Personales</TabsTrigger>
              <TabsTrigger value="contact">Contacto</TabsTrigger>
              <TabsTrigger value="security">Seguridad</TabsTrigger>
            </TabsList>

            {/* Tab: Datos Personales */}
            <TabsContent value="personal">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Información Personal</CardTitle>
                    <CardDescription>Actualiza tu información personal</CardDescription>
                  </div>
                  {!isEditingPersonal ? (
                    <Button variant="ghost" size="icon" onClick={() => setIsEditingPersonal(true)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : null}
                </CardHeader>
                <CardContent>
                  {!isEditingPersonal ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-muted-foreground text-sm">Nombre</Label>
                          <p>{user?.firstName}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground text-sm">Apellido</Label>
                          <p>{user?.lastName}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">Nombre de usuario</Label>
                        <p>@{user?.username}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nombre</Label>
                          <Input
                            id="firstName"
                            value={editedPersonal.firstName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setEditedPersonal({ ...editedPersonal, firstName: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Apellido</Label>
                          <Input
                            id="lastName"
                            value={editedPersonal.lastName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setEditedPersonal({ ...editedPersonal, lastName: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Nombre de usuario</Label>
                        <Input id="username" value={user?.username} disabled className="bg-muted" />
                        <p className="text-xs text-muted-foreground">El nombre de usuario no se puede cambiar</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                {isEditingPersonal && (
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditedPersonal({
                          firstName: user?.firstName || "",
                          lastName: user?.lastName || "",
                        })
                        setIsEditingPersonal(false)
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button onClick={handleSavePersonal}>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            {/* Tab: Contacto */}
            <TabsContent value="contact">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Información de Contacto</CardTitle>
                    <CardDescription>Actualiza tus datos de contacto</CardDescription>
                  </div>
                  {!isEditingContact ? (
                    <Button variant="ghost" size="icon" onClick={() => setIsEditingContact(true)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : null}
                </CardHeader>
                <CardContent>
                  {!isEditingContact ? (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground text-sm">Correo electrónico</Label>
                        <p>{user?.email}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">Teléfono</Label>
                        <p>{user?.phone}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">Dirección</Label>
                        <p>{user?.address}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedContact.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditedContact({ ...editedContact, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={editedContact.phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditedContact({ ...editedContact, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          id="address"
                          value={editedContact.address}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setEditedContact({ ...editedContact, address: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
                {isEditingContact && (
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditedContact({
                          email: user?.email || "",
                          phone: user?.phone || "",
                          address: user?.address || "",
                        })
                        setIsEditingContact(false)
                      }}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveContact}>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            {/* Tab: Seguridad */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Seguridad</CardTitle>
                  <CardDescription>Gestiona tu contraseña y seguridad de la cuenta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isChangingPassword ? (
                    <Button onClick={() => setIsChangingPassword(true)}>
                      <Lock className="h-4 w-4 mr-2" />
                      Cambiar contraseña
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Contraseña actual</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                            setPasswordErrors({ ...passwordErrors, currentPassword: "" })
                          }}
                        />
                        {passwordErrors.currentPassword && (
                          <p className="text-sm text-destructive">{passwordErrors.currentPassword}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nueva contraseña</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                            setPasswordErrors({ ...passwordErrors, newPassword: "" })
                          }}
                        />
                        {passwordErrors.newPassword && (
                          <p className="text-sm text-destructive">{passwordErrors.newPassword}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                            setPasswordErrors({ ...passwordErrors, confirmPassword: "" })
                          }}
                        />
                        {passwordErrors.confirmPassword && (
                          <p className="text-sm text-destructive">{passwordErrors.confirmPassword}</p>
                        )}
                      </div>

                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setPasswordData({
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            })
                            setPasswordErrors({
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            })
                            setIsChangingPassword(false)
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleChangePassword}>Actualizar contraseña</Button>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2 text-destructive">Zona de peligro</h3>
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Eliminar cuenta</AlertTitle>
                      <AlertDescription>
                        Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate de estar seguro.
                      </AlertDescription>
                    </Alert>
                    <div className="mt-4">
                      <Button variant="destructive">Eliminar mi cuenta</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;

