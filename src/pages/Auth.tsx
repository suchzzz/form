import { Stack } from '@fluentui/react'
import { Formik } from 'formik'
import { useState } from 'react'

const Auth = () => {
    const [login, setLogin] = useState(false);


    return (
        <Stack style={{ display: "flex", width: "100%", minHeight: "100vh", alignItems: "center" }}>
            <Stack style={{justifyItems: "center"}}></Stack>
        </Stack>
    )
}

export default Auth
