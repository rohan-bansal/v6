import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import Sun from "../../../assets/sun.svg";
import Venus from "../../../assets/venus.svg";
import Earth from "../../../assets/earth.svg";
import Saturn from "../../../assets/saturn.svg";
import Moon from "../../../assets/moon.svg";
import OrbitPath from "../../../assets/orbit.svg";

const SolarSystemAnimation = () => {
  const backgroundColor = "#090909";

  const sunRef = useRef(null);

  const venusRef = useRef(null);
  const venusRefOrbit = useRef(null);
  const venusRotationSpeed = 3;
  const venusDistance = 200;

  const earthRef = useRef(null);
  const earthRefOrbit = useRef(null);
  const earthRotationSpeed = 2;
  const earthDistance = 400;

  const moonRef = useRef(null);
  const moonRefOrbit = useRef(null);
  const moonRotationSpeed = 5;
  const moonDistance = 100;

  const saturnRef = useRef(null);
  const saturnRefOrbit = useRef(null);
  const saturnRotationSpeed = 1;
  const saturnDistance = 600;

  const baseRotation = 1650;

  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 5000], [0, 360]);

  const updateRotation = () => {
    const rotation = yRange.get() + baseRotation;

    if (yRange.get() < 40) {
      sunRef.current.style.transform = `scale(${yRange.get() / 40}) rotate(${
        rotation * 0.2
      }deg)`;
    } else {
      sunRef.current.style.transform = `rotate(${rotation * 0.2}deg)`;
    }

    if (yRange.get() < 60) {
      venusRefOrbit.current.style.transform = `scale(${
        yRange.get() / 60
      }) rotate(${rotation * venusRotationSpeed}deg)`;
      venusRef.current.style.transform = `scale(${yRange.get() / 60}) rotate(${
        rotation * venusRotationSpeed
      }deg) translateX(${venusDistance}px) rotate(-${
        rotation * venusRotationSpeed
      }deg)`;
    } else {
      venusRefOrbit.current.style.transform = `rotate(${
        rotation * venusRotationSpeed
      }deg)`;
      venusRef.current.style.transform = `rotate(${
        rotation * venusRotationSpeed
      }deg) translateX(${venusDistance}px) rotate(-${
        rotation * venusRotationSpeed
      }deg)`;
    }

    if (yRange.get() < 80) {
      earthRefOrbit.current.style.transform = `scale(${
        yRange.get() / 80
      }) rotate(${rotation * earthRotationSpeed}deg)`;
      earthRef.current.style.transform = `scale(${yRange.get() / 80}) rotate(${
        rotation * earthRotationSpeed
      }deg) translateX(${earthDistance}px) rotate(-${
        rotation * earthRotationSpeed
      }deg)`;
    } else {
      earthRefOrbit.current.style.transform = `rotate(${
        rotation * earthRotationSpeed
      }deg)`;
      earthRef.current.style.transform = `rotate(${
        rotation * earthRotationSpeed
      }deg) translateX(${earthDistance}px) rotate(-${
        rotation * earthRotationSpeed
      }deg)`;
    }

    if (yRange.get() < 80) {
      moonRefOrbit.current.style.transform = `scale(${
        yRange.get() / 80
      }) rotate(${rotation * moonRotationSpeed}deg)`;
      moonRef.current.style.transform = `scale(${yRange.get() / 80}) rotate(${
        rotation * moonRotationSpeed
      }deg) translateX(${moonDistance}px) rotate(-${
        rotation * moonRotationSpeed
      }deg)`;
    } else {
      moonRefOrbit.current.style.transform = `rotate(${
        rotation * moonRotationSpeed
      }deg)`;
      moonRef.current.style.transform = `rotate(${
        rotation * moonRotationSpeed
      }deg) translateX(${moonDistance}px) rotate(-${
        rotation * moonRotationSpeed
      }deg)`;
    }

    if (yRange.get() < 100) {
      saturnRefOrbit.current.style.transform = `scale(${
        yRange.get() / 100
      }) rotate(${rotation * saturnRotationSpeed}deg)`;
      saturnRef.current.style.transform = `scale(${
        yRange.get() / 100
      }) rotate(${
        rotation * saturnRotationSpeed
      }deg) translateX(${saturnDistance}px) rotate(-${
        rotation * saturnRotationSpeed
      }deg)`;
    } else {
      saturnRefOrbit.current.style.transform = `rotate(${
        rotation * saturnRotationSpeed
      }deg)`;
      saturnRef.current.style.transform = `rotate(${
        rotation * saturnRotationSpeed
      }deg) translateX(${saturnDistance}px) rotate(-${
        rotation * saturnRotationSpeed
      }deg)`;
    }
  };

  useEffect(() => {
    updateRotation();
  });

  useEffect(() => {
    const unsubscribeY = yRange.on("change", updateRotation);

    return () => {
      unsubscribeY();
    };
  }, [yRange]);

  return (
    <div className="overflow-hidden">
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
        <motion.div ref={sunRef}>
          <img src={Sun} alt="Sun" />
        </motion.div>
        <motion.div
          ref={venusRefOrbit}
          style={{ position: "absolute", zIndex: 10 }}
        >
          <img
            src={OrbitPath}
            alt="VenusOrbitPath"
            style={{
              minHeight: `${venusDistance * 2}px`,
              minWidth: `${venusDistance * 2}px`,
            }}
          />
        </motion.div>
        <motion.div
          ref={earthRefOrbit}
          style={{ position: "absolute", zIndex: 10 }}
        >
          <img
            src={OrbitPath}
            alt="earthOrbitPath"
            style={{
              minHeight: `${earthDistance * 2}px`,
              minWidth: `${earthDistance * 2}px`,
            }}
          />
        </motion.div>
        <motion.div
          ref={saturnRefOrbit}
          style={{ position: "absolute", zIndex: 10 }}
        >
          <img
            src={OrbitPath}
            alt="saturnOrbitPath"
            style={{
              minHeight: `${saturnDistance * 2}px`,
              minWidth: `${saturnDistance * 2}px`,
            }}
          />
        </motion.div>
        <motion.div
          ref={venusRef}
          style={{ position: "absolute", zIndex: 200 }}
        >
          <div
            className={`fit-content rounded-full bg-[${backgroundColor}] p-3`}
          >
            <img src={Venus} alt="Venus" />
          </div>
        </motion.div>
        <motion.div
          ref={earthRef}
          style={{ position: "absolute", zIndex: 200 }}
        >
          <div
            className={`fit-content rounded-full bg-[${backgroundColor}] p-3`}
          >
            <img src={Earth} alt="Earth" />
          </div>
          <motion.div
            ref={moonRefOrbit}
            style={{
              position: "absolute",
              zIndex: 20,
              top: "-35%",
              left: "-40%",
            }}
          >
            <img
              src={OrbitPath}
              alt="moonOrbitPath"
              style={{
                minHeight: `${moonDistance * 2}px`,
                minWidth: `${moonDistance * 2}px`,
              }}
            />
          </motion.div>
          <motion.div
            ref={moonRef}
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
              <img src={Moon} alt="Moon" />
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          ref={saturnRef}
          style={{ position: "absolute", zIndex: 200 }}
        >
          <div
            className={`fit-content rounded-full bg-[${backgroundColor}] p-3`}
          >
            <img src={Saturn} alt="Saturn" />
          </div>
        </motion.div>
      </div>
      {new Array(5).fill(null).map((_, index) => (
        <div className="w-screen h-screen" key={index} />
      ))}
    </div>
  );
};

export default SolarSystemAnimation;
