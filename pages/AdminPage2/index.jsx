import React from 'react'
import UpperArea from "../../components/layout/adminUpperArea"
import Title from '@/components/ui/Title'
import Link from 'next/link'
const index = () => {
  return (
    <div>
      <UpperArea/>
      <div className="container mx-auto grid grid-cols-1 gap-10">
          <div className="p-6 bg-white border shadow-lg rounded-lg mt-10">
            <Title addClass="text-[20px] mb-5px py-5">Borç İşlemleri</Title>
            <div className="p-4 bg-gray-100 border  rounded-lg">
              <div className="flex flex-col w-full  gap-y-3 mt-7">
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/BorcuOlanlar">
                  <button >Borcu Olanlar</button>
                </Link>
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/BorcuOlmayanlar">
                  <button>Borcu Olmayanlar</button>
                </Link>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default index