"use client";

import React from "react";
import { motion, useAnimation, useInView, cubicBezier } from "framer-motion";
import { useEffect, useRef } from "react";

interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%" | string;
  boxColor?: string;
  duration?: number;
  setDecoderStart?: (start: boolean) => void;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor,
  duration,
  setDecoderStart,
}: BoxRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    async function animateSlide() {
      await slideControls.start("opening_end_closing_start");
      mainControls.start("visible");
      setDecoderStart && setDecoderStart(true);
      await slideControls.start("closing_end");
    }
    if (isInView) {
      animateSlide();
    } else {
      slideControls.start("opening_start");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        overflow: "hidden",
      }}
    >
      <motion.div
        variants={{
          hidden: { filter: "blur(10px)", opacity: 0 },
          visible: { filter: "blur(0px)", opacity: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration ? duration / 2 : 0.5, delay: 0 }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          opening_start: { left: 0, right: "100%" }, // hidden div
          opening_end_closing_start: { left: 0, right: 0 }, // full div visible
          closing_end: { left: "100%", right: 0 }, // hidden div
        }}
        initial="opening_start"
        animate={slideControls}
        transition={{
          duration: duration ? duration : 1.5,
          ease: cubicBezier(0.4, 0, 0.2, 1),
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: 4,
          paddingBottom: 4,
          zIndex: 20,
          background: boxColor ? boxColor : "#5046e6",
        }}
      />
    </div>
  );
};

export default BoxReveal;
