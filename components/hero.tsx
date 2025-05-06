import Call2Action from "./call2action";
import CtaBtns from "./cta-btns";

export default function HeroSection() {
  const list = [
    "Comprehensive Skin Analysis",
    "Personalized Product Recommendations",
    "Comprehensive Dermatological Insights",
  ];
  return (
    <div className=" bg-[url('/hero-bg.jpg')] md:bg-[url('/hero-bg-2.jpg')] bg-no-repeat bg-cover bg-center md:min-h-[700px] pt-14 md:pt-24">
      <div className="wrapper  ">
        <div className="py-12 md:py-16 lg:py-24">
          <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold max-w-[15ch]  ">
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
      </div>
    </div>
  );
}
