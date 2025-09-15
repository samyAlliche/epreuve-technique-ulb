import { Button } from "@/components/shadcn-ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto py-10 flex flex-col gap-5 items-center rounded-3xl bg-primary text-background px-10 shadow-md sm:max-w-2/3">
      <div className="flex text-4xl font-black items-end gap-3">
        <span className="text-6xl">404</span>not found
      </div>
      <p className="font-extrabold">La page n&apos;a pas été trouvée</p>
      <Button variant={"ghost"} asChild>
        <Link href="/" className="flex items-center">
          <ChevronLeft />
          Retourner à l&apos;accueil
        </Link>
      </Button>
    </div>
  );
}
