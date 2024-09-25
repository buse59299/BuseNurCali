import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import UpperArea from '../../components/layout/adminUpperArea';
import Title from '@/components/ui/Title';

const NewRecord = () => {
  const [user, setUser] = useState(null);
  const [debtAmount, setDebtAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const [totalSavings, setTotalSavings] = useState(0);
  const [hisse, setHisse] = useState();
  const { userId } = router.query;

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
          setUser(response.data);
          const aidatResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kullanici/${userId}`);
          const totalAidatMiktari = aidatResponse.data.reduce((sum, user) => sum + user.AidatMiktari, 0);
          setTotalSavings(totalAidatMiktari);
          const hisseRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hisse`);
          if (hisseRes.data.data && typeof hisseRes.data.data.hisse === 'number') {
            setHisse(hisseRes.data.data.hisseKati);
          } else {
            console.error('Hisse API\'den geçersiz veri formatı döndü');
          }
        } catch (error) {
          console.error('Kullanıcı bilgilerini alırken bir hata oluştu:', error);
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maxDebtAmount = totalSavings * hisse;

    if (debtAmount > maxDebtAmount) {
      setErrorMessage(`Borç miktarı en fazla ${maxDebtAmount} olabilir. Lütfen daha düşük bir miktar giriniz.`);
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/borc', {
        userId,
        debtAmount,
        borcDurumu: false
      });

      if (response.status === 201) {
        setSuccessMessage('Borç başarıyla eklendi.');
        setTimeout(() => setSuccessMessage(''), 3000);
        router.push('/AdminPage2');
      }
    } catch (error) {
      console.error('Borç eklenirken bir hata oluştu:', error);
      alert('Borç eklenirken bir hata oluştu.');
    }
  };

  return (
    <div>
      <UpperArea />
      <div className="container mx-auto mt-10">
        <div className="w-full max-w-md p-6 bg-white border shadow-lg rounded-lg">
          <Title addClass="text-[20px] mb-5px py-5">Yeni Kayıt</Title>
          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Ad:</label>
                <input
                  type="text"
                  value={user.userName}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700">Soyad:</label>
                <input
                  type="text"
                  value={user.userSurname}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700">ID:</label>
                <input
                  type="text"
                  value={user._id}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700">En Fazla Alınabilecek Borç Miktarı</label>
                <input
                  type="text"
                  value={totalSavings * hisse}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700">Borç Miktarı:</label>
                <input
                  type="number"
                  value={debtAmount}
                  onChange={(e) => setDebtAmount(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {errorMessage && (
                <div className="bg-red-500 text-white p-2 mt-2 rounded-md">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
                  {successMessage}
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-2 px-4 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
                >
                  Kaydet
                </button>
              </div>
            </form>
          ) : (
            <p>Kullanıcı bilgileri yükleniyor...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewRecord;
