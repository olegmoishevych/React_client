import {
    DataFormType,
    LoginDataType,
    LoginResponseType,
    LogoutResponseType,
    RecoveryEmailType,
    ResponseForgotPasswordType,
    ResponseSetNewPasswordType,
    SetNewPasswordType,
    SingUpResponseType,
} from './types'
import { instance } from './instance'
import {
    getDataFromAxiosResponse,
    parseAxiosError,
    parseLoginResponse,
    parseLogoutResponse,
    parseSingUpResponse,
    parseUpdatedUserResponse,
} from './responseParsers'

export const authApi = {
    singUp(dataForm: DataFormType) {
        return instance
            .post<SingUpResponseType>('/auth/register', dataForm)
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
            .then(parseSingUpResponse)
    },
    login(data: LoginDataType) {
        return instance
            .post<LoginResponseType>('/auth/login', data)
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
            .then(parseLoginResponse)
    },
    forgotPass(email: RecoveryEmailType) {
        return instance
            .post<ResponseForgotPasswordType>('/auth/forgot', {
                email: email.email,
                message: `<div style="background-color: #f7f7f7; padding: 15px">
                        Follow
                        <a href='https://Samurai-way.github.io/Friday-app/#/set-new-password/$token$'
                        style="font-weight: bold; color: #1a73e8;">
                        this link</a> to recover your password
                        </div>`, // html-letter, instead of $token$ back will insert a token
            })
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
    },

    setNewPassword({ password, resetPasswordToken }: SetNewPasswordType) {
        return instance.post<ResponseSetNewPasswordType>('/auth/set-new-password', {
            password,
            resetPasswordToken,
        })
    },

    changeUserNameOrAvatar(data: { name?: string; avatar?: string }) {
        return instance
            .put('/auth/me', data)
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
            .then(parseUpdatedUserResponse)
    },

    me() {
        return instance
            .post<LoginResponseType>('auth/me')
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
            .then(parseLoginResponse)
    },

    logout() {
        return instance
            .delete<LogoutResponseType>('auth/me')
            .then(getDataFromAxiosResponse)
            .catch(parseAxiosError)
            .then(parseLogoutResponse)
    },
}
