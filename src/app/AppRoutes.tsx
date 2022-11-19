import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Error } from './error/Error'
import { Test } from 'components/test/Test'
import { Login } from 'feature/login/Login'
import { Registration } from 'feature/registration/Registration'
import { Profile } from 'feature/profile/Profile'
import { PasswordRecovery } from 'feature/passwordRecovery/PasswordRecovery'
import { NewPassword } from 'feature/passwordRecovery/NewPassword'
import { CheckEmail } from 'feature/passwordRecovery/CheckEmail'
import { MyPack } from 'feature/myPack/MyPack'
import { FriendSPack } from 'feature/Friend’s Pack/Friend’s Pack'
import { PacksList } from 'feature/packsList/PacksList'
import { NamePack } from 'feature/namePack/NamePack'

export const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={'/*'} element={<Error />} />
        <Route path="/password" element={<PasswordRecovery />} />
        <Route path="/set-new-password/:token" element={<NewPassword />} />
        <Route path="/check" element={<CheckEmail />} />
        <Route path="/test" element={<Test />} />
        <Route path="/mypack" element={<MyPack />} />
        <Route path="/friendspack" element={<FriendSPack />} />
        <Route path="/packslist" element={<PacksList />} />
        <Route path="/name-pack" element={<NamePack />} />
    </Routes>
)
