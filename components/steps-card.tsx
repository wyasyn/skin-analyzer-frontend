import { Label } from "@/components/ui/label";

export default function StepsCard({
  image,
  step,
  description,
}: {
  image: string;
  step: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 max-w-[250px]">
      <div>
        <img src={image} alt="step 1" />
      </div>
      <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
        <div className="grid grow gap-2">
          <Label className="capitalize ">{step}</Label>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      </div>
    </div>
  );
}
