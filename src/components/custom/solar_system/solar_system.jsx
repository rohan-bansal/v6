import { useEffect, useRef } from "react";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  useSpring,
} from "framer-motion";
import Sun from "../../../assets/sun.svg";
import Venus from "../../../assets/venus.svg";
import Earth from "../../../assets/earth.svg";
import Saturn from "../../../assets/saturn.svg";
import Moon from "../../../assets/moon.svg";
import OrbitPath from "../../../assets/orbit.svg";

const SolarSystemAnimation = () => {
  const sunSpring = useSpring(0, { stiffness: 500, damping: 30 });
  const venusSpring = useSpring(0, { stiffness: 500, damping: 30 });
  const earthSpring = useSpring(0, { stiffness: 500, damping: 30 });
  const moonSpring = useSpring(0, { stiffness: 500, damping: 30 });
  const saturnSpring = useSpring(0, { stiffness: 500, damping: 30 });

  const backgroundColor = "#090909";

  const sunRef = useRef(null);

  const venusRef = useRef(null);
  const venusRefOrbit = useRef(null);
  const venusDistance = 200;

  const earthRef = useRef(null);
  const earthRefOrbit = useRef(null);
  const earthDistance = 400;

  const moonRef = useRef(null);
  const moonRefOrbit = useRef(null);
  const moonDistance = 100;

  const saturnRef = useRef(null);
  const saturnRefOrbit = useRef(null);
  const saturnDistance = 600;

  const { scrollY } = useScroll();

  const open = useRef(false);

  useEffect(() => {
    const unsubscribeSunSpring = sunSpring.on("change", (value) => {
      sunRef.current.style.transform = `scale(${value})`;

      if (value > 0.6 && open.current) {
        venusSpring.set(1);
      }
      if (value < 0.4 && !open.current) {
        console.log("here");
        venusSpring.set(0);
      }
    });

    const unsubscribeVenusSpring = venusSpring.on("change", (value) => {
      venusRef.current.style.transform = `scale(${value}) translateX(${venusDistance}px)`;
      venusRefOrbit.current.style.transform = `scale(${value})`;

      if (value > 0.6 && open.current) {
        earthSpring.set(1);
        venusRef.current.className = "venus-rotate";
      }
      if (value < 0.4 && !open.current) {
        earthSpring.set(0);
        venusRef.current.className = "";
      }
    });

    const unsubscribeEarthSpring = earthSpring.on("change", (value) => {
      earthRef.current.style.transform = `scale(${value}) translateX(${earthDistance}px)`;
      earthRefOrbit.current.style.transform = `scale(${value})`;

      if (value > 0.6 && open.current) {
        moonSpring.set(1);
        saturnSpring.set(1);
        earthRef.current.className = "earth-rotate";
      }
      if (value < 0.4 && !open.current) {
        moonSpring.set(0);
        saturnSpring.set(0);
        earthRef.current.className = "";
      }
    });

    const unsubscribeMoonSpring = moonSpring.on("change", (value) => {
      moonRef.current.style.transform = `scale(${value}) translateX(${moonDistance}px)`;
      // moonRefOrbit.current.style.transform = `scale(${value})`;

      if (value > 0.6 && open.current) {
        moonRef.current.className = "moon-rotate";
      }
      if (value < 0.4 && !open.current) {
        moonRef.current.className = "";
      }
    });

    const unsubscribeSaturnSpring = saturnSpring.on("change", (value) => {
      saturnRef.current.style.transform = `scale(${value}) translateX(${saturnDistance}px)`;
      saturnRefOrbit.current.style.transform = `scale(${value})`;

      if (value > 0.6 && open.current) {
        saturnRef.current.className = "saturn-rotate";
      }
      if (value < 0.4 && !open.current) {
        saturnRef.current.className = "";
      }
    });

    return () => {
      unsubscribeSunSpring();
      unsubscribeVenusSpring();
      unsubscribeEarthSpring();
      unsubscribeMoonSpring();
      unsubscribeSaturnSpring();
    };
  }, []);

  const showHide = () => {
    if (scrollY.get() > window.innerHeight / 2) {
      open.current = true;
      sunSpring.set(1);
    } else {
      open.current = false;
      sunSpring.set(0);
    }
  };

  useEffect(() => {
    showHide();
  }, []);

  useEffect(() => {
    const unsubScroll = scrollY.on("change", showHide);

    return () => {
      unsubScroll();
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
        <motion.div initial={{ scale: 0 }} ref={sunRef}>
          <img className="sun-rotate" src={Sun} alt="Sun" />
        </motion.div>
        <motion.div
          ref={venusRefOrbit}
          initial={{ scale: 0 }}
          style={{ position: "absolute", zIndex: 10 }}
        >
          <img
            src={OrbitPath}
            className="venus-orbit-rotate"
            alt="VenusOrbitPath"
          />
        </motion.div>
        <motion.div
          ref={earthRefOrbit}
          initial={{ scale: 0 }}
          style={{ position: "absolute", zIndex: 10 }}
        >
          <img
            src={OrbitPath}
            className="earth-orbit-rotate"
            alt="earthOrbitPath"
          />
        </motion.div>
        <motion.div
          ref={saturnRefOrbit}
          initial={{ scale: 0 }}
          style={{ position: "absolute", zIndex: 10 }}
        >
          <img
            src={OrbitPath}
            className="saturn-orbit-rotate"
            alt="saturnOrbitPath"
          />
        </motion.div>
        <motion.div
          ref={venusRef}
          initial={{ scale: 0 }}
          style={{ position: "absolute", zIndex: 200 }}
        >
          <div
            className={`fit-content rounded-full bg-[${backgroundColor}] p-3`}
          >
            <img src={Venus} alt="Venus" className="venus-image-cancel" />
          </div>
        </motion.div>
        <motion.div
          ref={earthRef}
          initial={{ scale: 0 }}
          style={{ position: "absolute", zIndex: 200 }}
        >
          <div
            className={`fit-content rounded-full bg-[${backgroundColor}] p-3`}
          >
            <img src={Earth} alt="Earth" className="earth-image-cancel" />
          </div>
          {/* <motion.div
            ref={moonRefOrbit}
            initial={{ scale: 0 }}
            style={{
              position: "absolute",
              zIndex: 20,
              top: "-30%",
              left: "-30%",
              aspectRatio: "1/1",
              minHeight: "15vh",
            }}
          >
            <img
              src={OrbitPath}
              className="moon-orbit-rotate"
              alt="moonOrbitPath"
            />
          </motion.div> */}
          <motion.div
            ref={moonRef}
            initial={{ scale: 0 }}
            style={{
              position: "absolute",
              zIndex: 300,
              top: "20%",
              left: "20%",
            }}
          >
            <div
              className={`fit-content rounded-full bg-[${backgroundColor}] p-1`}
            >
              <img src={Moon} alt="Moon" className="moon-image-cancel" />
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          ref={saturnRef}
          initial={{ scale: 0 }}
          style={{ position: "absolute", zIndex: 200 }}
        >
          <div
            className={`fit-content rounded-full bg-[${backgroundColor}] p-3`}
          >
            <img src={Saturn} alt="Saturn" className="saturn-image-cancel" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SolarSystemAnimation;
