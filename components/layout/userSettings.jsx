import React, { useState } from "react";
import { useFormik } from "formik";
import Title from "../ui/Title";
import Input from "../form/input";
import { changeInformation } from "../../schema/changeInformation";

export default function Counter() {
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);

  const onSubmit = async (values, actions) => {
    setIsSuccessMessageShown(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    actions.resetForm();
    setIsSuccessMessageShown(false);
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      UserSurname: "",
      phoneNumber:"",
      email: "",
    },
    onSubmit,
    validationSchema: changeInformation,
  });


  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Kullanıcı Adınızı Giriniz...",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "userName",
      type: "text",
      placeholder: "Adınızı Giriniz...",
      value: values.userName,
      errorMessage: errors.userName,
      touched: touched.userName,
    },
    {
      id: 3,
      name: "UserSurname",
      type: "text",
      placeholder: "Soy Adınızı Giriniz...",
      value: values.UserSurname,
      errorMessage: errors.UserSurname,
      touched: touched.UserSurname,
    },
    {
      id: 4,
      name: "phoneNumber",
      type: "tel",
      placeholder: "İletişim Numaranızı Giriniz...",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 5,
      name: "email",
      type: "email",
      placeholder: "E-Posta Adresinizi Giriniz...",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <div className="flex justify-between flex-wrap-reverse gap-10">
        <form className="lg:flex-1 w-full" onSubmit={handleSubmit}>
          <Title addClass="text-[40px] mb-5px">Profil Ayarları</Title>
          <div className="flex flex-col gap-y-3 w-full">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
          <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-all duration-300 mt-4" type="submit">
            Güncelle
          </button>
          {isSuccessMessageShown && (
            <div className="bg-green-500 text-white p-2 mt-1 rounded-md">
              Bilgileriniz Başarıyla Kaydedilmiştir.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
