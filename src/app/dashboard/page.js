import DashboardLayout from '@/components/dashboardlayout/page'
import React from 'react'
import ProtectedRoute from '@/components/protectedroute.js'

export default function Dashboard(){
    return(
      <>   
<ProtectedRoute role="admin">
      <DashboardLayout />               
            <div className="flex items-center flex-wrap gap-6">              
                <h3 className="text-lg font-semibold text-white">Welcome back, Laxmi</h3>        
            </div> 
            </ProtectedRoute>     
    </>
    )
}