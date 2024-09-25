import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
  .required("E- Posta adresi gereklidir.")
  .min(3, "Kullanıcı adı gereklidir."),
  password: Yup.string()
    .required("Şifre gereklidir."),
});
