import { toast } from "react-toastify";

type ErrorRes = {
  data: string | any;
  message: string;
};

export const LogOutErrors = {
  AUTH_ERROR: "",
  INVALID_DEVICE: "",
  USER_BLOCKED: "",
  "Unauthenticated.": "",
};

export const TokenErrors = [
  "token has expired",
  "token not parsed",
  "invalid token",
  "unauthenticated.",
];

export const ValidateResponseError = (
  error: ErrorRes,
  token: string | null = null
) => {
  // console.log(error.data, "val_error");
  if (typeof error !== "string") {
    // console.log('Not - String')
    if (typeof error.data !== "string") {
      // console.log('Data Not - String')
      // has meta_data errors
      try {
        const hasMetaDataErrors = error?.data?.response;
        let possibleErrors = {
          token: error?.data?.response
            ? TokenErrors.includes(error?.data?.response.trim().toLowerCase())
            : false,
          auth: hasMetaDataErrors
            ? Object.keys(LogOutErrors).includes(error.data.response)
            : false,
        };
        // console.log(possibleErrors, (error?.data?.response && error?.data?.response.trim().toLowerCase()));
        // handle errors
        if (possibleErrors.token || possibleErrors.auth) {
          if (token) toast.error("Kindly login again to verify your account.");
          return true;
        }
      } catch (e) {
        // console.log(e)
        return false;
      }
    }
  }

  // console.log("might be network issue");
  return false;
};
