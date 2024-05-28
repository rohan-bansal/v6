import { DecoderText } from "../components/custom/decoder/decoder";
import BoxReveal from "../components/magicui/box-reveal";
import { VelocityScroll } from "../components/magicui/scroll-based-velocity";
import { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [nameDecodeStartTrigger, setNameDecodeStartTrigger] = useState(false);
  const [velscrollFadeTrigger, setVelscrollFadeTrigger] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <main className="grow bg-primary z-10">
        <div className="flex justify-center items-center mt-72 mb-12 ml-4">
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
        <div className={styles.velscroll}>
          <VelocityScroll
            text="ideator tinkerer rapid unscheduled disassembler yellow jacket robotics nerd space fanatic silicon sorcerer"
            default_velocity={1}
            className="font-space text-center text-m tracking-[-0.02em] text-white"
          />
        </div>
        <div className="h-screen"></div>
      </main>
    </div>
  );
}

export default App;
