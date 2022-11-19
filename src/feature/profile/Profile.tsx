import React from 'react'
import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import catAvatar from 'assets/cat.jpg'
import Box from '@mui/material/Box'
import { LogoutButton } from './LogoutButton'
import { UserAvatar } from './UserAvatar'
import { UserEmail } from './UserEmail'
import { EditableUserName } from './EditableUserName'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { Navigate } from 'react-router-dom'
import { changeProfileDataTC } from 'redux/auth-reducer'
import { RequestStatus } from '../../redux/app-reducer'

export const Profile = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const { name, email, avatar } = useAppSelector(
    (state) => state.auth.profileData
  );

  const statusLoading = useAppSelector((state) => state.app.request.status);

  const dispatch = useAppDispatch();

  if (!isLogin) return <Navigate to="/login" />;

  const onChangeUserNameHandler = (name: string) => {
    dispatch(changeProfileDataTC({ name }));
  };

  const onChangeAvatarHandler = (avatarFile: File) => {
    dispatch(changeProfileDataTC({ avatarFile }));
  };

  return (
    <>
      {!(statusLoading === RequestStatus.loading) && (
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 7,
              width: 400,
              height: 350,
            }}
          >
            <Stack sx={{ m: 3, alignItems: "center" }}>
              <Typography fontWeight={"bold"} variant="h5">
                Personal Information
              </Typography>
              <Box margin={2}>
                <UserAvatar
                  src={avatar ?? catAvatar}
                  onConfirm={onChangeAvatarHandler}
                />
              </Box>
              <EditableUserName
                value={name}
                onConfirm={onChangeUserNameHandler}
              />
              <UserEmail email={email} />
              <LogoutButton />
            </Stack>
          </Paper>
        </Container>
      )}
    </>
  );
};
