import { getTheme, mergeStyleSets, FontWeights, Modal, IIconProps, Stack, IconButton, IButtonStyles } from '@fluentui/react';
import { Formik, Form as FormikForm } from 'formik';
import Inputs from './Inputs';
import { inputsBasic, inputsBank } from "../utils/inputs"
import { saveData } from "../utils/api"
import { basicDetailSchmea } from "../utils/yupValidationSchema"
import { useState } from 'react';
import { Spinner } from '@fluentui/react';
import { bloodGroupEnum, maratialStatusEnum, statusEnum, roleTypeEnum } from '../utils/formItems';

const Form = ({ openSidebar, setOpenSidebar, initialValues,isUpdating,setIsUpdating,id }) => {
    const [submitting, setSubmitting] = useState(false);
    const defaultValues = {
        empName: "aaa",
        fatherName: "aaaa",
        birth: new Date(),
        bloodGroup: bloodGroupEnum.B,
        maratialStatus: maratialStatusEnum.Single,
        aadharNumber: "aaa",
        passportNumber: "aa",
        phone: "1234567890",
        email: "aaa@gmail.com",
        status: statusEnum.Active,
        empId: "aaaa",
        roleType: roleTypeEnum.Employee,
        presentAdress: "aaaa",
        permanentAdress: "dasdad",
        sameAsPresent: false,
        // candidatePhoto: "",
        // candidateSign: "",
        bankAccountNumber: "ssdsdsds",
        bankName: "sdadsa",
        ifscCode: "aasdadsada",
        holderName: "cvcvds",
        panNumber: "fdfs",
        bankAdd: "fdsfsd"
    };
    const formInitialValues = initialValues || defaultValues;
    
    return (
        <Stack>
            <Modal
                isOpen={openSidebar}
                onDismiss={() => {
                    setOpenSidebar(!openSidebar);
                }}
                isBlocking={false}
                containerClassName={contentStyles.container}
            >
                {submitting ? <Spinner label="Submitting" /> :
                    <Formik
                        enableReinitialize
                        initialValues={formInitialValues}
                        validate={(e) => {
                            if (e.fatherName === "xyz") console.log("Error in father")
                        }}
                        validationSchema={basicDetailSchmea}
                        onSubmit={async (values, actions) => {
                            setSubmitting(true);
                            try {
                                if(isUpdating&&id!==null){
                                     await saveData(values, setSubmitting,id);
                                     setIsUpdating(false);
                                }
                                else{
                                     await saveData(values, setSubmitting);
                                }
                               
                                setOpenSidebar(false);
                            } catch (e) {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, values }) => (

                            <FormikForm>
                                {JSON.stringify(errors,null,2)}
                                <div className={contentStyles.header}>
                                    <h2 className={contentStyles.heading} >
                                        Basic Information
                                    </h2>
                                    <Stack className={contentStyles.icons}>
                                        <IconButton
                                            className={contentStyles.saveBtn}
                                            iconProps={saveIcon}
                                            type='submit'
                                        />
                                        <IconButton
                                            styles={iconButtonStyles}
                                            iconProps={cancelIcon}
                                            onClick={() => {
                                                setOpenSidebar(false);
                                            }}
                                        />
                                    </Stack>
                                </div>
                                <Inputs errors={errors} inputs={inputsBasic} />
                                <Stack horizontal styles={{ root: { display: "block" } }}>
                                    <h2 className={contentStyles.heading} >
                                        Bank Details
                                    </h2>
                                </Stack>
                                <Inputs errors={errors} inputs={inputsBank} />
                            </FormikForm>
                        )}
                    </Formik>}
            </Modal>
        </Stack>
    )
}

export default Form
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const saveIcon: IIconProps = { iconName: 'Save' };

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
        width: "80%",
        height: "80%",
    },
    header: [
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            fontWeight: FontWeights.semibold,
            justifyContent: "space-between"
        },
    ],
    heading: {
        color: theme.palette.neutralPrimary,
        fontWeight: FontWeights.semibold,
        margin: '0',
        fontSize: "20px",
        padding: "20px"
    },
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
    line: {
        border: "0",
        borderBottom: "1px solid black",
        width: "84%"
    },
    icons: {
        display: "block",
    },
    saveBtn: {
        border: "1px solid blue",
    }
});
const iconButtonStyles: Partial<IButtonStyles> = {
    root: {
        color: "red",
        marginLeft: '10px',
        marginTop: '4px',
        marginRight: '2px',
        border: "1px solid red",
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};
