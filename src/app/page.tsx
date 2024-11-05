import { Footer } from "@/components/website/landingPage/Footer";
import { Galeria } from "@/components/website/landingPage/Galeria";
import { Hero } from "@/components/website/landingPage/Hero";
import { NavbarHome } from "@/components/website/landingPage/NavbarHome";
import { Productos } from "@/components/website/landingPage/Productos";
import { Servicios } from "@/components/website/landingPage/Servicios";
import { auth } from "../../auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-dvh flex-grow flex-col dark:bg-[#1B1C1E]">
      <NavbarHome profilePicture={session?.user?.image || ""} />
      <Hero />
      <Servicios />
      <Productos />
      <Galeria />
      <Footer />
    </main>
  );
}
