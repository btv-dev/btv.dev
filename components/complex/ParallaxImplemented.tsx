"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";
import trekTheNek from "@/public/images/example-work/trek-the-nek.webp";
import voting from "@/public/images/example-work/voting.webp";
import sage from "@/public/images/example-work/sage.webp";
import moho from "@/public/images/example-work/moho.webp";
import esnVotes from "@/public/images/example-work/esn-votes.webp";
import chaussettes from "@/public/images/example-work/chaussettes.webp";
import greenhills from "@/public/images/example-work/greenhills.webp";
import milemed from "@/public/images/example-work/milemed.webp";

export function ParallaxImplemented() {
  return <HeroParallax products={exampleWork} />;
}

const exampleWork = [
    {
        title: 'Trek the NEK',
        link: '',
        thumbnail: trekTheNek,
    },
    {
        title: 'Civic Engagement Non-Profit',
        link: '',
        thumbnail: voting,
    },
    {
        title: 'Sage & Scribe Literary Agency',
        link: '',
        thumbnail: sage,
    },
    {
        title: 'Moho Access',
        link: '',
        thumbnail: moho,
    },// END OF FIRST ROW
    {
        title: 'ESN Votes',
        link: '',
        thumbnail: esnVotes,
    },
    {
        title: 'Les Frères Chaussettes',
        link: '',
        thumbnail: chaussettes,
    },
    {
        title: 'Green Hills Public Affairs',
        link: '',
        thumbnail: greenhills,
    },
    {
        title: 'University of Bonn — MiLeMed',
        link: '',
        thumbnail: milemed,
    },
];