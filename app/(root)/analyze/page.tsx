import { auth } from "@/auth";
import ModalAnalyzer from "@/components/modal-analyzer";
import NotAuthenticatedPage from "@/components/un-authenticated";

export default async function page() {
  const session = await auth();
  if (!session) return <NotAuthenticatedPage />;
  return (
    <div className="pt-14 md:pt-24 pb-12">
      <ModalAnalyzer />
    </div>
  );
}
