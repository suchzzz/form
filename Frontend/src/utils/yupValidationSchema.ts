import * as yup from 'yup';
import { sub } from "date-fns/fp"
import { IBasicDetail, IBankDetails, roleTypeEnum, statusEnum, maratialStatusEnum, bloodGroupEnum } from '../utils/formItems';

// const basicDetailSchmea = yup.object({
// export const basicDetailSchmea: IBasicDetail & IBankDetails = yup.object({

export const basicDetailSchmea= yup.object().shape({
    empName: yup
        .string()
        .required(),

    fatherName: yup.string()
        .required(),

    birth: yup.date()
        .required()
       ,

       bloodGroup:yup.mixed().oneOf(Object.values(bloodGroupEnum)),
    // bloodGroup: yup.mixed<bloodGroupEnum>().required(),
        // .oneOf(Object.keys(bloodGroupEnum).filter((x)=>isNaN(Number(x)))),


    // bloodGroup: yup.mixed<bloodGroupEnum>().required(),

    // maratialStatus: yup.mixed()
    // .oneOf(Object.keys(maratialStatusEnum).filter((x)=>isNaN(Number(x)))),

    maratialStatus:yup.mixed().oneOf(Object.values(maratialStatusEnum)),

    aadharNumber: yup.string()
        .required(),

    passportNumber: yup.string()
        .required(),

    phone: yup.string().required().length(10),

    email: yup.string().email().required(),

    // role: yup.object({
    // status: yup.mixed()
    //     .oneOf(Object.values(statusEnum)),
    status: yup.mixed<statusEnum>().required(),

    // empId: yup.string()
    //     .required().default("abc"),

    roleType: yup.mixed<roleTypeEnum>().required(),
    // .oneOf(Object.values(roleTypeEnum)),
    // }),

    presentAdress: yup.string()
        .required(),

    permanentAdress: yup.string()
        .required(),

    sameAsPresent: yup.boolean().default(false),

    // candidatePhoto: yup.array().nullable(),
        // .required(),

    // candidateSign: yup.array().nullable(),
        // .required(),


    bankAccountNumber: yup.string()
        .required(),
    bankName: yup.string()
        .required(),
    ifscCode: yup.string()
        .required(),
    holderName: yup.string()
        .required(),
    panNumber: yup.string()
        .required(),
    bankAdd: yup.string()
        .required(),

})

const a = basicDetailSchmea;
