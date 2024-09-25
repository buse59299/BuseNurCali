import * as Yup from "yup";

export const changePassword = Yup.object({
    oldPassword: Yup.string()
        .required("Eski şifre alanı zorunludur."),
    
    NewPassword: Yup.string()
        .required("Yeni şifre alanı zorunludur.")
        .min(8, "Şifre en az 8 karakter olmalıdır."),

    confirmPassword: Yup.string()
        .required("Şifre tekrarı alanı zorunludur.")
        .oneOf([Yup.ref("NewPassword")], "Şifreler eşleşmelidir."),
});
