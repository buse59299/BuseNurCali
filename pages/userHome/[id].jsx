import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UpperArea from "../../components/layout/userUpperArea";
import MainPage from "../../components/layout/mainPage";
import { getSession } from "next-auth/react";
import Loading from "@/components/ui/Loading";

const MainComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const session = await getSession();
        if (session) {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
          const user = res.data?.find((user) => user.email === session.user.email);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Error fetching currentUser:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <UpperArea currentUser={currentUser} />
      <MainPage />
    </div>
  );
};

export default MainComponent;
