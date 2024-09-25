import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import UpperArea from "../../components/layout/adminUpperArea";
import Title from '@/components/ui/Title';
import Link from 'next/link';

const Index = () => {
  const [debtUsers, setDebtUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDebtUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/borc');
        setDebtUsers(response.data);
      } catch (error) {
        console.error('Borcu olan kullanıcıları alırken bir hata oluştu:', error);
      }
    };

    fetchDebtUsers();
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Tüm kullanıcıları alırken bir hata oluştu:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleNewRecord = (userId) => {
    router.push(`/kayit?userId=${userId}`);
  };

  const filteredUsers = users.filter(user => 
    !debtUsers.some(debtUser => debtUser.userId._id === user._id && debtUser.borcDurumu === false)
  );
  

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
          <Title addClass="text-[20px] mb-5px py-5">Borcu Olmayanlar Listesi</Title>
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2 text-center">İsim</th>
                <th className="border p-2 text-center">Yeni Kayıt</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="border p-2 text-center">{user.userName} {user.userSurname}</td>
                  <td className="border p-2 text-center">
                    <button
                      className="py-2 px-4 bg-primary text-white rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
                      onClick={() => handleNewRecord(user._id)}
                    >
                      Yeni Kayıt
                    </button>
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
