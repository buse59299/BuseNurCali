import React, { useState, useEffect } from 'react';
import Logo from '../../components/ui/Logo';
import { useFormik } from 'formik';
import Input from '../../components/form/Input';
import Title from '../../components/ui/Title'; 
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, getSession, signIn } from 'next-auth/react';


const Login = () => {
  const { data: session, status } = useSession();
  const { push } = useRouter();
  const [currentUser, setCurrentUser] = useState();

  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: false, email, password };
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email, // Kullanıcının giriş yaptığı e-posta adresi
        password // Kullanıcının giriş yaptığı şifre
      });
      actions.resetForm();
      if (res?.error) {
        console.log(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      if (session) {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          const foundUser = res.data?.find((user) => user.email === session?.user?.email);
          if (foundUser) {
            setCurrentUser(foundUser);
            push("/userHome/" + foundUser._id);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    getUser();
  }, [session, push]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      terms: false,
    },
    onSubmit,
  });

  return (
    <div className="h-[5.5rem] bg-secondary">
      <div className="container text-white mx-auto flex justify-between items-center h-full">
        <Logo />
      </div>
      <div className="container mx-auto">
        <form
          className="flex flex-col items-center my-20 md:w-1/2 w-full mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <Title addClass="text-[40px] mb-6">Kullanıcı Girişi</Title>
          <div className="flex flex-col gap-y-2 w-full">
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
          <div className="flex items-center my-4 ">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.terms}
            />
            <Link href="/User">
              <span className="text-sm underline cursor-pointer text-secondary ml-2">
                Açık rıza metnini kabul ediyorum
              </span>
            </Link>
          </div>

          {formik.errors.terms && formik.touched.terms && (
            <div className="text-red-500 text-sm">{formik.errors.terms}</div>
          )}

          <div className="flex flex-col w-full gap-y-3">
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center"
              disabled={!formik.values.terms}
            >
              GİRİŞ YAP
            </button>
          </div>
          <Link href="/admin">
            <span className="text-sm underline cursor-pointer text-secondary">
              Yönetici misiniz?
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user?.email);
  if (session && user) {
    return {
      redirect: {
        destination: "/userHome/" + user._id,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Login;

//const onSubmit = async (values) => {
  //try {
    //const response = await axios.post('/api/adminGiris', values);
    //if (response.status === 200) {
      //  router.push('/adminHome');
    //}
//} catch (error) {
  //  console.error(error);
    //setErrorMessage(error.response.data.message || 'Bir hata oluştu');
//}
//};

//const formik = useFormik({
//initialValues: {
  //  email: '',
    //password: '',
//},
//onSubmit,
//validationSchema: LoginSchema,
//});