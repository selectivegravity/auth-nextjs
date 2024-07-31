import { NextResponse,NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest){
    try{
        connect();
        const userID = await getDataFromToken(request);
        console.log(userID);
        const user = await User.findOne({_id: userID}).select("-password");
        console.log(user);
        return NextResponse.json({message: "User Found", data: user});
    }
    catch(err:any){
        console.log(err.message);
        return NextResponse.json({error: err.message},{status:400})
    }
}

