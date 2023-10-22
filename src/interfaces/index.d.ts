export interface ILoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export interface IUnit {
    id: number;
    name: string;
    created_at: string
}
export interface IProduct {
    id: number;
    name: string;
    code: string;
    unit: IUnit;
    unit_cost: number;
    description: string;
    IPSAS_code: string;
    general_specification: string;
    created_at: string
}

export interface IPermission {
    id: number;
    name: string
}

export interface IRole {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

export interface IRolePermission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: [IPermission]
}

// export interface IIdentityRole {
//     id:
// }

export interface IUserIdentity {
    id: number;
    name: string;
    email: string;
    email_verified_at?:string;
    department_id?: number;
    created_at: string;
    updated_at: string;
    roles: [IRolePermission]
}
// export interface IPurchaseCartItem {
//     product
// }