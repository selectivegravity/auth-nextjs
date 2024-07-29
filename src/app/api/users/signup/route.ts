import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

export async function POST(request: NextRequest) {
    try {
        // Ensure database connection
        await connect();

        // Parse request body
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log("Request Body: ", reqBody);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save new user to the database
        const savedUser = await newUser.save();
        console.log("Saved User: ", savedUser);

        // Return success response
        return NextResponse.json({ message: "User created successfully", success: true, savedUser });
    } catch (error: any) {
        console.error("Error in POST /api/users/signup: ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
