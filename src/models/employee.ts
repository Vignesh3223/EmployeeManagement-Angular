export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    username: string;
    password: string;
    mobileNumber: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    hireDate: Date;
    isActive: boolean;
    departmentId: number;
    designationId: number;
    createdDate: Date;
}

export interface Response {
    status: string;
    message: string;
    token: string;
}