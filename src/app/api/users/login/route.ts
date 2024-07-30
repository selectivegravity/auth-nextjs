import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
    try {
        // Ensure database connection
        await connect();
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log("reqBody", reqBody);

        //check if user exist
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return NextResponse.json({error:" User does not exists"},{status:400});
        }

        const validatePassword = await bcryptjs.compare(password, existingUser.password);

        if(!validatePassword){
            return NextResponse.json({error: "Invalid Password"}, {status: 400});
        }

        // create token data
        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1d"});

        const response = NextResponse.json({message: "Login Successful", success: true},);

        response.cookies.set("token", token, {httpOnly: true});

        return response;

    } catch (error: any) {
        console.error("Error in POST /api/users/signup: ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
