import React from 'react';
import { useRouter } from 'next/router';
import Logo from '../components/ui/Logo';

const AcikRiza = () => {
  const router = useRouter();

  const handleAccept = () => {
    // Kullanıcıyı giriş ekranına yönlendirme
    router.push('/userLogin');
  };

  return (
    <div className="h-[5.5rem] bg-secondary">
      <div className="container text-white mx-auto flex justify-between items-center h-full">
        <Logo />
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Açık Rıza Metni</h1>
        <p className="mb-4">
          Değerli Müşterimiz,
        </p>
        <p className="mb-4">
          Bankamız tarafından sunulan hizmetlerden faydalanabilmeniz ve bankacılık işlemlerinizin gerçekleştirilebilmesi için kişisel verilerinizin işlenmesi gerekmektedir. Bu kapsamda, 6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca, kişisel verilerinizin işlenmesi hususunda açık rızanızı talep etmekteyiz.
        </p>
        <div className="mb-4">
          <p>İşlenecek Kişisel Veriler:</p>
          <div>
            <ul className="list-disc list-inside">
              <li>Kimlik Bilgileri (Ad, soyad, T.C. kimlik numarası, doğum tarihi vb.)</li>
              <li>İletişim Bilgileri (Telefon numarası, e-posta adresi, adres vb.)</li>
              <li>Finansal Bilgiler (Banka hesap bilgileri, kredi kartı bilgileri, gelir durumu vb.)</li>
              <li>İşlem Güvenliği Bilgileri (IP adresi, giriş çıkış kayıtları, şifre ve parola bilgileri vb.)</li>
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <p>Kişisel Verilerinizin İşlenme Amaçları:</p>
          <div>
            <ul className="list-disc list-inside">
              <li>Bankacılık hizmetlerinin sunulabilmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Müşteri memnuniyetinin artırılması</li>
              <li>Risk yönetimi ve kalite kontrol faaliyetlerinin yürütülmesi</li>
              <li>Hizmetlerimizin geliştirilmesi ve sizlere daha iyi hizmet sunulabilmesi</li>
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <p>Kişisel Verilerinizin Aktarılabileceği Kişiler ve Kuruluşlar:</p>
          <div>
            <ul className="list-disc list-inside">
              <li>Yasal olarak yetkili kamu kurum ve kuruluşları</li>
              <li>Yurt içi ve yurt dışındaki iş ortaklarımız ve hizmet sağlayıcılarımız</li>
              <li>Bankacılık faaliyetlerimizi yürütmek üzere iş birliği yaptığımız kuruluşlar</li>
            </ul>
          </div>
        </div>
        <p className="mb-4">
          KVKK kapsamında sahip olduğunuz haklar ve daha fazla bilgi için web sitemizde yer alan Kişisel Verilerin Korunması Politikamızı inceleyebilirsiniz.
        </p>
        <p className="mb-4">
          Kişisel verilerinizin işlenmesine ilişkin açık rıza vermekle, yukarıda belirtilen koşullarda kişisel verilerinizin işlenmesini kabul etmiş bulunmaktasınız.
        </p>
        <p className="mb-4">
          Saygılarımızla,
        </p>
        <p>
          Bankamız
        </p>
        <div className="mt-8">
          <button
            onClick={handleAccept}
            className="bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-primary-dark transition-colors duration-300"
          >
            Kabul Ediyorum ve Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcikRiza;
