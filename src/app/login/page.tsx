
"use client";  //decorator

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LOGINPAGE(){

    const router = useRouter();

    const [loading, setLoading] = React.useState(false);

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user]);

    const onLogin = async () => {
        try{
            setLoading(true);

            const response = await axios.post("/api/users/login", user);
            console.log("Login Successful", response);
            router.push("/profile");
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
        <h1 className="py-8">{loading? "Processing": "Log In"}</h1>

        <label htmlFor="email"> Email </label>
        <input className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="email" type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="email"/>

        <label htmlFor="password"> Password </label>
        <input className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" id="password" type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="password"/>

        <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"> {buttonDisabled? "Enter Details": "Login"} </button>

        <Link href="/signup"> Register User </Link>

    </div>
    </>);
}