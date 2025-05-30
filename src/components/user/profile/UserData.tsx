import { Dispatch } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactFormData, LoggedUser, PasswordErrors, PasswordFormData, PersonalFormData } from "@/types"
import UserPersonalData from "./UserPersonalData"
import UserContactData from "./UserContactData"
import UserSecurityData from "./UserSecurityData"

export interface UserDataProps {
    isEditingPersonal: boolean;
    isEditingContact: boolean;
    isChangingPassword?: boolean;
    user: LoggedUser | null;
    editedPersonal: PersonalFormData;
    editedContact: ContactFormData;
    passwordData: PasswordFormData
    passwordErrors: PasswordErrors
    setIsEditingContact: Dispatch<React.SetStateAction<boolean>>
    setIsEditingPersonal: Dispatch<React.SetStateAction<boolean>>;
    setIsChangingPassword: Dispatch<React.SetStateAction<boolean>>;
    setEditedPersonal: Dispatch<React.SetStateAction<PersonalFormData>>;
    setEditedContact: Dispatch<React.SetStateAction<ContactFormData>>;
    setPasswordData: Dispatch<React.SetStateAction<PasswordFormData>>;
    setPasswordErrors: Dispatch<React.SetStateAction<PasswordErrors>>;
    handleSaveContact: () => Promise<void>;
    handleSavePersonal: () => Promise<void>;
    handleChangePassword: () => Promise<void>;

}

const tabs = [
    { value: "personal", label: "Datos Personales" },
    { value: "contact", label: "Contacto" },
    { value: "security", label: "Seguridad" }
]

const UserData = ({ isEditingPersonal, isEditingContact, user, editedPersonal, setIsEditingContact, setIsEditingPersonal, setEditedPersonal, setEditedContact, handleSaveContact, handleSavePersonal, editedContact, handleChangePassword, passwordData, passwordErrors, isChangingPassword, setIsChangingPassword, setPasswordData, setPasswordErrors }: UserDataProps) => {
    return (
        <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    {tabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <UserPersonalData
                    isEditingPersonal={isEditingPersonal}
                    user={user}
                    editedPersonal={editedPersonal}
                    setIsEditingPersonal={setIsEditingPersonal}
                    setEditedPersonal={setEditedPersonal}
                    handleSavePersonal={handleSavePersonal}
                />
                <UserContactData
                    isEditingContact={isEditingContact}
                    user={user}
                    editedContact={editedContact}
                    setIsEditingContact={setIsEditingContact}
                    setEditedContact={setEditedContact}
                    handleSaveContact={handleSaveContact}
                />
                <UserSecurityData
                    isChangingPassword={isChangingPassword}
                    passwordData={passwordData}
                    passwordErrors={passwordErrors}
                    setIsChangingPassword={setIsChangingPassword}
                    setPasswordData={setPasswordData}
                    setPasswordErrors={setPasswordErrors}
                    handleChangePassword={handleChangePassword}
                />
            </Tabs>

        </div>
    )
}

export default UserData