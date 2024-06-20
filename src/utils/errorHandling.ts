
export const internetError = 'Kindly check your internet connection and try again.';

 // eslint-disable-next-line
export const getErrorMessage = (error: any): string | null => {
    return typeof error?.data?.response === "string"
        ? error.data.response
        : null;
}

export const validationError = (errors: object) => {
    let error = "";
    if (errors) {
        if (typeof errors !== "string") {
            // eslint-disable-next-line
            Object.entries(errors).forEach(([_key, value]) => {
                error = value.join(", ");
                if (error.length) { return; }
            })
        } else {
            error = errors
        }
    }

    return error.length ? error : null;
};

export const resolveApiError = (error: any, message?: string): string => {
    const check_validation_error = validationError(error?.data?.response);
    if (check_validation_error) return check_validation_error;

    const check_message_error = getErrorMessage(error);
    if (check_message_error) return check_message_error;

    if (message) return message;


    return internetError;
}

// export const requestFailed = (error: any, title: string = 'Request Failed!', message?: string) => {
//     const toast = useToast();
//     const err = resolveApiError(error)
//     Toast(title, err);
// }