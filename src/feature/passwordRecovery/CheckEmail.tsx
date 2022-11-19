import React from "react";
import s from "./CheckEmail.module.css";
import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import image from "assets/CheckEmail.png";
import { useAppSelector } from "../../redux/store";
import { RequestStatus } from "../../redux/app-reducer";

export const CheckEmail = () => {
  const navigate = useNavigate();

  const handleClickToLogin = () => {
    navigate("/login");
  };
  const email = useAppSelector((state) => state.auth.email);
  const statusLoading = useAppSelector((state) => state.app.request.status);

  return (
    <>
      {!(statusLoading === RequestStatus.loading) && (
        <div className={s.checkEmailWrapper}>
          <Paper className={s.checkEmail} elevation={3}>
            <h2 className={s.h2}>Check Email</h2>
            <img src={image} className={s.img} alt="check email" />
            <p className={s.p}>
              We've sent an Email with instructions to <br />
              {email}
            </p>
            <Button
              className={s.button}
              onClick={handleClickToLogin}
              title={"Back to login"}
            >
              Back to login
            </Button>
          </Paper>
        </div>
      )}
    </>
  );
};
