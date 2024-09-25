import React, { useEffect, useState } from 'react';
import OutsideClickHandler from "react-outside-click-handler";
import { RiCloseCircleFill } from "react-icons/ri";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export const Out = ({ session }) => {
    const { push } = useRouter();
    const [isSearchModal, setIsSearchModal] = useState(false);

    const handleSignOut = async () => {
        try {
            // Initiate sign out
            await signOut({ redirect: false });

            
            push('/userLogin');
        } catch (error) {
            setIsSearchModal(false);
            // Handle the error as needed
        }
    };

    useEffect(() => {
        if (!session) {
            push("/userLogin");
        }
    }, [session, push]);

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-slate-400 after:absolute after:top-0 after:left-0 opacity-50 grid place-content-center">
            <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
                <div className="w-full h-full grid place-content-center">
                    <div className="font-normal relative z-50 w-[450px] h-[300px] bg-slate-50 border-2 p-1 rounded-3xl">
                        <div className="text-2xl font-bold text-center mb-3 my-5">ÇIKIŞ YAPMAK İSTEDİĞİNİZE</div>
                        <div className="text-2xl font-bold text-center mb-5">EMİN MİSİNİZ?</div>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-green-500 transition-colors duration-200 mb-5"
                            type='button'
                            onClick={handleSignOut}
                        >
                            EVET
                        </button>
                        <button
                            type="button"
                            className="bg-gray-500 text-white py-2 px-4 rounded-md w-full mt-2 hover:bg-red-600 transition-colors duration-200"
                            onClick={() => setIsSearchModal(false)}
                        >
                            HAYIR
                        </button>
                        <button
                            className="absolute top-7 right-4"
                            onClick={() => setIsSearchModal(false)}
                        >
                            <RiCloseCircleFill size={20} className="hover:text-red-600 text-neutral-500 transition-all" />
                        </button>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export async function getServerSideProps({ req, params }) {
    const user = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
    );
  
    return {
      props: {
        user: user ? user.data : null,
      },
    };
  }

export default Out;
