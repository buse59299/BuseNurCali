import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../../components/ui/Title';


const MainPage = () => {
    const [users, setUsers] = useState([]);
    const [memberCount, setMemberCount] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [totalSavings1, setTotalSavings1] = useState(0);
    const [minSavingsUser, setMinSavingsUser] = useState(null);
    const [maxSavingsUser, setMaxSavingsUser] = useState(null);
    const [karMiktari, setkarMiktari] = useState();
    const [sandiginToplamAltini, setsandiginToplamAltini] = useState();

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            const usersData = response.data;
            setUsers(usersData);
            setMemberCount(usersData.length);

            const aidatResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/kullanici`);
            const totalAidatMiktari = aidatResponse.data.reduce((sum, user) => sum + user.AidatMiktari, 0);
            setTotalSavings(totalAidatMiktari);

            const borcResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borc`);
            const filteredUsers = borcResponse.data.filter(user => user.borcDurumu === false);
            const totalBorcMiktari = filteredUsers.reduce((sum, user) => sum + user.debtAmount, 0);
            setTotalSavings1(totalBorcMiktari);


            const savingsRequests = usersData.map(user => {
                const userId = user._id || user.id;
                if (userId) {
                    return axios.get(`http://localhost:3000/api/kullanici/${userId}`);
                } else {
                    console.error('User ID not found:', user);
                    return Promise.resolve({ data: [] });
                }
            });

            const savingsResponses = await Promise.all(savingsRequests);

            const usersWithSavings = usersData.map((user, index) => {
                const savingsData = savingsResponses[index] ? savingsResponses[index].data : [];
                console.log(`User ID: ${user._id || user.id}, Savings Data:`, savingsData);

                const totalSavingsForUser = savingsData.reduce((sum, record) => sum + record.AidatMiktari, 0);
                return {
                    ...user,
                    savings: totalSavingsForUser
                };
            });

            setUsers(usersWithSavings);

            // Find user with minimum savings
            const minSavingsUser = usersWithSavings.reduce((minUser, currentUser) => {
                if (!minUser || currentUser.savings < minUser.savings) {
                    return currentUser;
                } else {
                    return minUser;
                }
            }, null);
            setMinSavingsUser(minSavingsUser);

            // Find user with maximum savings
            const maxSavingsUser = usersWithSavings.reduce((maxUser, currentUser) => {
                if (!maxUser || currentUser.savings > maxUser.savings) {
                    return currentUser;
                } else {
                    return maxUser;
                }
            }, null);
            setMaxSavingsUser(maxSavingsUser);

        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
              const hisseRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hisse`);
              if (hisseRes.data.data && typeof hisseRes.data.data.hisse === 'number') {
                setkarMiktari(hisseRes.data.data.karPayi);
                setsandiginToplamAltini(hisseRes.data.data.sandiginToplamAltini);

              } else {
                console.error('Hisse API\'den geçersiz veri formatı döndü');
              }
            } catch (error) {
              console.error('Veri getirilirken hata oluştu:', error);
            }
          };
        fetchUsers();
        fetchData();
    }, []);

    return (
        <div className="container mx-auto p-4 rounded-lg">
            <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-5">
                <Title addClass="text-[35px] mb-5px py-5">Sandık Genel Bilgileri</Title>
                <form>
                    <div className="flex mb-4 border-b pb-2 border-gray-300">
                        <label className="w-1/2 text-gray-700 font-bold">Üye Sayısı:</label>
                        <div className="w-1/2 text-gray-700">{memberCount}</div>
                    </div>

                    <div className="flex mb-4 border-b pb-2 border-gray-300">
                        <label className="w-1/2 text-gray-700 font-bold">Sandıkta Biriken Toplam Para:</label>
                        <div className="w-1/2 text-gray-700">{totalSavings} TL</div>
                    </div>
                    
                    <div className="flex mb-4 border-b pb-2 border-gray-300">
                        <label className="w-1/2 text-gray-700 font-bold">Toplam Verilen Borç Miktarı:</label>
                        <div className="w-1/2 text-gray-700">{totalSavings1} TL</div>
                    </div>

                    <div className="flex mb-4 border-b pb-2 border-gray-300">
                        <label className="w-1/2 text-gray-700 font-bold">Nakit Para Miktarı:</label>
                        <div className="w-1/2 text-gray-700">{totalSavings - totalSavings1} TL</div>
                    </div>

                    <div className="flex mb-4 border-b pb-2 border-gray-300">
                        <label className="w-1/2 text-gray-700 font-bold">Üyelerdeki Para Miktarı:</label>
                        <div className="w-1/2 text-gray-700">0</div>
                    </div>

                    <div className="flex mb-4 border-b pb-2 border-gray-300">
                        <label className="w-1/2 text-gray-700 font-bold">En Az Birikim Miktarı:</label>
                        <div className="w-1/2 text-gray-700">
                            {minSavingsUser ? `${minSavingsUser.savings} TL (${minSavingsUser.userName} ${minSavingsUser.userSurname})` : 'Bilgi bulunamadı'}
                        </div>
                    </div>

                    <div className="flex mb-4 border-b pb-2 border-gray-300">
                        <label className="w-1/2 text-gray-700 font-bold">En Çok Birikim Miktarı:</label>
                        <div className="w-1/2 text-gray-700">
                            {maxSavingsUser ? `${maxSavingsUser.savings} TL (${maxSavingsUser.userName} ${maxSavingsUser.userSurname})` : 'Bilgi bulunamadı'}
                        </div>
                    </div>

                    <div className="flex mb-4 border-b pb-2 border-gray-300">
                        <label className="w-1/2 text-gray-700 font-bold">Sandığın Toplam Kar Miktarı:</label>
                        <div className="w-1/2 text-gray-700">{karMiktari}</div>
                    </div>

                    <div className="flex mb-4 border-b pb-2 border-gray-300">
                        <label className="w-1/2 text-gray-700 font-bold">Altın Miktarı (Gram):</label>
                        <div className="w-1/2 text-gray-700">{sandiginToplamAltini}</div>
                    </div>
                </form>
            </div>

            <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-lg mt-5">
                <Title addClass="text-[35px] mb-5px py-5">Kullanıcı Listesi</Title>
                <form>
                    {users.map((user, index) => (
                        <div key={index} className="flex mb-4 border-b pb-2 border-gray-300">
                            <label className="w-1/2 text-gray-700 font-bold">{user.userName} {user.userSurname}</label>
                            <div className="w-1/2 text-gray-700">
                                {user.savings ? `${user.savings} TL` : 'Birikim bilgisi bulunamadı'}
                            </div>
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
};

export default MainPage;
