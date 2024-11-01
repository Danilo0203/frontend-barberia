import { Hero } from "@/components/website/landingPage/Hero";
import { NavbarHome } from "@/components/website/landingPage/NavbarHome";
import { Servicios } from "@/components/website/landingPage/Servicios";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-grow flex-col dark:bg-[#1B1C1E]">
      <NavbarHome />
      <Hero />
      <Servicios />
    </main>
  );
}
