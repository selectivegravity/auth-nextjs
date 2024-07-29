
"use client";  //decorator

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SIGNUPPAGE(){
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });

    const [loading, setLoading] = React.useState(false);

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user]);

    

    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success", response.data);
            router.push("/login");
        }
        catch(error:any){
            console.log("Sign Up Failed", error.message);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }


    return (<>
    <div className="flex flex-col items-center justif-center min-h-screen py-2">
        <h1 className="py-8">Sign Up</h1>
        <label htmlFor="username"> Username </label>
        <input className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="username" type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} placeholder="Username"/>

        <label htmlFor="password"> Password </label>
        <input className="p-2 border text-gray-900 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="password" type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password"/>

        <label htmlFor="email"> Email </label>
        <input className="p-2 border text-gray-900 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="email" type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="email"/>

        <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"> {buttonDisabled? "Enter required details":"Register"}</button>

        <Link href="/login"> Visit Login Page </Link>

    </div>
    </>);
}