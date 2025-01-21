import fs from "fs";
import path from "path";
import sharp from 'sharp';
import { HeroHighlightImplemented } from "../components/complex/HeroHighlight";
import { ParallaxImplemented } from "@/components/complex/ParallaxImplemented";
import { WorkAndFeatures } from "../components/sections/WorkAndFeatures";
import OurApproach from "../components/sections/OurApproach";
import { TheyTrustUs } from "../components/sections/TheyTrustUs";
import { SupportingNonProfits } from "../components/sections/SupportingNonProfits";
import { TheTeam } from "../components/sections/TheTeam";
import { LetsTalk } from "../components/sections/LetsTalk";
import { Logo } from "../components/complex/LogoCarousel";

export default async function Home() {
  // Read client images from the filesystem
  const clientsDir = path.join(process.cwd(), "public", "images", "clients");
  const files = fs.readdirSync(clientsDir);

  // Filter for image files (jpg, png, gif, webp, svg)
  const imageFiles = files.filter((file) =>
    /\.(jpe?g|png|gif|webp|svg)$/i.test(file)
  );

  // Create Logo objects
  const logos: Logo[] = await Promise.all(imageFiles.map(async (file, i) => {
    const src = `/images/clients/${file}`;
    const imagePath = path.join(clientsDir, file);
    
    // Get actual image dimensions using sharp
    const metadata = await sharp(imagePath).metadata();
    
    return {
      id: i,
      name: file,
      img: src,
      width: metadata.width || 0,
      height: metadata.height || 0,
    };
  }));
  return (
    <div className="min-h-screen bg-white leading-loose">
      <HeroHighlightImplemented />

      <main>
        <OurApproach />
        <ParallaxImplemented />
        <WorkAndFeatures />
        <TheyTrustUs logos={logos} />
        <SupportingNonProfits />
        <TheTeam />
        <LetsTalk />
      </main>
    </div>
  );
}
