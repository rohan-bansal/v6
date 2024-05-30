import { DecoderText } from "../components/custom/decoder/decoder";
import BoxReveal from "../components/magicui/box-reveal";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity";
import FadeIn from "../components/custom/fadeIn/fade_in";
import RetroGrid from "../components/magicui/retro-grid";
import { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import SolarSystemAnimation from "../components/custom/solar_system/solar_system";

function App() {
  const [nameDecodeStartTrigger, setNameDecodeStartTrigger] = useState(false);
  const [velscrollFadeTrigger, setVelscrollFadeTrigger] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <main className="grow z-10 bg-[#090909]">
        <RetroGrid />
        <div className="flex flex-col items-center mt-96 ml-4">
          <BoxReveal
            boxColor={"#F389C3"}
            setDecoderStart={setNameDecodeStartTrigger}
            duration={1}
          >
            <h1 className="font-space text-white z-20 text-4xl tracking-[0.5em]">
              <DecoderText
                text="ROHAN BANSAL"
                delay={0}
                trigger={nameDecodeStartTrigger}
                onComplete={() => setVelscrollFadeTrigger(true)}
              />
            </h1>
          </BoxReveal>
        </div>
        <div className="mx-auto mt-10">
          <FadeIn fadeIn={velscrollFadeTrigger}>
            <div className={`${styles.velscroll} flex`}>
              <VelocityScroll
                text="ideator tinkerer rapid unscheduled disassembler yellow jacket robotics nerd space fanatic silicon sorcerer"
                default_velocity={1}
                className="font-space text-center text-m tracking-[-0.02em] text-white"
              />
            </div>
          </FadeIn>
        </div>
      </main>
    </div>
  );
}

export default App;
