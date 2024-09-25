import React from 'react';
import Logo from '../../components/ui/Logo';
import { useFormik } from 'formik';
import Input from '@/components/form/Input';
import Title from '../../components/ui/Title';
import { LoginSchema } from '../../schema/login';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
    
    const router = useRouter();
    const [errorMessage, setErrorMessage] = React.useState('');

    const onSubmit = async (values) => {
        try {
            const response = await axios.post('/api/adminGiris', values);
            if (response.status === 200) {
                router.push('/adminHome');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response.data.message || 'Bir hata oluştu');
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit,
        validationSchema: LoginSchema,
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
                    <Title addClass="text-[40px] mb-6">Yönetici Girişi</Title>
                    <div className="flex flex-col gap-y-2 w-full">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Yönetici E-Posta Adresini Giriniz..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            errorMessage={formik.errors.email}
                            touched={formik.touched.email}
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Yönetici Şifresini Giriniz..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            errorMessage={formik.errors.password}
                            touched={formik.touched.password}
                        />
                    </div>
                    {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
                    <div className="flex flex-col w-full gap-y-3 mt-7">
                        <button 
                            type="submit"
                            className="bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center"
                        >
                            GİRİŞ YAP
                        </button>
                    </div>
                    <Link href="/userLogin">
                        <span className="text-sm underline cursor-pointer text-secondary mt-4">
                            Kullanıcı mısınız?
                        </span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
