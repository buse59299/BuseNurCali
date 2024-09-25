import axios from 'axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import Title from '../ui/Title';
import Input from '../form/input';
import { newAdmin } from '@/schema/newAdmin';

const UserAdd = () => {
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      AdminName:"",
      AdminSurname: "",
      phoneNumber:"",
      email:"",
      password:"",
    },
    validationSchema: newAdmin,
    onSubmit: async (values, actions) => {
      try {
        const res = await axios.post(
          '/api/admin/register',
          values
        );

        if (res.status === 201) {
          setIsSuccessMessageShown(true);
          actions.resetForm();
          await new Promise((resolve) => setTimeout(resolve, 3000));
          setIsSuccessMessageShown(false);
        } 
      } catch (err) {
        if (err.response && err.response.status === 400) {
          setErrorMessage(`Bu bilgilere sahip yönetici bulunmaktadır.`);
        } else {
          console.error(err);
          setErrorMessage(`Bir hata oluştu: ${err.message}`);
        }
      }
    },
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-10">
        <form className="flex-1" onSubmit={formik.handleSubmit}>
          <Title addClass="text-[40px] mb-4">Yönetici Ekle</Title>
          <div className="flex flex-col gap-4">
            <Input
              name="AdminName"
              type="text"
              placeholder="Yöneticinin Adını Giriniz..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.AdminName}
              errorMessage={formik.errors.AdminName}
              touched={formik.touched.AdminName}
            />
            <Input
              name="AdminSurname"
              type="text"
              placeholder="Yöneticinin Soy Adını Giriniz..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.AdminSurname}
              errorMessage={formik.errors.AdminSurname}
              touched={formik.touched.AdminSurname}
            />
            <Input
              name="phoneNumber"
              type="tel"
              placeholder="Yöneticinin İletişim Numaranı Giriniz..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              errorMessage={formik.errors.phoneNumber}
              touched={formik.touched.phoneNumber}
            />
            <Input
              name="email"
              type="email"
              placeholder="Yöneticinin E-Posta Adresini Giriniz..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              errorMessage={formik.errors.email}
              touched={formik.touched.email}
            />
            <Input
              name="password"
              type="password"
              placeholder="Yöneticinin Şifresini Giriniz..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              errorMessage={formik.errors.password}
              touched={formik.touched.password}
            />
          </div>
          <button
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-all duration-300 mt-4"
            type="submit"
          >
            Yönetici Ekle
          </button>
          {isSuccessMessageShown && (
            <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
              Yönetici başarıyla kaydedildi.
            </div>
          )}
          {errorMessage && (
            <div className="bg-red-500 text-white p-2 mt-2 rounded-md">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserAdd;
