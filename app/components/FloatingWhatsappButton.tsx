"use client";

import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_LINK, handleWhatsAppClick } from "../lib/constants";
import { motion } from "framer-motion";

export default function FloatingWhatsappButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleWhatsAppClick(WHATSAPP_LINK, e);
  };

  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.05 }}
      className="fixed right-4 bottom-4 z-50 flex items-center gap-3 group"
      aria-label="Simulação Gratuita pelo WhatsApp"
    >
      {/* Text Label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        whileHover={{ x: -5 }}
        className="hidden sm:flex items-center bg-gradient-to-r from-white to-green-50 text-green-700 px-5 py-3 rounded-full shadow-2xl font-extrabold text-sm whitespace-nowrap border-2 border-green-500/30 group-hover:border-green-500 group-hover:shadow-green-500/30 transition-all duration-300 relative overflow-hidden"
      >
        {/* Animated background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-100/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <motion.span 
          className="mr-2 text-lg relative z-10"
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          🎁
        </motion.span>
        <span className="relative z-10">Simulação Gratuita</span>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.div
        className="relative bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white rounded-full shadow-2xl flex items-center justify-center w-16 h-16 md:w-18 md:h-18 transition-all duration-300 group-hover:shadow-green-500/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ 
          boxShadow: "0 8px 32px 0 rgba(34, 197, 94, 0.4), 0 0 0 4px rgba(34, 197, 94, 0.1)" 
        }}
      >
        {/* Pulse animation ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-400"
          animate={{
            scale: [1, 1.3, 1.3],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-white/20 blur-sm" />
        
        <FaWhatsapp className="text-3xl md:text-4xl relative z-10 drop-shadow-lg" />
      </motion.div>
    </motion.a>
  );
}
