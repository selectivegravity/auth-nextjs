"use client";

import axios from "axios";
import Link from "next/link";
// import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout =  async() => {
        try{
            await axios.get("/api/users/logout");
            toast.success("Logout Successfully");
            router.push('/login');
        }
        catch(err:any){
            console.log(err.message);
            toast.error(err.message);
        }
    };

    const details = async () => {
        try{
            const res = await axios.get('/api/users/me');
            console.log(res.data.data);
            setData(res.data.data._id);

        }
        catch(err:any){
            console.log(err.message);
        }
    }

    return (<>
    <div className="flex flex-col item-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <br/>
        <p>Profile Page</p>
        <h2 className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">{data === 'nothing'? 'Nothing':<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={details}> Get User Details </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={logout}> Log out </button>
    </div>
    </>)
}