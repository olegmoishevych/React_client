import {
  authApi,
  DataFormType,
  LoginDataType,
  ProfileDataType,
  SetNewPasswordType,
} from "api/api";
import { RequestStatus, setError, setInfo, setLoading } from "./app-reducer";
import { Dispatch } from "redux";
import { RecoveryEmailType } from "feature/passwordRecovery/PasswordRecovery";

type AuthActionsType =
  | ReturnType<typeof setSingUp>
  | ReturnType<typeof setIsLogin>
  | ReturnType<typeof getEmailForgotPass>
  | ReturnType<typeof setProfileData>
  | ReturnType<typeof getVerificationEmail>
  | ReturnType<typeof setNewPassword>
  | ReturnType<typeof changePassword>

type InitialStateType = typeof initialState;

const initialState = {
  isSingUp: false,
  isLogin: false,
  email: "",
  verificationEmail: false,
  password: "",
  passChanged: "",
  profileData: { email: "", name: "" } as ProfileDataType, // avatar: undefined
};

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthActionsType
): InitialStateType => {
  switch (action.type) {
    case "AUTH/SET-SIGN-UP": {
      return { ...state, isSingUp: action.statusSingUp };
    }
    case "AUTH/SET-IS-LOGIN":
      return {
        ...state,
        isLogin: action.isLogin,
      };
    case "FORGOT-PASS/GET-EMAIL": {
      return { ...state, email: action.email };
    }
    case "AUTH/SET-PROFILE-DATA":
      return {
        ...state,
        profileData: action.profileData,
      };
    case "FORGOT-PASS/VERIFICATION-EMAIL": {
      return { ...state, verificationEmail: action.verificationEmail };
    }
    case "FORGOT-PASS/SET-NEW-PASSWORD": {
      return { ...state, password: action.password };
    }
     case "FORGOT-PASS/CHANGE-PASSWORD": {
      return { ...state, passChanged: action.passChanged };
    }
    default: {
      return state;
    }
  }
};

export const setSingUp = (statusSingUp: boolean) => {
  return { type: "AUTH/SET-SIGN-UP", statusSingUp } as const;
};
export const setIsLogin = (isLogin: boolean) => {
  return { type: "AUTH/SET-IS-LOGIN", isLogin } as const;
};
export const getEmailForgotPass = (email: string) => {
  return { type: "FORGOT-PASS/GET-EMAIL", email } as const;
};
export const setProfileData = (profileData: ProfileDataType) => {
  return { type: "AUTH/SET-PROFILE-DATA", profileData } as const;
};
export const getVerificationEmail = (verificationEmail: boolean) => {
  return { type: "FORGOT-PASS/VERIFICATION-EMAIL", verificationEmail } as const;
};
export const setNewPassword = (password: string) => {
  return { type: "FORGOT-PASS/SET-NEW-PASSWORD", password } as const;
};
export const changePassword = (passChanged: string) => {
  return { type: "FORGOT-PASS/CHANGE-PASSWORD", passChanged } as const;
};

export const singUpTC = (value: DataFormType) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(RequestStatus.loading));
    const res = await authApi.singUp(value);
    dispatch(setSingUp(true));
    dispatch(setInfo("Are you registered"));
  } catch (e) {
    dispatch(setError(e as string));
    dispatch(setLoading(RequestStatus.error));
  } finally {
    dispatch(setLoading(RequestStatus.succeeded));
  }
};

export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(RequestStatus.loading));
    const res = await authApi.login(data);
    dispatch(setProfileData(res));
    dispatch(setInfo("logIn success"));
    dispatch(setIsLogin(true));
  } catch (error) {
    dispatch(setError(error as string));
    dispatch(setLoading(RequestStatus.error));
  } finally {
    dispatch(setLoading(RequestStatus.idle));
  }
};

export const forgotTC =
  (email: RecoveryEmailType) => async (dispatch: Dispatch) => {
    try {
      setLoading(RequestStatus.loading);
      const response = await authApi.forgotPass(email);
      dispatch(getEmailForgotPass(email.email));
      dispatch(getVerificationEmail(response.data.success));
      dispatch(setLoading(RequestStatus.succeeded));
    } catch (error) {
      dispatch(setError(error as string));
      dispatch(setLoading(RequestStatus.error));
    }
  };
export const setNewPassTC =
  ({ password, resetPasswordToken }: SetNewPasswordType) =>
  async (dispatch: Dispatch) => {
    try {
      setLoading(RequestStatus.loading);
      const response = await authApi.setNewPassword({
        password,
        resetPasswordToken,
      });
      const passChanged = response.data.info
      dispatch(setNewPassword(password));
      dispatch(changePassword(passChanged));
      dispatch(setInfo(passChanged));
      dispatch(setLoading(RequestStatus.succeeded));
    } catch (error) {
      dispatch(setError(error as string));
      dispatch(setLoading(RequestStatus.error));
    }
  };

function getBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) resolve(reader.result as string);
      else reject("getBase64: Unexpected error");
    };
    reader.onerror = (error) => reject(error);
  });
}

export const changeProfileDataTC =
  ({ avatarFile, name }: { avatarFile?: File; name?: string }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(RequestStatus.loading));

      let newProfileData = {};
      if (avatarFile) {
        const avatar = await getBase64(avatarFile);
        newProfileData = { ...newProfileData, avatar };
      }
      if (name) {
        newProfileData = { ...newProfileData, name };
      }

      const res = await authApi.changeUserNameOrAvatar(newProfileData);
      dispatch(setProfileData(res));
      dispatch(setIsLogin(true));
    } catch (error) {
      dispatch(setError(error as string));
      dispatch(setLoading(RequestStatus.error));
    } finally {
      dispatch(setLoading(RequestStatus.idle));
    }
  };

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(RequestStatus.loading));
    const res = await authApi.logout();
    dispatch(setInfo(res.info));
    dispatch(setIsLogin(false));
  } catch (error) {
    dispatch(setError(error as string));
    dispatch(setLoading(RequestStatus.error));
  } finally {
    dispatch(setLoading(RequestStatus.idle));
  }
};
