import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import UpperArea from "../../components/layout/adminUpperArea";
import Title from '@/components/ui/Title';
import Link from 'next/link';

const Index = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/borc');
        if (response.data && Array.isArray(response.data)) {
          const filteredUsers = response.data.filter(user => user.borcDurumu === false);
          setUsers(filteredUsers);
        }
        console.log(response.data);
      } catch (error) {
        console.error('Verileri alırken bir hata oluştu:', error);
      }
    };
    
    fetchUsers();
  }, []);

  const handleNewRecord = (userId, borcId) => {
    router.push(`/borc_odeme?userId=${userId}&borcId=${borcId}`);
  };

  const handleNewRecord1 = (userId, borcId) => {
    router.push(`/borc_odeme/odeme_detay?userId=${userId}&borcId=${borcId}`);
  };

  const handleNewRecord2 = (userId, borcId) => {
    router.push(`/borc_odeme/gecmis?userId=${userId}&borcId=${borcId}`);
  };

  return (
    <div>
      <UpperArea />
      <div className="container mx-auto grid grid-cols-1 gap-10">
        <div className="p-6 bg-white border shadow-lg rounded-lg mt-10">
          <Title addClass="text-[20px] mb-5px py-5">Borç İşlemleri</Title>
          <div className="p-4 bg-gray-100 border rounded-lg">
            <div className="flex flex-col w-full gap-y-3 mt-7">
              <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/BorcuOlanlar">
                <button>Borcu Olanlar</button>
              </Link>
              <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/BorcuOlmayanlar">
                <button>Borcu Olmayanlar</button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Title addClass="text-[20px] mb-5px py-5 ">Borcu Olanlar Listesi</Title>
          <table className="table-fixed border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border p-2 text-center">İsim</th>
                <th className="border p-2 text-center">Ödeme</th>
                <th className="border p-2 text-center">Ödeme Detay</th>
                <th className="border p-2 text-center">Geçmiş</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border p-2 text-center">{user.userId.userName} {user.userId.userSurname}</td>
                  <td className="border p-2">
                    <div className="flex justify-center">
                      <button
                        className="py-2 px-4 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
                        onClick={() => handleNewRecord(user.userId._id, user._id)}
                      >
                        Ödeme
                      </button>
                    </div>
                  </td>
                  <td className="border p-2">
                    <div className="flex justify-center">
                      <button
                        className="py-2 px-4 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
                        onClick={() => handleNewRecord1(user.userId._id, user._id)}
                      >
                        Ödeme Detay
                      </button>
                    </div>
                  </td>
                  <td className="border p-2">
                    <div className="flex justify-center">
                      <button
                        className="py-2 px-4 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
                        onClick={() => handleNewRecord2(user.userId._id, user._id)}
                      >
                        Geçmiş
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
  );
};

export default Index;
