import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import UpperArea from '../../components/layout/adminUpperArea';
import Title from '@/components/ui/Title';

const BorcOdeme = () => {
  const [user, setUser] = useState(null);
  const [borc, setBorc] = useState(null);
  const [odenenMiktar, setOdenenMiktar] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [kalanBorc, setKalanBorc] = useState(null);
  const router = useRouter();
  const { userId, borcId } = router.query;

  useEffect(() => {
    if (userId && borcId) {
      const fetchData = async () => {
        try {
          // Kullanıcı verisini al
          const userResponse = await axios.get(`http://localhost:3000/api/users/${userId}`);
          setUser(userResponse.data);

          // Borç verisini al
          const borcResponse = await axios.get(`http://localhost:3000/api/borc/${borcId}`);
          const borcData = borcResponse.data.data.debtAmount;

          setBorc(borcData);

          // Tüm ödeme kayıtlarını al
          const odemelerResponse = await axios.get('http://localhost:3000/api/borcOdeme');
          const odemeler = odemelerResponse.data;
          // Belirli borca ait ödemeleri filtrele
          const borcOdemeleri = odemeler.filter(odeme => odeme.borcId._id === borcId);
          
          // Toplam ödenen miktarı hesapla
          const toplamOdenen = borcOdemeleri.reduce((total, odeme) => total + odeme.odenmeMiktari, 0);

          // Kalan borcu hesapla ve state'e ata
          setKalanBorc(borcData - toplamOdenen);
        } catch (error) {
          console.error('Verileri alırken bir hata oluştu:', error);
        }
      };
      fetchData();
    }
  }, [userId, borcId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/borcOdeme', {
        userId,
        borcId,
        odenmeMiktari: parseFloat(odenenMiktar)
      });

      if (response.status === 201) {
        setSuccessMessage('Ödeme başarıyla yapıldı.');
        setTimeout(() => setSuccessMessage(''), 3000);
        setKalanBorc((prevKalanBorc) => prevKalanBorc - parseFloat(odenenMiktar));
        setOdenenMiktar('');
      }
    } catch (error) {
      console.error('Ödeme yapılırken bir hata oluştu:', error);
      setErrorMessage('Ödeme yapılırken bir hata oluştu.');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div>
      <UpperArea />
      <div className="container mx-auto mt-10">
        <div className="w-full max-w-md p-6 bg-white border shadow-lg rounded-lg">
          <Title addClass="text-[20px] mb-5px py-5">Borç Ödeme</Title>
          {user && borc !== null ? (
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
                <label className="block text-gray-700">Kalan Borç Miktarı:</label>
                <input
                  type="number"
                  value={kalanBorc}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700">Ödenecek Borç Miktarı:</label>
                <input
                  type="number"
                  value={odenenMiktar}
                  onChange={(e) => setOdenenMiktar(e.target.value)}
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
            <p>Veriler yükleniyor...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorcOdeme;
