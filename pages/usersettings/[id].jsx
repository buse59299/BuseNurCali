import UpperArea from "../../components/layout/userUpperArea";
import ChangeInformation from "../../components/layout/userSettings";
import NewPassword from "../../components/layout/newPassword";
import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { getSession } from "next-auth/react";
import Loading from "@/components/ui/Loading";

export const Index = () => {
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
      <UpperArea currentUser={currentUser}/>
      <div className="container mx-auto py-12">
        <div className="flex justify-between flex-wrap-reverse gap-10">
          <div className="lg:flex-1">
            <ChangeInformation currentUser={currentUser}/>
          </div>
          <div className="lg:flex-1">
            <NewPassword currentUser={currentUser}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
