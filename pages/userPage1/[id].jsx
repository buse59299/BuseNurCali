import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import UpperArea from '../../components/layout/userUpperArea';
import Title from '@/components/ui/Title';
import Loading from '@/components/ui/Loading';

const BanaOzel = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aidatBilgileri, setAidatBilgileri] = useState([]);
  const [borcBilgileri, setBorcBilgileri] = useState([]);
  const [hisse, setHisse] = useState(3); // Set a default value of 1 to avoid NaN
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
            const aidatRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kullanici/${user._id}`);
            setAidatBilgileri(aidatRes.data);

            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borc/${user._id}`);
          if (response.data && Array.isArray(response.data)) {
          const filteredUsers = response.data.filter(user => user.borcDurumu === false);
          setBorcBilgileri(filteredUsers);
        }

            const hisseRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hisse`);
            if (hisseRes.data.data && typeof hisseRes.data.data.hisseKati === 'number') {
              setHisse(hisseRes.data.data.hisseKati);
            } else {
              console.error('Hisse API\'den geçersiz veri formatı döndü');
            }
          }
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

  const toplamAidat = aidatBilgileri.reduce((total, item) => total + item.AidatMiktari, 0);
  const toplamBorc = borcBilgileri.reduce((total, item) => total + item.debtAmount, 0);
  const borcAlabileceginizPara = toplamAidat * hisse;

  return (
    <div>
      <UpperArea currentUser={currentUser} />
      <div className="container mx-auto p-4 border border-gray-300 rounded-lg shadow-lg mt-5">
        <Title addClass="text-[35px] mb-5px py-5">Bana Özel</Title>
        <form>
          <div className="flex mb-4 border-b pb-2 border-gray-300">
            <label className="w-1/2 text-gray-700 font-bold">
              Toplam Biriken Paranız:
            </label>
            <div className="w-1/2 text-gray-700">
              {toplamAidat} TL
            </div>
          </div>

          <div className="flex mb-4 border-b pb-2 border-gray-300">
            <label className="w-1/2 text-gray-700 font-bold">
              Sandığa Olan Borcunuz:
            </label>
            <div className="w-1/2 text-gray-700">
              {toplamBorc} TL
            </div>
          </div>

          <div className="flex mb-4 border-b pb-2 border-gray-300">
            <label className="w-1/2 text-gray-700 font-bold">
              Borç Alabileceğiniz Para Miktarı:
            </label>
            <div className="w-1/2 text-gray-700">
              {borcAlabileceginizPara} TL
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BanaOzel;
