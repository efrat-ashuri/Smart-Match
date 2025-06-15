
export enum RoleType {
    Admin = 'admin',
    User = 'user'
}

export type UserType = {
    id: number,
    name: string,
    role: RoleType,
    phone: string,
    address: string,
    email?: string;
}