"use client";

import { Palette } from "lucide-react";
import { AnimatedIconProps } from '@/types/icons';
import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react'

export function PaletteIcon({ className = "", size = 28, isAnimate = false }: AnimatedIconProps) {
    const controls = useAnimation();

    useEffect(() => {
        if (isAnimate) {
            controls.start('animate');
        } else {
            controls.start('normal');
        }
    }, [isAnimate, controls]);

    return (
        <div className={`${className} flex items-center justify-center`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={controls}
                variants={{
                    normal: { opacity: 0, scale: 0.8, rotate: -15 },
                    animate: {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        transition: {
                            duration: 0.6,
                            ease: "easeOut"
                        },
                    },
                }}
            >
                <Palette size={size} />
            </motion.div>
        </div>
    );
}
