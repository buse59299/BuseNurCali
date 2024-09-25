import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpperArea from "../../components/layout/adminUpperArea";
import Title from '@/components/ui/Title';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Index = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Kullanıcıları çekme sırasında bir hata oluştu:", error);
    }
  };

  const handleDeleteUserRecords = async (userId) => {
    try {
      // Kullanıcının borç bilgilerini sil
      await axios.delete(`/api/resetUser`, { data: { userId } });

      // Kullanıcıları yenile
      fetchUsers();

      console.log("Kullanıcının borç bilgileri başarıyla silindi.");
    } catch (error) {
      console.error("Kullanıcının borç bilgilerini silme sırasında bir hata oluştu:", error);
    }
  };
  const handleDeleteUserRecords1 = async (userId) => {
    try {
      // Kullanıcının borç bilgilerini sil
      await axios.delete(`/api/deleteUser`, { data: { userId } });

      // Kullanıcıları yenile
      fetchUsers();

      console.log("Kullanıcının borç bilgileri başarıyla silindi.");
    } catch (error) {
      console.error("Kullanıcının borç bilgilerini silme sırasında bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <UpperArea />
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="w-full p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
            <Title addClass="text-[20px] mb-5px py-5">Kullanıcı İşlemleri</Title>
            <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <div className="flex flex-col w-full gap-y-3 mt-7">
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/adminUserAdd">
                  <button>Kullanıcı Ekle</button>
                </Link>
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/adminUserList">
                  <button>Kullanıcıları Listesi</button>
                </Link>
              </div>
            </div>
            <Title addClass="text-[35px] mb-5px py-5">Kullanıcı Listesi</Title>
            <table className="table-fixed border border-gray-300 w-full">
              <thead>
                <tr>
                  <th className="border p-2 text-center">İsim</th>
                  <th className="border p-2 text-center">Güncelle</th>
                  <th className="border p-2 text-center">Üye Sil</th>
                  <th className="border p-2 text-center">Üye Sıfırla</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="border p-2 text-center">{user.userName} {user.userSurname}</td>
                    <td className="border p-2">
                      <div className="flex justify-center">
                        <button
                          className="py-2 px-4 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
                          onClick={() => router.push(`/guncelle?userId=${user._id}`)}
                        >
                          Güncelle
                        </button>
                      </div>
                    </td>
                    <td className="border p-2">
                      <div className="flex justify-center">
                        <button
                          className="py-2 px-4 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
                          onClick={() => handleDeleteUserRecords1(user._id)}
                        >
                          Üye Sil
                        </button>
                      </div>
                    </td>
                    <td className="border p-2">
                      <div className="flex justify-center">
                        <button
                          className="py-2 px-4 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
                          onClick={() => handleDeleteUserRecords(user._id)}
                        >
                          Üye Sıfırla
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
