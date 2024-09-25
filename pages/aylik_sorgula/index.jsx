import React from 'react'
import UpperArea from "../../components/layout/adminUpperArea"
import Title from '@/components/ui/Title'
import Link from 'next/link'
const index = () => {
  return (
    <div>
      <UpperArea/>
      <div className="container mx-auto">
        <div className="flex gap-10">
          <div className="w-2/6 p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
            <Title addClass="text-[20px] mb-5px py-5">Kullanıcı Ayarları</Title>
            <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <div className="flex flex-col w-full gap-y-3 mt-7">
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/aidat_tahsilat">
                  <button>Aidat Tahsilat</button>
                </Link>
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/uye_sorgula">
                  <button>Üye Sorgulama</button>
                </Link>
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/aylik_sorgula">
                  <button>Aylık Sorgulama</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-1/2 mt-10">
            uye_sorgula
          </div>
        </div>
      </div>
    </div>
  )
}

export default index