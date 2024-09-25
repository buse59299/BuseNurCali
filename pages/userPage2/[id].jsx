import React, { useState, useEffect } from 'react';
import UpperArea from "../../components/layout/userUpperArea";
import Title from '@/components/ui/Title';
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";
import Loading from '@/components/ui/Loading';

const Index = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aidatlar, setAidatlar] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const session = await getSession();
        if (session) {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          const user = res.data?.find((user) => user.email === session.user.email);
          setCurrentUser(user);

          if (user) {
            const res1 = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kullanici/${user._id}`, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            setAidatlar(res1.data);
          }
        }
      } catch (error) {
        console.error('Error fetching currentUser:', error);
        setError('Unable to fetch aidat data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <UpperArea currentUser={currentUser} />
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="w-full p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
            {aidatlar.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Aidat Bilgileri</h3>
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-300 text-left">Aidat Dönemi</th>
                      <th className="py-2 px-4 border-b border-gray-300 text-left">Aidat Yılı</th>
                      <th className="py-2 px-4 border-b border-gray-300 text-left">Ödeme Tarihi</th>
                      <th className="py-2 px-4 border-b border-gray-300 text-left">Aidat Miktarı</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aidatlar.map((aidat, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-gray-300">{aidat.AidatDonemi}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{aidat.AidatYili}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{formatDate(aidat.OdenmeTarihi)}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{aidat.AidatMiktari} TL</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">No aidat data available</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
