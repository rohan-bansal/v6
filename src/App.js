import "./App.css";
import { DecoderText } from "./decoder";
import BoxReveal from "./components/magicui/box-reveal";
import { VelocityScroll } from "./components/magicui/scroll-based-velocity";
import { useEffect, useState } from "react";
import styles from "./App.module.css";

function App() {
  const [startTrigger, setStartTrigger] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsHydrated(true);
    }, 500);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <main className="grow bg-primary z-10">
        {/* <Meteors number={10} /> */}
        {/* {isHydrated && ( */}
        <div className="flex justify-center items-center mt-36 mb-12 ml-4">
          <BoxReveal
            boxColor={"#F389C3"}
            setDecoderStart={setStartTrigger}
            duration={1}
          >
            <h1 className="font-space text-white z-20 text-4xl tracking-[0.5em]">
              <DecoderText
                text="ROHAN BANSAL"
                delay={0}
                startDecoding={startTrigger}
              />
            </h1>
          </BoxReveal>
        </div>
        {/* )} */}
        <div className={styles.velscroll}>
          <VelocityScroll
            text="building breaking rapid unscheduled disassembling"
            default_velocity={5}
            className="font-space text-center text-m tracking-[-0.02em] text-white"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
