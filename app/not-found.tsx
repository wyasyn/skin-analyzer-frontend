import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import notFoundImage from "@/assets/404.webp";

export default function NotFound() {
  return (
    <main className="grid place-items-center p-12 text-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <Image
          src={notFoundImage.src}
          width={notFoundImage.width}
          height={notFoundImage.height}
          alt="404 image"
          placeholder="blur"
          blurDataURL={notFoundImage.blurDataURL}
        />
        <h2 className="text-3xl md:text-5xl font-medium">
          Whoopps! Lost in Space?
        </h2>
        <p className="text-sm max-w-prose my-5">
          The page you're looking for isn't found We suggest you go back home
        </p>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
