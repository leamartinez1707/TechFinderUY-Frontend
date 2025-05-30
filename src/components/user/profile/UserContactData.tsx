import React from 'react'
import { UserDataProps } from './UserData'
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, X, Save } from 'lucide-react';

type UserContactDataProps = Pick<UserDataProps,
    | 'isEditingContact'
    | 'user'
    | 'editedContact'
    | 'setIsEditingContact'
    | 'setEditedContact'
    | 'handleSaveContact'
>

const UserContactData = ({ editedContact, handleSaveContact, isEditingContact, setEditedContact, setIsEditingContact, user }: UserContactDataProps) => {
    return (
        <TabsContent value="contact" >
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
        </TabsContent >
    )
}

export default UserContactData