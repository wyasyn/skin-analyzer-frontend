import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center justify-center">
        <img src="/logo.png" alt="logo loading" className="opacity-75" />
        <Loader2 size={32} className="animate-spin text-muted-foreground " />
      </div>
    </div>
  );
}
