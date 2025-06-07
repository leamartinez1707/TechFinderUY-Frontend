import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/utils";
import { Badge } from "@/components/ui/badge";
import FavoriteIcon from "../FavoriteIcon";

type DashboardCardProps = {
    tech: {
        id: number;
        firstName: string;
        lastName: string;
        specialization: string;
        services: string[];
        phone: string;
        address: string;
        email: string;
    }
}

const DashboardCard = ({ tech }: DashboardCardProps) => {
    return (
        <CardContent className="p-6 h-full">
            <div className="flex flex-col justify-between h-full">
                <CardDescription className="mb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl mb-2 text-black capitalize">{tech.firstName} {tech.lastName}</CardTitle>
                        <FavoriteIcon technicianId={tech.id} />
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                        <span className="font-medium text-gray-800 capitalize">{tech?.specialization}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2 mb-4">
                        {tech?.services.length > 0 && tech.services.map((service, index) => (
                            <Badge key={index} className="text-xs">
                                {capitalizeFirstLetter(service)}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground capitalize">{tech.address}</span>
                    </div>
                    <span className="text-muted-foreground">{tech.email}</span>
                </CardDescription>
            </div>
        </CardContent>
    )
}

export default DashboardCard