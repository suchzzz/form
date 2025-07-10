import { roleTypeEnum, statusEnum, maratialStatusEnum, bloodGroupEnum } from '../utils/formItems';
export const inputsBasic = [
    {
        label: "Employee Name",
        id: "empName",
        type: "text"
    },
    {
        label: "Fathers Name",
        id: "fatherName",
        type: "text"
    },
    {
        label: "Birth Date",
        id: "birth",
        type: "date"
    },
    {
        label: "Blood Group",
        id: "bloodGroup",
        type: "enum",
        enums: [{
            key: bloodGroupEnum.A,
            text: "A"
        }, {
            key: bloodGroupEnum.B,
            text: "B"   
        }, {
            key: bloodGroupEnum.O,
            text: "O"
        }, {
            key: bloodGroupEnum.AB,
            text: "AB"
        },
        ]
    },
    {
        label: "Marital Status",
        id: "maratialStatus",
        type: "enum",
        enums: [{
            key: maratialStatusEnum.Married,
            text: "Married"
        }, {
            key: maratialStatusEnum.Single,
            text: "Single"
        }],
    },
    {
        label: "Aadhar Number",
        id: "aadharNumber",
        type: "text"
    },
    {
        label: "Passport Number",
        id: "passportNumber",
        type: "text"
    },
    {
        label: "Mobile Number",
        id: "phone",
        type: "text"
    },
    {
        label: "Email",
        id: "email",
        type: "text"
    },
    {
        label: "Card no/role",
        id: "role",
        type: "custom",
        inputs: [{
            id: "status",
            type: "enum",
            enums: [{
                key: statusEnum.Active,
                text: "Active"
            }, {
                key: statusEnum.Inactive,
                text: "Inactive"
            }
            ],
        },
        {
            id: "empId",
            type: "text"
        },
        {
            id: "roleType",
            type: "enum",
            enums: [{
                key: roleTypeEnum.Employee,
                text: "Employee"
            }, {
                key: roleTypeEnum.Employer,
                text: "Employer"
            }
            ],
        }
        ]
    },
    {
        label: "Present Address",
        id: "presentAdress",
        type: "big-text"
    },
    {
        label: "Permanent Address",
        id: "permanentAdress",
        type: "big-text"
    },
    {
        label: "Same As Present Address",
        id: "sameAsPresent",
        type: "boolean"
    },
    {
        label: "Candidate Photo",
        id: "candidatePhoto",
        type: "file"
    },
    // {
    //     label: "Candidate Sign",
    //     id: "candidateSign",
    //     type: "file"
    // }
]

export const inputsBank = [
    {
        label: "Bank Account Number",
        id: "bankAccountNumber",
        type: "text"
    },
    {
        label: "Bank Name / IFSC Code",
        type: "custom",
        inputs: [{
            id: "bankName",
            type: "text",
            placeHolder: "Bank Name"
        },
        {
            id: "ifscCode",
            type: "text",
            placeHolder: "IFSC Code"
        },]
    },
    {
        label: "Account Holder Name",
        id: "holderName",
        type: "text"
    },
    {
        label: "Pan Number",
        id: "panNumber",
        type: "text"
    },
    {
        label: "Bank Address",
        id: "bankAdd",
        type: "big-text"
    },

]