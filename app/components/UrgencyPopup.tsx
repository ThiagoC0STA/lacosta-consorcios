"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaFire, FaClock, FaGift, FaCheckCircle } from "react-icons/fa";

export default function UrgencyPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12,
    vacancies: 8,
  });

  useEffect(() => {
    // Mostrar popup após 10 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds, vacancies } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            }
          }
        }

        // Diminuir vagas aleatoriamente
        if (Math.random() < 0.1 && vacancies > 1) {
          vacancies--;
        }

        return { hours, minutes, seconds, vacancies };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSimulate = () => {
    // Scroll para a simulação
    const element = document.getElementById('simulacao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background decorativo */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50" />
          
          {/* Botão fechar */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <FaTimes size={20} />
          </button>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-red-100 px-4 py-2 rounded-full mb-4">
                <FaFire className="text-red-600 animate-pulse" />
                <span className="text-red-700 font-bold text-sm">OFERTA ESPECIAL</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ⏰ OFERTA ESPECIAL LIMITADA!
              </h2>
              
              <p className="text-gray-600">
                Consultoria gratuita + análise personalizada para as primeiras 50 simulações
              </p>
            </div>

            {/* Contador */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 rounded-xl text-white mb-6">
              <p className="text-center font-semibold mb-3">⏰ Termina em:</p>
              <div className="grid grid-cols-4 gap-2">
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg p-2">
                    <div className="text-lg font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                    <div className="text-xs">Horas</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg p-2">
                    <div className="text-lg font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                    <div className="text-xs">Min</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg p-2">
                    <div className="text-lg font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                    <div className="text-xs">Seg</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg p-2">
                    <div className="text-lg font-bold">{timeLeft.vacancies}</div>
                    <div className="text-xs">Vagas</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefícios */}
            <div className="space-y-3 mb-6 text-black">
              <div className="flex items-center gap-3">
                <FaGift className="text-green-600" />
                <span className="text-sm">Consultoria gratuita + análise personalizada</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600" />
                <span className="text-sm">Economia média de R$ 45.000</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-green-600" />
                <span className="text-sm">Contemplação em média 8.2 meses</span>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <button
                onClick={handleSimulate}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-6 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              >
                🚀 SIMULAR AGORA - É GRÁTIS!
              </button>
              
              <p className="text-xs text-gray-500 text-center">
                ⚠️ Oferta válida apenas para as primeiras {timeLeft.vacancies} simulações
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 