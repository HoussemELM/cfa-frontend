import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingActionButton = () => {
  const buttonVariants = {
    initial: { y: 0 },
    animate: {
      y: [-4, 4, -4],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    }
  };

  // Subtle rotation for the question mark
  const iconVariants = {
    animate: {
      rotate: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={buttonVariants}
    >
      <Link
      to={"/apropos"}
        className="bg-primary hover:text-white text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        aria-label="Help"
      >
        <motion.div variants={iconVariants}>
          <HelpCircle className="w-6 h-6" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default FloatingActionButton;