import { useState } from "react";
import Logo from "../ui/Logo";
import { GrUserSettings } from "react-icons/gr";
import { ImExit } from "react-icons/im";
import { Out } from "../ui/Out";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import Link from "next/link";

export const UpperArea = ({ currentUser }) => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  return (
    <div className="h-[5.5rem] bg-secondary">
      <div className="container text-white mx-auto flex justify-between items-center h-full">
        <Link href={`/userHome/${currentUser?._id}`}>
          <Logo />
        </Link>
        <nav className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-full sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden ${
          isMenuModal === true && "!grid place-content-center"
        }`}>
          <ul className="flex gap-x-2 sm:flex-row flex-col items-center">
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <Link href={`/userPage1/${currentUser?._id}`}>Bana Özel</Link>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <Link href={`/userPage2/${currentUser?._id}`} >Aidat Durumu</Link>
            </li>
            <li className="px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer">
              <Link href={`/userPage3/${currentUser?._id}`}>Borç Durumu</Link>
            </li>
          </ul>
          {isMenuModal && (
            <button
              className="absolute top-4 right-4 z-50"
              onClick={() => setIsMenuModal(false)}
            >
              <GiCancel size={25} className="transition-all" />
            </button>
          )}
        </nav>

        <div className="flex gap-x-4 items-center">
          <Link href={`/usersettings/${currentUser?._id}`}>
            <GrUserSettings size={28} className="hover:text-primary cursor-pointer" />
          </Link>

          <button onClick={() => setIsSearchModal(true)}>
            <ImExit size={28} className="hover:text-primary transition-all" />
          </button>

          <button className="sm:hidden inline-block" onClick={() => setIsMenuModal(true)}>
            <GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
          </button>
        </div>
      </div>
      {isSearchModal && <Out setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};
export default UpperArea;
