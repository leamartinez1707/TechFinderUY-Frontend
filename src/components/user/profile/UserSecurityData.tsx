import React from 'react'
import { UserDataProps } from './UserData'
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

type UserSecurityDataProps = Pick<UserDataProps,
    'isChangingPassword'
    | 'passwordData'
    | 'passwordErrors'
    | 'setIsChangingPassword'
    | 'setPasswordData'
    | 'setPasswordErrors'
    | 'handleChangePassword'
>

const UserSecurityData = ({ handleChangePassword, passwordData, passwordErrors, setIsChangingPassword, setPasswordData, setPasswordErrors, isChangingPassword }: UserSecurityDataProps) => {
    return (
        <TabsContent value="security" >
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
        </TabsContent >
    )
}

export default UserSecurityData