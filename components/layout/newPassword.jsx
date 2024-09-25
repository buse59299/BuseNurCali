import React, { useState } from "react";
import { useFormik } from "formik";
import Title from "../ui/Title";
import Input from "../form/input";
import { changePassword } from "../../schema/changePassword";

export default function Counter() {
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);

  const onSubmit = async (values, actions) => {
    setIsSuccessMessageShown(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    actions.resetForm();
    setIsSuccessMessageShown(false);
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        oldPassword: "",
        NewPassword: "",
        confirmPassword: "",
      },
      onSubmit,
      validationSchema: changePassword,
    });

  const newPasswordInputs = [
    {
      id: 1,
      name: "oldPassword",
      type: "password",
      placeholder: "Mevcut Şifrenizi Giriniz...",
      value: values.oldPassword,
      errorMessage: errors.oldPassword,
      touched: touched.oldPassword,
    },
    {
      id: 2,
      name: "NewPassword",
      type: "password",
      placeholder: "Yeni Şifrenizi Giriniz...",
      value: values.NewPassword,
      errorMessage: errors.NewPassword,
      touched: touched.NewPassword,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      placeholder: "Yeni Şifrenizi Giriniz (Tekrar)...",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between flex-wrap-reverse gap-10">
        <form className="lg:flex-1 w-full" onSubmit={handleSubmit}>
          <Title addClass="text-[40px] mb-5px">Şifre Yenileme</Title>
          <div className="flex flex-col gap-y-3 w-full">
            {newPasswordInputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}
          </div>
          <button
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-all duration-300 mt-4"
            type="submit"
          >
            Güncelle
          </button>
          {isSuccessMessageShown && (
            <div className="bg-green-500 text-white p-2 mt-4 rounded-md">
              Bilgileriniz Başarıyla Kaydedilmiştir.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
