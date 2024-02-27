import NextAuth from "next-auth/next";
import { options } from "./options";
let handler = NextAuth(options);
export { handler as GET, handler as POST };
