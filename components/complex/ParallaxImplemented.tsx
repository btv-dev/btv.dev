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
        thumbnail: `${ROOT_DIR}trek-the-nek.png`,
    },
    {
        title: 'Civic Engagement Non-Profit',
        link: '',
        thumbnail: `${ROOT_DIR}voting.png`,
    },
    {
        title: 'Sage & Scribe Literary Agency',
        link: '',
        thumbnail: `${ROOT_DIR}sage.png`,
    },
    {
        title: 'Moho Access',
        link: '',
        thumbnail: `${ROOT_DIR}moho.png`,
    },// END OF FIRST ROW
    {
        title: 'ESN Votes',
        link: '',
        thumbnail: `${ROOT_DIR}esn-votes.png`,
    },
    {
        title: 'Les Frères Chaussettes',
        link: '',
        thumbnail: `${ROOT_DIR}chaussettes.png`,
    },
    {
        title: 'Green Hills Public Affairs',
        link: '',
        thumbnail: `${ROOT_DIR}greenhills.png`,
    },
    {
        title: 'MiLeMed',
        link: '',
        thumbnail: `${ROOT_DIR}milemed.png`,
    },
];