import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { Process } from "@/components/sections/process";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { Statement } from "@/components/sections/statement";
import { WhyNextGiant } from "@/components/sections/why-nextgiant";

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <SelectedWork />
      <Services />
      <WhyNextGiant />
      <Process />
      <Statement />
      <Contact />
      <Footer />
    </main>
  );
}
