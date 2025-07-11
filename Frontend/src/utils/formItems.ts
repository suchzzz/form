export enum bloodGroupEnum {
    A, B, O, AB
}
export enum maratialStatusEnum {
    Single, Married
}
export enum statusEnum {
    Active, Inactive
}
export enum roleTypeEnum {
    Employee, Employer
}
export interface IBasicDetail {
    // id:string|null
    empName: string,
    fatherName: string,
    birth: Date,
    bloodGroup: bloodGroupEnum,
    maratialStatus: maratialStatusEnum,
    aadharNumber: string,
    passportNumber: string,
    phone:string,
    email:string,
    // role: {
        status: statusEnum,
        empId: string,
        roleType: roleTypeEnum,
    // }
    presentAdress: string,
    permanentAdress: string,
    sameAsPresent: boolean,
    candidatePhoto: File,
    candidateSign: File,
    photoUrl:string,
}
export interface IBankDetails {
    bankAccountNumber: string,
    bankName: string,
    ifscCode: string,
    holderName: string,
    panNumber: string,
    bankAdd: string
}

// empName: "",
//fatherName: "",
//birth: new Date (),
//bloodGroup: '',
//maratialStatus: 'Single',
//aadharNumber: ,
//passportNumber: ,
//role: {
//status: Active,
//id: ,
//roleType: Employee
//}
//presentAdress: "",
//permanentAdress: "",
//sameAsPresent: false,
//candidatePhoto: "",
//candidateSign: ""
//bankAccountNumber: ,
//bankName: "",
//ifscCode: "",
//holderName: "",
//panNumber: "",
//bankAdd: ""