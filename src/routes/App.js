import { DecoderText } from "../components/custom/decoder/decoder";
import BoxReveal from "../components/magicui/box-reveal";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity";
import RetroGrid from "../components/magicui/retro-grid";
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";

function App() {
  const [nameDecodeStartTrigger, setNameDecodeStartTrigger] = useState(false);
  const [velscrollFadeTrigger, setVelscrollFadeTrigger] = useState(false);

  const parallax = useRef(null);
  return (
    <div className="flex flex-col h-screen">
      <main className="grow z-10 bg-[#090808]">
        {/* <div className="bg-primary grow content-div"></div> */}
        <Parallax ref={parallax} pages={3}>
          <ParallaxLayer offset={0} speed={1} className="bg-primary">
            <RetroGrid />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1}
            speed={1}
            style={{ backgroundColor: "#87BCDE" }}
          />
          <ParallaxLayer
            offset={0}
            speed={-0.3}
            style={{ pointerEvents: "none" }}
            className="flex flex-col items-center mt-72 ml-4"
          >
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
          </ParallaxLayer>
          <ParallaxLayer
            offset={0}
            speed={-0.2}
            // style={{ pointerEvents: "none" }}
            className="mx-auto mt-96"
          >
            <div className={`${styles.velscroll} flex`}>
              <VelocityScroll
                text="ideator tinkerer rapid unscheduled disassembler yellow jacket robotics nerd space fanatic silicon sorcerer"
                default_velocity={1}
                className="font-space text-center text-m tracking-[-0.02em] text-white"
              />
            </div>
          </ParallaxLayer>
        </Parallax>

        {/* <div className="flex justify-center items-center mt-72 mb-12 ml-4">
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
        <div className={`${styles.velscroll} flex`}>
          <VelocityScroll
            text="ideator tinkerer rapid unscheduled disassembler yellow jacket robotics nerd space fanatic silicon sorcerer"
            default_velocity={1}
            className="font-space text-center text-m tracking-[-0.02em] text-white"
          />
        </div>
        <div className="bg-primary grow content-div"></div> */}
      </main>
    </div>
  );
}

export default App;
