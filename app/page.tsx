import { HeroHighlightImplemented } from "../components/complex/HeroHighlight";
import { ParallaxImplemented } from "@/components/complex/ParallaxImplemented";
import { WorkAndFeatures } from "../components/sections/WorkAndFeatures";
import OurApproach from "../components/sections/OurApproach";
import { TheyTrustUs } from "../components/sections/TheyTrustUs";
import { SupportingNonProfits } from "../components/sections/SupportingNonProfits";
import { TheTeam } from "../components/sections/TheTeam";
import { LetsTalk } from "../components/sections/LetsTalk";

export default function Home() {

  return (
    <div className="min-h-screen bg-white leading-loose">
      <HeroHighlightImplemented />

      <main>
        <OurApproach />
        <ParallaxImplemented />
        <WorkAndFeatures />
        <TheyTrustUs />
        <SupportingNonProfits />
        <TheTeam />
        <LetsTalk />
      </main>
    </div>
  );
}
