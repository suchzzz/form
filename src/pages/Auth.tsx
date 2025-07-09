import { Stack, TextField, PrimaryButton, DefaultButton, Text } from '@fluentui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';


const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Too Short!').required('Required'),
    });

    const signupSchema = Yup.object().shape({
        name: Yup.string().min(2, 'Too Short!').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'), 
        password: Yup.string().min(6, 'Too Short!').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Required'),
    });

    return (
        <Stack style={{ display: 'flex', width: '100%', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f4f6fc' }}>
            <Stack style={{ minWidth: 350, padding: 32, boxShadow: '0 2px 8px #e0e0e0', borderRadius: 8, background: '#fff' }}>
                <Text variant="xLarge" style={{ marginBottom: 24, textAlign: 'center', fontWeight: 600 }}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </Text>
                <Formik
                    initialValues={isLogin ? { email: '', password: '' } : { name: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={isLogin ? loginSchema : signupSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        setSubmitting(false);
                    }}
                >
                    {({ errors, touched, isSubmitting, handleChange, handleBlur, values }) => (
                        <Form>
                            {!isLogin && (
                                <Field name="name">
                                    {({ field }: any) => (
                                        <TextField
                                            label="Name"
                                            {...field}
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            errorMessage={touched.name && errors.name ? errors.name : undefined}
                                            required
                                        />
                                    )}
                                </Field>
                            )}
                            <Field name="email">
                                {({ field }: any) => (
                                    <TextField
                                        label="Email"
                                        type="email"
                                        {...field}
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        errorMessage={touched.email && errors.email ? errors.email : undefined}
                                        required
                                    />
                                )}
                            </Field>
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
                            {!isLogin && (
                                <Field name="confirmPassword">
                                    {({ field }: any) => (
                                        <TextField
                                            label="Confirm Password"
                                            type="password"
                                            canRevealPassword
                                            revealPasswordAriaLabel="Show password"
                                            {...field}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            errorMessage={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                            required
                                        />
                                    )}
                                </Field>
                            )}
                            <PrimaryButton
                                type="submit"
                                text={isLogin ? 'Login' : 'Sign Up'}
                                style={{ width: '100%', marginTop: 16 }}
                                disabled={isSubmitting}
                            />
                        </Form>
                    )}
                </Formik>
                <Stack horizontal horizontalAlign="center" style={{ marginTop: 16 }}>
                    <Text>
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    </Text>
                    <DefaultButton
                        text={isLogin ? 'Sign Up' : 'Login'}
                        onClick={() => setIsLogin(!isLogin)}
                        style={{ marginLeft: 8 }}
                        disabled={false}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}

export default Auth