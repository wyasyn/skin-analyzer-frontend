import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default function SocialIcon({
  link,
  icon,
}: {
  link: string;
  icon: string;
}) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <Button size={"icon"} variant="ghost">
        <Image
          src={icon}
          alt="Social Icon"
          width={24}
          height={24}
          className="h-6 w-6 md:h-8 md:w-8 group-hover:scale-110 transition-transform duration-200 ease-in-out"
        />
      </Button>
    </Link>
  );
}
