import React, { useEffect } from "react";
import s from "./CheckEmail.module.css";
import { Button, Paper } from "@mui/material";
import { InputPassword } from "components/InputPassword/InputPassword";
import { useFormik } from "formik";
import { setNewPassTC } from "redux/auth-reducer";
import { useAppDispatch, useAppSelector } from "redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { SetNewPasswordType } from "api/api";

export type FormikErrorType = {
  password?: string;
};

export const NewPassword = () => {
  const passChanged = useAppSelector((state) => state.auth.passChanged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams<"token">();
  let token = params.token;

  useEffect(() => {
    if (passChanged) {
      navigate("/login");
    }
  }, [passChanged, navigate]);

  const formik = useFormik({
    initialValues: {
      password: "",
      resetPasswordToken: token as string,
    },
    validate: (values: SetNewPasswordType) => {
      const errors: FormikErrorType = {};
      if (values.password.length <= 3) {
        errors.password = "Password has at least 3 characters";
      }
      return errors;
    },
    onSubmit: ({ password, resetPasswordToken }) => {
      dispatch(setNewPassTC({ password, resetPasswordToken }));
      formik.resetForm();
    },
  });

  return (
    <div className={s.newPassWrapper}>
      <Paper
        sx={{
          width: "380px",
          padding: "20px",
          margin: "100px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        elevation={3}
      >
        <h2 className={s.h2}>Create new password</h2>
        <InputPassword
          title={"Password"}
          name={"password"}
          valuePassword={formik.values.password}
          restFormikProps={formik.getFieldProps("password")}
        />
        {formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}
        <p className={s.p}>
          Create new password and we will send you
          <br />
          further instructions to email
        </p>
        <form onSubmit={formik.handleSubmit}>
          <Button
            type={"submit"}
            className={s.button}
            title={"Create new password"}
          >
            Create new password
          </Button>
        </form>
      </Paper>
    </div>
  );
};
