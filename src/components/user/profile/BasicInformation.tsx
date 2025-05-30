import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-separator'
import { Camera, Mail, Phone, Home } from 'lucide-react'
import type { LoggedUser } from '@/types'

interface BasicInformationProps {
    user: LoggedUser | null
}
const BasicInformation = ({ user }: BasicInformationProps) => {
    return (
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
    )
}

export default BasicInformation