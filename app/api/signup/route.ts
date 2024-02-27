import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let emailSchema = z.string().email();
let passwordSchema = z.string().min(5);
export async function POST(req: NextRequest, res: NextResponse) {
  // console.log(req.body)
  let result = await req.json();
  console.log(result)
  let { username, password } = result.body;
  let validatedCredentials = {
    username: emailSchema.safeParse(username),
    password: passwordSchema.safeParse(password),
  };
  if (
    validatedCredentials.username.success &&
    validatedCredentials.password.success
  ) {
    console.log(validatedCredentials);
    let token = jwt.sign({ username, password }, "jwtsecret");
    req.cookies.set(token);
    // store the data in user database
    let hashedPW = bcrypt.hash(password, 10) //store hashed pw in db then compare with bcrypt.compare()
   
    return NextResponse.json({ msg: "user created successfully", token });
  } else {
    return NextResponse.json({ msg: "Invalid email or password" });
  }
}
