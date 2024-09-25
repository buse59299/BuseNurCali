import React from 'react';
import UpperArea from "../../components/layout/adminUpperArea";
import Title from '@/components/ui/Title';
import Link from 'next/link';
import AddUser from "../UserAdd";

const index = () => {
  return (
    <div>
      <UpperArea/>
      <div className="container mx-auto">
        
        <div className="flex gap-10">
          <div className="w-2/6 p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
            <Title addClass="text-[20px] mb-5px py-5">Kullanıcı İşlemleri</Title>
            <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <div className="flex flex-col w-full gap-y-3 mt-7">
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/adminUserAdd">
                  <button>Kullanıcı Ekle</button>
                </Link>
                <Link className="py-4/6 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/adminUserList">
                  <button>Kullanıcıları Listele</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2 mt-10">
            <AddUser/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index;
