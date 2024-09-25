import React from 'react';
import Link from 'next/link';
import Title from '@/components/ui/Title';
import UpperArea from '@/components/layout/adminUpperArea';
const MainComponent = () => {
  return (
    <div>
      <UpperArea/>
      <div className="container mx-auto">
        <div className=" h-full grid grid-cols-1 gap-10">
          <div className=" p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
