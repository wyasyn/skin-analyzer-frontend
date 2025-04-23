import GetStarted from "@/components/get-started";
import VideoHero from "@/components/video";

export default function HomePage() {
  return (
    <section className="wrapper">
      <div className="flex flex-col gap-4 text-center justify-center pt-12 lg:pt-24 ">
        <h1 className="text-5xl font-bold lg:text-6xl">
          Discover What Your Skin Really Needs
        </h1>
        <p className="max-w-[55ch] mx-auto text-muted-foreground">
          Aurora Skin Analyzer uses AI to detect skin conditions in seconds and
          gives you instant, personalized skincare insights—right from your
          device.
        </p>
        <GetStarted />
      </div>
      <div className="flex flex-col gap-4 text-center justify-center bg-[url(/hero.jpg)] aspect-square md:aspect-video rounded-2xl my-14 relative bg-cover bg-center bg-no-repeat">
        <VideoHero />
      </div>
    </section>
  );
}
