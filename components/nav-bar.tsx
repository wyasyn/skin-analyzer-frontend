import { Sign } from "crypto";
import UserButton from "./user-button";
import SignInButton from "./signin";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const image = user?.image || "/placeholder-user.jpg";
  return (
    <header className="sticky top-0 z-50 bg-background/75 backdrop-blur-sm w-full ">
      <nav className="flex items-center justify-between gap-3 py-4 wrapper">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>
        <section className="flex items-center gap-3">
          {!session?.user ? (
            <SignInButton />
          ) : (
            <UserButton
              email={user?.email || "Unknown Email"}
              name={user?.name || "Unknown Name"}
              image={image}
            />
          )}
        </section>
      </nav>
    </header>
  );
}
