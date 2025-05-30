import type { UserDataProps } from './UserData';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, X, Save } from 'lucide-react';

type UserPersonalDataProps = Pick<
    UserDataProps,
    | 'isEditingPersonal'
    | 'user'
    | 'editedPersonal'
    | 'setIsEditingPersonal'
    | 'setEditedPersonal'
    | 'handleSavePersonal'
>;

const UserPersonalData = ({ editedPersonal, handleSavePersonal, isEditingPersonal, setEditedPersonal, setIsEditingPersonal, user }: UserPersonalDataProps) => {
    return (
        <TabsContent value="personal" >
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
        </TabsContent >
    )
}

export default UserPersonalData