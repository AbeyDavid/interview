import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AdminHomePage() {
  const [users,setUsers] = useState([])
    useEffect(()=>{
      async function fetchData(){
        const response = await axios.get("http://localhost:4000/getData")
        setUsers(response.data)
      }
      fetchData()
    },[])
    return (
        <div>
            <h3> AdminHomePage</h3>
            <div>
              {users.map((data,index)=>{
                return(
                  <div >
                    <table>
                      <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>role</th>
                      </tr>
                      <tr>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.role}</td>
                      </tr>
                    </table>
                  </div>
                )
              })}
            </div>
        </div>
    );
}
