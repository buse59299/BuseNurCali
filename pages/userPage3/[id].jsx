import React from 'react';
import UpperArea from"../../components/layout/userUpperArea";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";
import Loading from '@/components/ui/Loading';
import Title from '@/components/ui/Title';

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
   const [odemeDetaylari, setOdemeDetaylari] = useState([]);
  const [borclar, setBorclar] = useState([]);
  const [MevcutodemeDetaylari, setMevcutOdemeDetaylari] = useState([]);
  const [Mevcutborclar, setMevcutBorclar] = useState([]);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const session = await getSession();
        if (session) {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          const user = res.data?.find((user) => user.email === session.user.email);
          setCurrentUser(user);
          const borcResponse = await axios.get('http://localhost:3000/api/borc');
          const kullaniciBorclari = borcResponse.data.filter(borc => borc.userId._id === user._id && borc.borcDurumu === true);

          // Borç ödeme detaylarını al
          const odemelerResponse = await axios.get('http://localhost:3000/api/borcOdeme');
          const odemeler = odemelerResponse.data.filter(odeme => kullaniciBorclari.some(borc => borc._id === odeme.borcId._id));

          setBorclar(kullaniciBorclari);
          setOdemeDetaylari(odemeler);
          const MevcutborcResponse = await axios.get('http://localhost:3000/api/borc');
          const MevcutkullaniciBorclari = MevcutborcResponse.data.filter(borc => borc.userId._id === user._id && borc.borcDurumu === false);

          // Borç ödeme detaylarını al
          const MevcutodemelerResponse = await axios.get('http://localhost:3000/api/borcOdeme');
          const Mevcutodemeler = MevcutodemelerResponse.data.filter(odeme => MevcutkullaniciBorclari.some(borc => borc._id === odeme.borcId._id));

          setMevcutBorclar(MevcutkullaniciBorclari);
          setMevcutOdemeDetaylari(Mevcutodemeler);

          

        }
      } catch (error) {
        console.error('Error fetching currentUser:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <UpperArea currentUser={currentUser}/>
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="w-full mt-10">
            <div className="flex flex-col gap-5">
            <div className="border rounded-lg shadow-lg p-5 bg-white">
              <Title addClass="text-[20px] mb-5 py-5">Mevcut Borç bilgisi</Title>
                <table className="table-fixed border-collapse border border-gray-300 w-full">
                <thead>
                <tr>
                  <th className="border border-gray-300 p-2 bg-gray-100">Alış Tarihi</th>
                  <th className="border border-gray-300 p-2 bg-gray-100">Borç Miktarı</th>
                </tr>
              </thead>
              <tbody>
                {Mevcutborclar.map((borc) => (
                  <tr key={borc._id}>
                    <td className="border border-gray-300 p-2 text-center">{new Date(borc.date).toLocaleDateString()}</td>
                    <td className="border border-gray-300 p-2 text-center">{borc.debtAmount}</td>
                  </tr>
                ))}
              </tbody>

                </table>
            </div>
            </div>
          <div className='py-5'>
          <div className="border rounded-lg shadow-lg p-5 bg-white">
              <Title addClass="text-[20px] mb-5 py-5">Borç Ödeme Detayı</Title>
              {Mevcutborclar.length === 0 || MevcutodemeDetaylari.length === 0 ? (
                <p>Daha önce ödeme gerçekleştirilmemiş.</p>
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
                    {Mevcutborclar.map((borc) => (
                     MevcutodemeDetaylari.filter(odeme => odeme.borcId._id === borc._id).map((odeme) => (
                        <tr key={odeme._id}>
                          <td className="border border-gray-300 p-2 text-center">{new Date(odeme.odendigiTarih).toLocaleDateString()}</td>
                          <td className="border border-gray-300 p-2 text-center">{odeme.odenmeMiktari}</td>
                          <td className="border border-gray-300 p-2 text-center">{odeme.kalan}</td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
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
                          <td className="border border-gray-300 p-2 text-center">{new Date(odeme.odendigiTarih).toLocaleDateString()}</td>
                          <td className="border border-gray-300 p-2 text-center">{odeme.odenmeMiktari}</td>
                          <td className="border border-gray-300 p-2 text-center">{odeme.kalan}</td>
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
  )
}

export default Index;