import SkinAnalyzer from "@/components/skin-analyzer"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Skin Condition Analyzer</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Upload a photo or take a picture of your skin to receive personalized product recommendations. For accurate
        results, ensure that skin makes up at least 10% of the image. Images will be automatically compressed if larger
        than 700KB.
      </p>
      <div className="max-w-3xl mx-auto">
        <SkinAnalyzer />
      </div>
    </main>
  )
}

