import UserButton from "./user-button";
import SignInButton from "./signin";
import Link from "next/link";
import { auth } from "@/auth";
import { AnalyzeLink } from "./get-started";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import Logo from "./logo";
import Insta from "@/assets/instagram.svg";
import LinkedIn from "@/assets/linkedin.svg";
import SocialIcon from "./social-icon";

const socialData = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/auroraorganics4u/",
    icon: Insta,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/auroraorganics",
    icon: LinkedIn,
  },
];

export default async function Navbar() {
  const session = await auth();
  const user = session?.user;
  const image = user?.image || "/placeholder-user.jpg";
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm w-full ">
      <nav className="flex max-sm:py-2 items-center justify-between gap-3 wrapper">
        <Logo />
        <section className="flex items-center gap-3">
          <div className="hidden md:flex items-center text-sm text-muted-foreground mr-4">
            <Link href="/browse/acne">
              <Button
                variant={"link"}
                className="text-sm text-muted-foreground "
              >
                Browse Products
              </Button>
            </Link>
            <AnalyzeLink />
          </div>
          {!session?.user ? (
            <SignInButton />
          ) : (
            <UserButton
              email={user?.email || "Unknown Email"}
              name={user?.name || "Unknown Name"}
              image={image}
            />
          )}
          <ModeToggle />
          <div className="flex items-center gap-2">
            {socialData.map((social) => (
              <SocialIcon
                key={social.name}
                link={social.link}
                icon={social.icon}
              />
            ))}
          </div>
        </section>
      </nav>
    </header>
  );
}
