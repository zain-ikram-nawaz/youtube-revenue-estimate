import { connectDB } from "../../../lib/db";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB();
        // console.log("hello")

        const { email, password } = await req.json();


        const user = await User.findOne({ email });

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        // console.log(token)


        const res = NextResponse.json({
            message: "Login successful",
            user: { name: user.name, email: user.email, role: user.role },
        });

        res.cookies.set("ycresttoken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return res;
    } catch (error) {
        return NextResponse.json({ message: "Server error", error }, { status: 500 });
    }
}
