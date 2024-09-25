import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpperArea from '../../components/layout/adminUpperArea';
import Title from '@/components/ui/Title';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const aidatSchema = Yup.object().shape({
  userId: Yup.string().required('Üye seçimi zorunludur.'),
});

const Index = () => {
  const [uyeler, setUyeler] = useState([]);
  const [aidatlar, setAidatlar] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uyeRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        if (uyeRes.data && Array.isArray(uyeRes.data)) {
          setUyeler(uyeRes.data);
        } else {
          console.error('API\'den geçersiz veri formatı döndü');
        }
      } catch (error) {
        console.error('Veri getirilirken hata oluştu:', error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (values, actions) => {
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/kullanici/${values.userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setAidatlar(res.data);
      
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setErrorMessage(`Bir hata oluştu: ${err.response.data.message}`);
        } else {
          setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
      } else {
        setErrorMessage(`Bir hata oluştu: ${err.message}`);
      }
    }
  };

  const handleDelete = async (aidatId) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/kullanici/${aidatId}`);
      setAidatlar(aidatlar.filter(aidat => aidat._id !== aidatId));

      setSuccessMessage('Aidat başarıyla silindi!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setErrorMessage('Aidat silinirken bir hata oluştu.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const formik = useFormik({
    initialValues: {
      userId: ''
    }, 
    validationSchema: aidatSchema,
    onSubmit,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div>
      <UpperArea />
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="w-2/6 p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
            <Title addClass="text-[20px] mb-5px py-5">Aidat İşlemleri</Title>
            <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <div className="flex flex-col w-full gap-y-3 mt-7">
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/aidat_tahsilat">
                  <button>Aidat Tahsilat</button>
                </Link>
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/uye_sorgula">
                  <button>Üye Sorgulama</button>
                </Link>
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/aylik_sorgula">
                  <button>Aylık Sorgulama</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-4/6 p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
            <Title addClass="text-[20px] mb-5px py-5 ">Üye Sorgulama</Title>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col mb-4">
                <label className="text-gray-700 font-bold mb-2">Üye Seçiniz:</label>
                <select
                  name="userId"
                  className="border border-gray-300 p-2 rounded mb-4"
                  value={formik.values.userId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Üye seçiniz" />
                  {uyeler.map((uye) => (
                    <option key={uye._id} value={uye._id}>
                      {uye.userName} {uye.userSurname}
                    </option>
                  ))}
                </select>
                {formik.touched.userId && formik.errors.userId ? (
                  <div className="text-red-500 text-xs mb-4">{formik.errors.userId}</div>
                ) : null}
                <button type="submit" className="py-2 px-4 bg-primary text-white rounded-md shadow-md hover:bg-amber-500 transition-colors duration-300">
                  Sorgula
                </button>
              </div>
            </form>

            {errorMessage && (
              <div className="text-red-500 text-xs mt-4">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
                {successMessage}
              </div>
            )}

            {aidatlar.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Aidat Bilgileri</h3>
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Aidat Dönemi</th>
                      <th className="py-2 px-4 border-b">Aidat Yılı</th>
                      <th className="py-2 px-4 border-b">Ödeme Tarihi</th>
                      <th className="py-2 px-4 border-b">Aidat Miktarı</th>
                      <th className="py-2 px-4 border-b">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aidatlar.map((aidat, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{aidat.AidatDonemi}</td>
                        <td className="py-2 px-4 border-b">{aidat.AidatYili}</td>
                        <td className="py-2 px-4 border-b">{formatDate(aidat.OdenmeTarihi)}</td>
                        <td className="py-2 px-4 border-b">{aidat.AidatMiktari}</td>
                        <td className="py-2 px-4 border-b">
                          <button 
                            className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
                            onClick={() => handleDelete(aidat._id)}
                          >
                            Sil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
