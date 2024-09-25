import axios from 'axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import Title from '../components/ui/Title';
import Input from '../components/form/input';
import { newUser } from '../schema/newUser';

const UserAdd = () => {
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (values, actions) => {
    console.log(values)
    try {
      const res = await axios.post(
        `http://localhost:3000/api/users`,
        values
      );

      if (res.status === 201) {
        setIsSuccessMessageShown(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsSuccessMessageShown(false);
      } 
    } catch (err) {
      if (err.response.status === 400) {
        setErrorMessage(`Bu bilgilere sahip kullanıcı bulunmaktadır.`);
      }else{
        console.log(err)
        setErrorMessage(`Bir hata oluştu: ${err.message}`);
      }
      
    }
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
      userSurname: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
    validationSchema: newUser,
    onSubmit,
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-10">
        <form className="flex-1" onSubmit={formik.handleSubmit}>
          <Title addClass="text-[40px] mb-4">Kullanıcı Ekle</Title>
          <div className="flex flex-col gap-4">

            <Input
              name="userName"
              type="text"
              placeholder="Kullanıcının Adını Giriniz..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              errorMessage={formik.errors.userName}
              touched={formik.touched.userName}
            />
            <Input
              name="userSurname"
              type="text"
              placeholder="Kullanıcı Soy Adını Giriniz..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userSurname}
              errorMessage={formik.errors.userSurname}
              touched={formik.touched.userSurname}
            />
            <Input
              name="phoneNumber"
              type="tel"
              placeholder="Kullanıcı İletişim Numaranı Giriniz..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              errorMessage={formik.errors.phoneNumber}
              touched={formik.touched.phoneNumber}
            />
            <Input
              name="email"
              type="email"
              placeholder="Kullanıcı E-Posta Adresini Giriniz..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              errorMessage={formik.errors.email}
              touched={formik.touched.email}
            />
            <Input
              name="password"
              type="password"
              placeholder="Kullanıcı Şifresini Giriniz..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              errorMessage={formik.errors.password}
              touched={formik.touched.password}
            />
          </div>
          <button
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-all duration-300 mt-4"
            onClick={() => onSubmit(formik.values)} type="submit"
          >
            Kullanıcı Ekle
          </button>
          {isSuccessMessageShown && (
            <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
              Kullanıcı başarıyla kaydedildi.
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
