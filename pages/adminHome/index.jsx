import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UpperArea from "../../components/layout/adminUpperArea";
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
          const res = await axios.get('${process.env.NEXT_PUBLIC_API_URL}/adminGiris');
          const user = res.data?.find((user) => user.email === session.user.email);
          if (user) {
            setCurrentUser(user);
          }
        } 
      } catch (error) {
        console.error('Error fetching currentUser:', error);
        // Redirect to login if there is an error
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <UpperArea currentUser={currentUser} />
      <MainPage currentUser={currentUser} />
    </div>
  );
};

export default MainComponent;