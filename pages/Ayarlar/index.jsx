import React, { useState } from 'react';
import UpperArea from "../../components/layout/adminUpperArea";
import Title from '@/components/ui/Title';
import Link from 'next/link';
import { useFormik } from 'formik';

export default function Counter() {
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);
  const [isSuccessMessageShown3, setIsSuccessMessageShown3] = useState(false);
  const [isSuccessMessageShown2, setIsSuccessMessageShown2] = useState(false);

  const onBackup = async () => {
    setIsSuccessMessageShown2(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsSuccessMessageShown2(false);
  };

  const onBackup2 = async () => {
    setIsSuccessMessageShown3(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsSuccessMessageShown3(false);
  };

  const formik = useFormik({
    initialValues: {
      hisse: "",
      hisseKati: "",
      tavanBedeli: "",
      karPayi: "",
      sandiginToplamAltini: "",
    },
    onSubmit: async (values, actions) => {
      try {
        const response = await fetch('/api/hisse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setIsSuccessMessageShown(true);
          await new Promise((resolve) => setTimeout(resolve, 3000));
          actions.resetForm();
          setIsSuccessMessageShown(false);
        } else {
          console.error('Failed to save data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <div>
      <UpperArea />
      <div className="container mx-auto">
        <div className="m-2/6 flex gap-10">
          <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
            <Title addClass="text-[20px] mb-5px py-5">Genel İşlemler</Title>
            <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <div className="flex flex-col w-full gap-y-3 mt-7">
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/Ayarlar">
                  <button>Ayarlar</button>
                </Link>
                <button type="button" onClick={onBackup} className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center">
                  Yedek Al
                </button>
                {isSuccessMessageShown2 && (
                  <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
                    Sistem Yedeği Başarıyla Yüklendi.
                  </div>
                )}
                <button type="button" onClick={onBackup2} className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center">
                  Excel Yedeği Al
                </button>
                {isSuccessMessageShown3 && (
                  <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
                    Excel Yedeği Başarıyla Yüklendi.
                  </div>
                )}
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/son_islemler">
                  <button>Son İşlemler</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-4/6 p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
            <Title addClass="text-[20px] mb-2px py-5">Ayarlar</Title>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex mb-4">
                <label className="w-1/2 text-gray-700 font-bold">Hisse bedeli nedir?</label>
                <input type="number" name="hisse" className="w-1/2 border border-gray-300 p-2 rounded" value={formik.values.hisse} onChange={formik.handleChange} />
              </div>
              <div className="flex mb-4">
                <label className="w-1/2 text-gray-700 font-bold">Hissenin kaç katı alınabilir?</label>
                <input type="number" name="hisseKati" className="w-1/2 border border-gray-300 p-2 rounded" value={formik.values.hisseKati} onChange={formik.handleChange} />
              </div>
              <div className="flex mb-4">
                <label className="w-1/2 text-gray-700 font-bold">Bir üye sandığın kaçta birine sahip olabilir?</label>
                <input type="number" name="tavanBedeli" className="w-1/2 border border-gray-300 p-2 rounded" value={formik.values.tavanBedeli} onChange={formik.handleChange} />
              </div>
              <div className="flex mb-4">
                <label className="w-1/2 text-gray-700 font-bold">Alınabilecek toplam kar payı ne kadardır?</label>
                <input type="number" name="karPayi" className="w-1/2 border border-gray-300 p-2 rounded" value={formik.values.karPayi} onChange={formik.handleChange} />
              </div>
              <div className="flex mb-4">
                <label className="w-1/2 text-gray-700 font-bold">Sandığın toplam altını ne kadardır?</label>
                <input type="number" name="sandiginToplamAltini" className="w-1/2 border border-gray-300 p-2 rounded" value={formik.values.sandiginToplamAltini} onChange={formik.handleChange} />
              </div>
              <button type="submit" className="py-2 px-4 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 mt-4">
                Ayarları Değiştir
              </button>
              {isSuccessMessageShown && (
                <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
                  Ayarlar başarıyla değiştirilmiştir.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
