import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
export default async function Home() {
  let session = await getServerSession(options);
  // console.log(session)
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p> {session ? `User logged in ${session.user?.email}` : "Log in to get full access"}</p>
      <div>
        <Link href="/dashboard">
          <button className="rounded-md bg-blue-400 p-2 m-4 ">
            Dashboard
          </button>
        </Link>
        <Link href="/signup">
          <button className="rounded-md bg-blue-400 p-2 m-4">
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}
