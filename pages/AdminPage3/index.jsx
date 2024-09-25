import { useState } from 'react';
import UpperArea from "../../components/layout/adminUpperArea";
import Title from '@/components/ui/Title';
import Link from 'next/link';

export default function Counter() {
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);
  const [isSuccessMessageShown2, setIsSuccessMessageShown2] = useState(false);

  const onBackup = async () => {
    try {
      const res = await fetch('/api/backup', { method: 'POST' });
      if (res.ok) {
        setIsSuccessMessageShown(true);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'backup.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Backup failed');
      }
    } catch (err) {
      console.error('Backup error:', err);
    } finally {
      setTimeout(() => setIsSuccessMessageShown(false), 3000);
    }
  };

  const onBackup2 = async () => {
    try {
      const res = await fetch('/api/backup', { method: 'POST' });
      if (res.ok) {
        setIsSuccessMessageShown2(true);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'backup.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Backup failed');
      }
    } catch (err) {
      console.error('Backup error:', err);
    } finally {
      setTimeout(() => setIsSuccessMessageShown2(false), 3000);
    }
  };

  return (
    <div>
      <UpperArea />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-10">
          <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-10">
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
        </div>
      </div>
    </div>
  );
}
