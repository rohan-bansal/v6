import { motion } from "framer-motion";
import { useRef } from "react";

const FadeIn = ({ children, fadeIn }) => {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeIn ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 10 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
