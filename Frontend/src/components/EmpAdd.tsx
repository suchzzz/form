import { Stack, TextField, PrimaryButton, DefaultButton, Text } from '@fluentui/react';
import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth } from "../context/AuthContext"
import axios from 'axios';
const EmpAdd = () => {
    
  const navigate = useNavigate();
    const { user } = useAuth();
    const [displayText, setDisplayText] = useState<string>("");
    const AddUserSchema = Yup.object().shape({
        password: Yup.string().min(6, 'Too Short!').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Required'),
    });

    const addUser = ((data) => {
        const API_URL = import.meta.env.VITE_BASE_URL;
        const token = localStorage.getItem("token");
        let Config = {
            headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
            },
        };
        console.log(user);
        axios.post(`${API_URL}/api/auth/changePassword`, {
            email: user.email,
            password: data.password
        }
            , Config).then(() => {
                setDisplayText("userAdded");

                setTimeout(() => {
                    setDisplayText("");
                }, 2000);
            }).then(()=>{
                navigate("/");
            })
    })
    return (
        <Stack style={{ display: 'flex', width: '100%', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            {displayText}
            <Stack style={{ minWidth: 350, padding: 32, boxShadow: '0 2px 8px #e0e0e0', borderRadius: 8, background: '#fff' }}>
                <Text variant="xLarge" style={{ marginBottom: 24, textAlign: 'center', fontWeight: 600 }}>
                    Change your Password
                </Text>
                <Formik
                    initialValues={{ confirmPassword: '', password: '' }}
                    validationSchema={AddUserSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        addUser(values)
                        setSubmitting(false);
                        values.password = "", values.confirmPassword = ""
                    }}
                >
                    {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
                        <Form>
                            <Field name="password">
                                {({ field }: any) => (
                                    <TextField
                                        label="Password"
                                        type="password"
                                        canRevealPassword
                                        revealPasswordAriaLabel="Show password"
                                        {...field}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={touched.password && errors.password ? errors.password : undefined}
                                        required
                                    />
                                )}
                            </Field>
                            <Field name="confirmPassword">
                                {({ field }: any) => (
                                    <TextField
                                        label="ConfirmPassword"
                                        type="password"
                                        canRevealPassword
                                        revealPasswordAriaLabel="Show confirmPassword"
                                        {...field}
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                        required
                                    />
                                )}
                            </Field>
                            <PrimaryButton
                                type="submit"
                                text="Change password"
                                style={{ width: '100%', marginTop: 16 }}
                                disabled={isSubmitting}
                            />
                        </Form>
                    )}
                </Formik>
            </Stack>
        </Stack>
    );
}

export default EmpAdd