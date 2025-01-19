"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";

export function ParallaxImplemented() {
  return <HeroParallax products={exampleWork} />;
}

const ROOT_DIR = "/images/example-work/";

const exampleWork = [
    {
        title: 'Trek the NEK',
        link: '',
        thumbnail: `${ROOT_DIR}trek-the-nek.webp`,
    },
    {
        title: 'Civic Engagement Non-Profit',
        link: '',
        thumbnail: `${ROOT_DIR}voting.webp`,
    },
    {
        title: 'Sage & Scribe Literary Agency',
        link: '',
        thumbnail: `${ROOT_DIR}sage.webp`,
    },
    {
        title: 'Moho Access',
        link: '',
        thumbnail: `${ROOT_DIR}moho.webp`,
    },// END OF FIRST ROW
    {
        title: 'ESN Votes',
        link: '',
        thumbnail: `${ROOT_DIR}esn-votes.webp`,
    },
    {
        title: 'Les Frères Chaussettes',
        link: '',
        thumbnail: `${ROOT_DIR}chaussettes.webp`,
    },
    {
        title: 'Green Hills Public Affairs',
        link: '',
        thumbnail: `${ROOT_DIR}greenhills.webp`,
    },
    {
        title: 'MiLeMed',
        link: '',
        thumbnail: `${ROOT_DIR}milemed.webp`,
    },
];