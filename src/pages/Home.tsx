import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, GraduationCap, Trophy, Briefcase, Activity, ChevronRight, Star, Search, Scale, Gavel, Landmark, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout;

    const startTyping = () => {
      setIsTyping(true);
      typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 80);
    };

    const timeout = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeout);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [text, delay]);

  return (
    <span className="relative inline-block">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className={`inline-block w-[0.25em] h-[0.25em] rounded-full bg-white ml-1 align-baseline ${!isTyping && displayedText.length === text.length ? 'opacity-50' : ''}`}
      />
    </span>
  );
};

export default function Home() {
  const flashcards = [
    {
      question: "Educational Background",
      answer: "LLB Hons at North South University & HSC from Brahmanbaria Govt College.",
      icon: <BookOpen className="w-10 h-10" />,
      link: "/education",
    },
    {
      question: "Academic Achievements",
      answer: "Moot Court Champion, Best Researcher, and Olympiad Finalist.",
      icon: <Gavel className="w-10 h-10" />,
      link: "/achievements/academic",
    },
    {
      question: "Professional Experience",
      answer: "NCTF President, Youth Mentor, and Event Organizer.",
      icon: <Briefcase className="w-10 h-10" />,
      link: "/achievements/professional",
    },
    {
      question: "Field Work Experience",
      answer: "Focus Group Discussions and direct engagement initiatives.",
      icon: <Landmark className="w-10 h-10" />,
      link: "/achievements/fieldwork",
    },
    {
      question: "Extra Curricular",
      answer: "District Champion in 100m sprint and Long Jump.",
      icon: <Scale className="w-10 h-10" />,
      link: "/achievements/extracurricular",
    }
  ];

  return (
    <div className="flex flex-col gap-20 pb-12">
      {/* Hero Section */}
      <section className="relative pt-10 lg:pt-20 lg:pb-10">
        {/* Background Image for Hero Page */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[100vw] h-[120%] z-[-1] pointer-events-none opacity-40">
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-screen"
            style={{ backgroundImage: "url('/background.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060B19]/50 to-[#060B19]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A572]/10 text-[#C5A572] text-sm font-medium mb-6 border border-[#C5A572]/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-md">
              <Scale className="w-4 h-4" />
              <span>Law Graduate & Youth Advocate</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1] text-left title-effect">
              Hi, I'm <br />
              <span className="text-white block mt-2">
                <TypewriterText text="MD Iftekharul Islam Bhuiyan" delay={500} />
              </span>
            </h1>

            <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed font-light">
              A passionate Bachelor of Law (LLB Hons) graduate from North South University with a strong commitment to human rights, policy making, and legal advocacy. Experienced in youth mentorship, moot court competitions, and child rights promotion.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-indigo-500/50 text-base font-medium rounded-xl text-white bg-gradient-to-b from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),_0_10px_20px_rgba(99,102,241,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_15px_30px_rgba(99,102,241,0.6)] hover:-translate-y-1"
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </Link>
              <Link
                to="/achievements/professional"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-700 text-base font-medium rounded-xl text-slate-200 bg-[#1E293B]/80 backdrop-blur-md hover:bg-[#1E293B] hover:border-slate-500 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_10px_20px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_15px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
              >
                View Experience
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center relative perspective-1000"
          >
            {/* Decorative elements behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5),_inset_0_0_0_4px_rgba(255,255,255,0.1)] z-10 transform transition-transform duration-700 hover:rotate-y-12 hover:rotate-x-12">
              <img
                src="owner.jpg"
                alt="MD.IFTEKHARUL ISLAM BHUIYAN"
                className="w-full h-full object-cover"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = "https://picsum.photos/seed/lawyer/800/800";
                }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-10 -left-4 sm:left-0 bg-[#0F172A]/90 backdrop-blur-xl p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] border border-slate-700/50 flex items-center gap-3 z-20"
            >
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shadow-inner border border-amber-500/20">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="pr-2">
                <p className="text-xs text-slate-400 font-medium">Moot Court</p>
                <p className="text-sm font-bold text-white">Champion</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-10 -right-4 sm:right-0 bg-[#0F172A]/90 backdrop-blur-xl p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] border border-slate-700/50 flex items-center gap-3 z-20"
            >
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shadow-inner border border-emerald-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="pr-2">
                <p className="text-xs text-slate-400 font-medium">NCTF</p>
                <p className="text-sm font-bold text-white">President</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute -bottom-6 right-4 sm:right-10 bg-[#0F172A]/90 backdrop-blur-xl p-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] border border-slate-700/50 flex items-center gap-3 z-20"
            >
              <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl shadow-inner border border-indigo-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="pr-2">
                <p className="text-xs text-slate-400 font-medium">Department of Law</p>
                <p className="text-sm font-bold text-white">TA</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Digital Flashcards Section */}
      <section className="relative pt-16 pb-20 px-6 sm:px-10 mt-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-500/20 to-purple-500/20 animate-gradient-xy opacity-100"></div>
        <div className="absolute inset-0 bg-[#060B19]/60 backdrop-blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-4 title-effect">Explore My Journey</h2>
            <p className="text-indigo-200/80 font-light max-w-2xl mx-auto text-lg">Select a flashcard below to discover more about my academic and professional experiences.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {flashcards.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className={index === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
              >
                <Link
                  to={item.link}
                  className="block h-full bg-white/[0.03] backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(99,102,241,0.2)] hover:bg-white/[0.06] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] group relative overflow-hidden"
                >
                  {/* Top Circular Frame */}
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-purple-400 rounded-full p-[2px] mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <div className="w-full h-full bg-[#0B1221] rounded-full flex items-center justify-center text-white group-hover:text-indigo-300 transition-colors">
                      {item.icon}
                    </div>
                  </div>

                  {/* Question / Title */}
                  <h3 className="text-2xl font-outfit font-bold text-center text-white mb-4 group-hover:text-indigo-300 transition-colors">
                    {item.question}
                  </h3>

                  {/* Divider */}
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6 group-hover:w-24 transition-all duration-500"></div>

                  {/* Answer / Description */}
                  <p className="text-slate-300 text-center leading-relaxed font-light">
                    {item.answer}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
