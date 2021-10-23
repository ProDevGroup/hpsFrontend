import { ProfileRole } from "./profile-role.model";


export class User {
    id?: number;
    public fullName!: string;
    public email!: string;
    public password!: string;
    public roles!: ProfileRole;
    public isActive!: Boolean;
    token?: string;


}
