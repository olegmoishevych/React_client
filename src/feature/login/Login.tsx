import React from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import {
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { InputPassword } from '../../components/InputPassword/InputPassword'
import { loginTC } from '../../redux/auth-reducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Link, Navigate } from 'react-router-dom'
import { RequestStatus } from '../../redux/app-reducer'

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLogin = useAppSelector((state) => state.auth.isLogin)
    const statusLoading = useAppSelector((state) => state.app.request.status)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Password must be more than 7 characters'
            } else if (values.password.length <= 7) {
                errors.password = 'Password must be more than 7 characters'
            }
            if (!values.email) {
                errors.email = 'Email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
    })
    if (isLogin) {
        return <Navigate to={'/profile'} />
    }
    return (
        <>
            {!(statusLoading === RequestStatus.loading) && (
                <Container
                    sx={{
                        display: 'flex',
                        height: '100vh',
                        justifyContent: 'center',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: '60px',
                            width: '413px',
                            height: '600px',
                        }}
                    >
                        <Stack sx={{ m: 3, alignItems: 'center' }}>
                            <Typography
                                sx={{
                                    mt: '35px',
                                }}
                                fontWeight={'bold'}
                                variant="h5"
                            >
                                Sign in
                            </Typography>
                            <Box margin={2}>
                                <form onSubmit={formik.handleSubmit}>
                                    <FormControl>
                                        <FormGroup>
                                            <TextField
                                                sx={{
                                                    width: '100%',
                                                    mr: '110px',
                                                }}
                                                label="Email"
                                                margin="normal"
                                                variant={'standard'}
                                                {...formik.getFieldProps('email')}
                                            />
                                            {formik.errors.email && formik.touched.email ? (
                                                <div style={{ color: 'red' }}>
                                                    {formik.errors.email}
                                                </div>
                                            ) : (
                                                <br />
                                            )}
                                            <InputPassword
                                                title={'Password'}
                                                name={'password'}
                                                valuePassword={formik.values.password}
                                                restFormikProps={formik.getFieldProps('password')}
                                            />
                                            {formik.errors.password && formik.touched.password ? (
                                                <div style={{ color: 'red' }}>
                                                    {formik.errors.password}
                                                </div>
                                            ) : (
                                                <br />
                                            )}
                                            <FormControlLabel
                                                sx={{
                                                    mt: '24px',
                                                }}
                                                label={'Remember me'}
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.rememberMe}
                                                        {...formik.getFieldProps('rememberMe')}
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                    </FormControl>
                                    <Typography
                                        sx={{
                                            ml: '60%',
                                        }}
                                        fontWeight={'bold'}
                                        variant="inherit"
                                    >
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                fontSize: '14px',
                                                display: 'flex',
                                                color: 'black',
                                            }}
                                            to={'/password'}
                                        >
                                            Forgot Password?
                                        </Link>
                                    </Typography>
                                    <Button
                                        type={'submit'}
                                        variant={'contained'}
                                        sx={{
                                            mt: '80px',
                                            width: '95%',
                                            borderRadius: 5,
                                            color: 'white',
                                        }}
                                    >
                                        Sign in
                                    </Button>
                                </form>
                            </Box>
                            <Typography
                                sx={{
                                    mt: '31px',
                                    color: 'grey',
                                }}
                                fontWeight={'bold'}
                                variant="inherit"
                            >
                                Already have an account?
                            </Typography>
                            <Typography
                                sx={{
                                    mt: '11px',
                                    color: '#366EFF',
                                }}
                                fontWeight={'bold'}
                                variant="inherit"
                            >
                                <Link style={{ color: '#366EFF' }} to={'/registration'}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </Stack>
                    </Paper>
                </Container>
            )}
        </>
    )
}
