import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, 
  ArrowRight,
  Gamepad2,
  Wind,
  Trophy
} from 'lucide-react';

// --- Data ---

interface HotelPhrase {
  spanish: string;
  armenian: string;
}

const HOTEL_PHRASES: HotelPhrase[] = [
  { spanish: "Tengo una reserva a nombre de...", armenian: "Ես ամրագրում ունեմ ... անունով" },
  { spanish: "¿Cuál es la clave del Wi-Fi?", armenian: "Ո՞րն է Wi-Fi-ի գաղտնաբառը:" },
  { spanish: "¿Está incluido el desayuno?", armenian: "Նախաճաշը ներառվա՞ծ է:" },
  { spanish: "¿A qué hora se sirve el desayuno?", armenian: "Ժամը քանիսի՞ն է մատուցվում նախաճաշը:" },
  { spanish: "Necesito toallas limpias, por favor.", armenian: "Խնդրում եմ, ինձ մաքուր սրբիչներ են պետք:" },
  { spanish: "La llave no funciona.", armenian: "Բանալին չի աշխատում:" },
  { spanish: "¿Hay servicio de habitaciones?", armenian: "Սենյակների սպասարկում կա՞:" },
  { spanish: "Quisiera despertar a las siete.", armenian: "Կցանկանայի արթնանալ ժամը յոթին:" },
  { spanish: "¿Dónde está el ascensor?", armenian: "Որտե՞ղ է վերելակը:" },
  { spanish: "Quiero hacer el checkout.", armenian: "Ուզում եմ դուրս գրվել (checkout):" },
  { spanish: "¿Puedո dejar mi equipaje aquí?", armenian: "Կարո՞ղ եմ թողնել ուղեբեռս այստեռ:" },
  { spanish: "¿Me puede llamar a un taxi?", armenian: "Կարո՞ղ եք ինձ համար տաքսի կանչել:" },
  { spanish: "La habitación está muy ruidosa.", armenian: "Սենյակում շատ աղմկոտ է:" },
  { spanish: "¿Hay una farmacia cerca?", armenian: "Մոտակայքում դեղատուն կա՞:" }
];

export default function App() {
  const [gameState, setGameState] = useState<'menu' | 'hotel_dict' | 'hotel_game'>('menu');
  
  // Hotel Game State
  const [hotelIdx, setHotelIdx] = useState(0);
  const [hotelScore, setHotelScore] = useState(0);
  const [hotelFeedback, setHotelFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [hotelOptions, setHotelOptions] = useState<string[]>([]);

  const startHotelGame = () => {
    const firstIdx = Math.floor(Math.random() * HOTEL_PHRASES.length);
    setHotelIdx(firstIdx);
    setHotelScore(0);
    generateOptions(firstIdx);
    setGameState('hotel_game');
  };

  const generateOptions = (correctIdx: number) => {
    const correct = HOTEL_PHRASES[correctIdx].armenian;
    const others = HOTEL_PHRASES
      .filter((_, i) => i !== correctIdx)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map(p => p.armenian);
    setHotelOptions([correct, ...others].sort(() => 0.5 - Math.random()));
  };

  const handleHotelAnswer = (ans: string) => {
    if (hotelFeedback) return;
    if (ans === HOTEL_PHRASES[hotelIdx].armenian) {
      setHotelScore(s => s + 1);
      setHotelFeedback('correct');
    } else {
      setHotelFeedback('wrong');
    }
    setTimeout(() => {
      const next = Math.floor(Math.random() * HOTEL_PHRASES.length);
      setHotelIdx(next);
      generateOptions(next);
      setHotelFeedback(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0ea5e9] bg-gradient-to-b from-[#0ea5e9] to-[#1e3a8a] flex flex-col font-sans text-white overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/20 blur-[150px] rounded-full -z-10" />

      {/* Header */}
      <header className="p-6 max-w-2xl mx-auto w-full z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter text-white">Spanish Master</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 z-10 overflow-hidden">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {gameState === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-12 border border-white/20 shadow-2xl text-center">
                  <h2 className="text-4xl font-black text-white mb-8">Իսպաներենի Ուսուցում</h2>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={() => setGameState('hotel_dict')}
                      className="w-full py-6 bg-purple-500 hover:bg-purple-400 text-white rounded-3xl font-black text-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4"
                    >
                      Հյուրանոցի Բառարան
                      <Wind className="w-8 h-8" />
                    </button>

                    <button
                      onClick={startHotelGame}
                      className="w-full py-6 bg-emerald-500 hover:bg-emerald-400 text-white rounded-3xl font-black text-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4"
                    >
                      Խաղ (Հյուրանոց)
                      <Gamepad2 className="w-8 h-8" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === 'hotel_dict' && (
              <motion.div
                key="hotel_dict"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full max-w-2xl"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 border border-white/20 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-black text-white">Հյուրանոցի Բառարան</h2>
                    <button onClick={() => setGameState('menu')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <RotateCcw className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {HOTEL_PHRASES.map((phrase, i) => (
                      <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col gap-1">
                        <span className="text-xl font-black text-yellow-400">{phrase.spanish}</span>
                        <span className="text-sm font-bold text-blue-100">{phrase.armenian}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {gameState === 'hotel_game' && (
              <motion.div
                key="hotel_game"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-lg mx-auto"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-10 border border-white/20 shadow-2xl">
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-300">Միավոր: {hotelScore}</span>
                    <button onClick={() => setGameState('menu')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <RotateCcw className="w-5 h-5 opacity-60" />
                    </button>
                  </div>

                  <div className="text-center mb-10">
                    <span className="text-xs font-black uppercase tracking-widest text-blue-200 block mb-2">Ինչպե՞ս կլինի հայերեն</span>
                    <h3 className="text-3xl font-black text-yellow-400 leading-tight">
                      {HOTEL_PHRASES[hotelIdx].spanish}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {hotelOptions.map((option, i) => (
                      <button
                        key={i}
                        disabled={!!hotelFeedback}
                        onClick={() => handleHotelAnswer(option)}
                        className={`py-5 px-6 rounded-2xl font-bold text-left transition-all ${
                          hotelFeedback && option === HOTEL_PHRASES[hotelIdx].armenian
                            ? 'bg-emerald-500 text-white'
                            : hotelFeedback && option !== HOTEL_PHRASES[hotelIdx].armenian
                            ? 'bg-red-500/20 text-white/40'
                            : 'bg-white text-blue-900 hover:bg-blue-50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-white/40 text-[10px] font-bold uppercase tracking-widest">
        Spanish Pronunciation Master • 2026
      </footer>
    </div>
  );
}
