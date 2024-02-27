import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_Secret as string,
    
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "username: ",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "password: ",
          type: "text",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        let user = {
          id: "1",
          name:"John",
          email: "user@gmail.com",
          password: "password",
        };
         // await bcrypt.compare(credentials.password, user.password)
         console.log(credentials)
        if (
          credentials?.username === user.email &&
          credentials?.password === user.password
        ) {
          console.log(user)
          return user;
        } else {
          console.log("Invalid")
          return null;
        }
      },
    }),
  ],
  //You can also modify these 
    // pages: {
    //   signIn: "/signup",
    //    signOut: "/signout",
    //   error: "/not-found",
    // },
//   jwt: {
//     encode() {
//       return "anc";
//     },
//     decode() {
//       return { msg: "abhijeet" };
//     },
//   },

};
