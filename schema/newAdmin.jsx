import * as Yup from "yup";

export const newAdmin = Yup.object({
    AdminName: Yup.string()
        .required("Kullanıcı adı zorunludur.")
        .min(3, "Kullanıcı adı en az 3 karakter olmalıdır."),

    AdminSurname: Yup.string()
        .required("Kullanıcı soyadı zorunludur.")
        .min(3, "Soyad en az 3 karakter olmalıdır."),

    phoneNumber: Yup.string()
    .required("Telefon numarası zorunludur.")
    .matches(/^(05\d{9})$/, "Telefon numarası geçerli bir Türkiye numarası olmalıdır."),

    email: Yup.string()
        .required("E-posta adresi zorunludur.")
        .email("Geçersiz bir e-posta adresi."),
    
    password: Yup.string()
        .required("Yeni şifre zorunludur.")
        .min(8, "Şifre en az 8 karakter olmalıdır."),
});
