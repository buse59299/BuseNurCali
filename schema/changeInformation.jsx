import * as Yup from "yup";

export const changeInformation = Yup.object({
    fullName: Yup.string()
        .required("Ad soyad alanı zorunludur.")
        .min(3, "Ad soyad en az 3 karakter olmalıdır."),
        
    userName: Yup.string()
        .required("Kullanıcı adı alanı zorunludur.")
        .min(3, "Kullanıcı adı en az 3 karakter olmalıdır."),

    UserSurname: Yup.string()
        .required("Soyad alanı zorunludur.")
        .min(3, "Soyad en az 3 karakter olmalıdır."),

    phoneNumber: Yup.string()
    .required("Telefon numarası alanı zorunludur.")
    .matches(/^(05\d{9})$/, "Telefon numarası geçerli bir Türkiye numarası olmalıdır."),

    email: Yup.string()
        .required("E-posta adresi alanı zorunludur.")
        .email("Geçersiz bir e-posta adresi."),
});
