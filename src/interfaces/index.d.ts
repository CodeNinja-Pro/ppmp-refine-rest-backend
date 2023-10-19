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