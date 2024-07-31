import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try{
        const token = request.cookies.get('token')?.value || "";
        const decodedToken:any = Jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    }
    catch(err:any){
        console.log(err.message)
    }
}