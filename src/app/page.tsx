import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { WhyNextGiant } from "@/components/sections/why-nextgiant";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <SelectedWork />
      <WhyNextGiant />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
