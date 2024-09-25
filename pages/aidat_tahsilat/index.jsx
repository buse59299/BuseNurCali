import React, { useState, useEffect } from 'react';
import UpperArea from '../../components/layout/adminUpperArea';
import Title from '@/components/ui/Title';
import Link from 'next/link';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const data = {
  AidatYili: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
  AidatDonemi: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
};

const createdAt1 = new Date().toISOString();

const aidatSchema = Yup.object().shape({
  userId: Yup.string().required('Üye seçimi zorunludur.'),
  AidatDonemi: Yup.string().required('Aidat dönemi seçimi zorunludur.'),
  AidatYili: Yup.number().required('Yıl seçimi zorunludur.'),
});

export default function Counter() {
  const [uyeler, setUyeler] = useState([]);
  const [aidatlar, setAidatlar] = useState([]);
  const [hisse, setHisse] = useState();
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch users, existing aidat records, and hisse value on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const uyeRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        if (uyeRes.data && Array.isArray(uyeRes.data)) {
          setUyeler(uyeRes.data);
        } else {
          console.error('API\'den geçersiz veri formatı döndü');
        }
  
        const aidatRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kullanici`);
        if (aidatRes.data && Array.isArray(aidatRes.data)) {
          setAidatlar(aidatRes.data);
        } else {
          console.error('Aidat API\'den geçersiz veri formatı döndü');
        }
  
        const hisseRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hisse`);
        if (hisseRes.data.data && typeof hisseRes.data.data.hisse === 'number') {
          setHisse(hisseRes.data.data.hisse);
        } else {
          console.error('Hisse API\'den geçersiz veri formatı döndü');
        }
      } catch (error) {
        console.error('Veri getirilirken hata oluştu:', error);
      }
    };
    fetchData();
  }, []);


  const onSubmit = async (values, actions) => {
    setErrorMessage(null);
  
    const isDuplicate = aidatlar.some(aidat =>
      aidat.userId === values.userId &&
      aidat.AidatDonemi === values.AidatDonemi &&
      aidat.AidatYili === values.AidatYili
    );
  
    if (isDuplicate) {
      setErrorMessage('Bu aidat bilgisi zaten mevcut.');
      return;
    }
  
    try {
      const createdAt = new Date().toISOString();
  
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/kullanici`,
        { ...values, createdAt },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (res.status === 201) {
        setIsSuccessMessageShown(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setIsSuccessMessageShown(false);
        actions.resetForm();
        setAidatlar([...aidatlar, res.data]);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setErrorMessage('Bu aidat bilgisi zaten mevcut.');
        } else {
          setErrorMessage(`Bir hata oluştu: ${err.response.data.message}`);
        }
      } else {
        setErrorMessage(`Bir hata oluştu: ${err.message}`);
      }
    }
  };
  

  const formik = useFormik({
    initialValues: {
      userId: '',
      AidatDonemi: data.AidatDonemi[0],
      AidatYili: data.AidatYili[0],
      OdenmeTarihi: createdAt1,
      AidatMiktari: hisse,
    },
    validationSchema: aidatSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <div>
      <UpperArea />
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="w-2/6 p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
            <Title addClass="text-[20px] mb-2px py-5">Aidat İşlemleri</Title>
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
            <Title addClass="text-[20px] mb-2px py-5">Aidat Tahsilat</Title>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex mb-4">
                <label className="w-1/2 text-gray-700 font-bold">Üye Seçiniz:</label>
                <select
                  name="userId"
                  className="w-1/2 border border-gray-300 p-2 rounded"
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
                  <div className="text-red-500 text-xs mt-1">{formik.errors.userId}</div>
                ) : null}
              </div>

              <div className="flex mb-4">
                <label className="w-1/2 text-gray-700 font-bold">Aidat Dönemi Seçiniz:</label>
                <select
                  name="AidatDonemi"
                  className="w-1/4 border border-gray-300 p-2 rounded"
                  value={formik.values.AidatDonemi}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {data.AidatDonemi.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <select
                  name="AidatYili"
                  className="w-1/4 border border-gray-300 p-2 rounded"
                  value={formik.values.AidatYili}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {data.AidatYili.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {formik.touched.AidatDonemi && formik.errors.AidatDonemi ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.AidatDonemi}</div>
                ) : null}
                {formik.touched.AidatYili && formik.errors.AidatYili ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.AidatYili}</div>
                ) : null}
              </div>

              <div className="flex mb-4">
                <label className="w-1/2 text-gray-700 font-bold">Aidat Miktarı:</label>
                <input
                  type="number"
                  name="AidatMiktari"
                  className="w-1/2 border border-gray-300 p-2 rounded"
                  value={formik.values.AidatMiktari}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled
                />
              </div>

              {errorMessage && <div className="text-red-500 text-xs mt-1">{errorMessage}</div>}

              <button
                type="submit"
                className="bg-primary text-white py-2 px-4 rounded hover:bg-amber-500 shadow-md hover:bg-primary-dark transition-colors duration-300 text-center"
              >
                Aidat Ekle
              </button>
            </form>

            {isSuccessMessageShown && (
              <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
              Aylık tahsilatı başarıyla gerçekleştirilmiştir.
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
