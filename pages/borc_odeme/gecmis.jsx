import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import UpperArea from "../../components/layout/adminUpperArea";
import Title from '@/components/ui/Title';

const Index = () => {
  const [odemeDetaylari, setOdemeDetaylari] = useState([]);
  const [borclar, setBorclar] = useState([]);
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          // Borçları al
          const borcResponse = await axios.get('http://localhost:3000/api/borc/');
          const kullaniciBorclari = borcResponse.data.filter(borc => borc.userId._id === userId && borc.borcDurumu === true);

          // Borç ödeme detaylarını al
          const odemelerResponse = await axios.get('http://localhost:3000/api/borcOdeme');
          const odemeler = odemelerResponse.data.filter(odeme => kullaniciBorclari.some(borc => borc._id === odeme.borcId._id));

          setBorclar(kullaniciBorclari);
          setOdemeDetaylari(odemeler);
        } catch (error) {
          console.error('Verileri alırken bir hata oluştu:', error);
        }
      };
      fetchData();
    }
  }, [userId]);

  return (
    <div>
      <UpperArea />
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="w-1/2 mt-10">
            <div className="border rounded-lg shadow-lg p-5 bg-white">
              <Title addClass="text-[20px] mb-5 py-5">Geçmiş Ödemeler</Title>
              {borclar.length === 0 || odemeDetaylari.length === 0 ? (
                <p>Geçmiş borç bilgisi bulunamadı.</p>
              ) : (
                <table className="table-fixed border-collapse border border-gray-300 w-full">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 bg-gray-100">Ödeme Tarihi</th>
                      <th className="border border-gray-300 p-2 bg-gray-100">Ödeme Miktarı</th>
                      <th className="border border-gray-300 p-2 bg-gray-100">Kalan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borclar.map((borc) => (
                      odemeDetaylari.filter(odeme => odeme.borcId._id === borc._id).map((odeme) => (
                        <tr key={odeme._id}>
                          <td className="border border-gray-300 p-2">{new Date(odeme.odendigiTarih).toLocaleDateString()}</td>
                          <td className="border border-gray-300 p-2">{odeme.odenmeMiktari}</td>
                          <td className="border border-gray-300 p-2">{odeme.kalan}</td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
