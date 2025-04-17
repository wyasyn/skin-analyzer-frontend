import SkinAnalyzer from "@/components/skin-analyzer";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Skin Analyzer</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Make sure the affected area is clearly visible and fills a good part of
        the image. Large images will be compressed automatically.
      </p>
      <div className="max-w-3xl mx-auto">
        <SkinAnalyzer />
      </div>
    </main>
  );
}
