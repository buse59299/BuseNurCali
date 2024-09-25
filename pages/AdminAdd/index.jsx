import React from 'react'
import UpperArea from '@/components/layout/adminUpperArea'
import AdminAdd from "../../components/layout/AdminAdd";


const AdminEkle = () => {
  return (
    <div>
      <UpperArea/>
      <div className="container mx-auto">
            <div className="w-1/2 mt-10">
                <AdminAdd/>
            </div>
        </div>
    </div>
  )
}

export default AdminEkle