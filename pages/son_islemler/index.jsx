import { useState } from 'react'
import UpperArea from "../../components/layout/adminUpperArea"
import Title from '@/components/ui/Title'
import Link from 'next/link'
export default function Counter() {
    const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);
    const [isSuccessMessageShown2, setIsSuccessMessageShown2] = useState(false);
    const onBackup = async () => {
      setIsSuccessMessageShown(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsSuccessMessageShown(false);
    };
    const onBackup2 = async () => {
      setIsSuccessMessageShown2(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsSuccessMessageShown2(false);
    };
  return (
    <div>
      <UpperArea/>
      <div className="container mx-auto">
        <div className="m-2/6 flex gap-10">
          <div className="m-2/6 p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
            <Title addClass="text-[20px] mb-5px py-5">Genel İşlemler</Title>
            <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg">
              <div className="flex flex-col w-full gap-y-3 mt-7">
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/Ayarlar">
                  <button>Ayarlar</button>
                </Link>
                <button
                  type="button"
                  onClick={onBackup}
                  className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center">
                  Yedek Al
                </button>
                {isSuccessMessageShown && (
                  <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
                    Sistem Yedeği Başarıyla Yüklendi.
                  </div>
                )}
                <button
                  type="button"
                  onClick={onBackup2}
                  className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center">
                  Excel Yedeği Al
                </button>
                {isSuccessMessageShown2 && (
                  <div className="bg-green-500 text-white p-2 mt-2 rounded-md">
                    Excel Yedeği Başarıyla Yüklendi. 
                  </div>
                )}
                <Link className="py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300 text-center" href="/son_islemler">
                  <button>Son İşlemler</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-4/6 p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
          <Title addClass="text-[20px] mb-2px py-5">Son İşlemler</Title>


          </div>
        </div>
      </div>
    </div>
  )
}