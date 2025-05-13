import Image from "next/image";
import CtaBtns from "./cta-btns";
import heroImg from "@/assets/hero.webp";
import { HeroWrapper } from "./mesh";

export default function HeroSection() {
  const list = [
    "Comprehensive Skin Analysis",
    "Personalized Product Recommendations",
    "Comprehensive Dermatological Insights",
  ];
  return (
    <HeroWrapper>
      <section className=" pt-14 md:pt-24">
        <div className="wrapper grid gap-4 md:grid-cols-2  ">
          <div className="py-8 md:py-14">
            <h1 className=" text-3xl md:text-4xl lg:text-5xl max-w-[15ch]  ">
              Revolutionize your skincare with AI precision
            </h1>
            <ul className="flex flex-col gap-2 my-8 md:gap-4 md:my-12">
              {list.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1.293-11.293a1 1 0 00-1.414 0L7.293 9.293a1 1 0 001.414 1.414L10 9.414l2.293 2.293a1 1 0 001.414-1.414l-3-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <CtaBtns />
          </div>
          <div>
            <Image
              src={heroImg.src}
              width={heroImg.width}
              height={heroImg.height}
              alt="hero"
              className="rounded-2xl object-contain"
              placeholder="blur"
              blurDataURL={heroImg.blurDataURL}
              priority
            />
          </div>
        </div>
      </section>
    </HeroWrapper>
  );
}
