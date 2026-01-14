'use client'

import {useState, useEffect} from 'react'
import DashboardLayout from '@/components/dashboardlayout/page'

export default function allUsers(){
    const [users, setUsers] = useState([])
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userslist`, {method:'GET'})
        .then(res => res.json())
        .then(data => {
            setUsers(data.data)
        }, [])
        
    })

    
    return(
    <>
            <DashboardLayout />
            <table className="m-20" style={{ marginLeft: "370px" }}>
                
                <thead>
                <tr>
                    <th className="p-4">SR NO</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>                    
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (                            
                    <tr key={user._id}>   
              
              
              <td>
              </td>
              <td><h3 className="font-semibold p-4">{(count) + (1)}</h3></td>
             <td> <p className="text-sm text-gray-500 p-4">{user.name}</p></td>
             <td> <p className="font-bold p-4">{user.email}</p></td>
             <td className="p-4 cursor-pointer">{user.role}</td>
             
            </tr>
          ))}
          </tbody>
        </table>
        </>
)

} 


