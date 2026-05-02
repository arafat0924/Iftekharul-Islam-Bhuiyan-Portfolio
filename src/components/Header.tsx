import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, BookOpen, Gavel, Briefcase, Scale, Users, Image as ImageIcon, Mail, Home as HomeIcon, Landmark, Trophy } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setAchievementsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <HomeIcon className="w-4 h-4" /> },
    { name: 'Education', path: '/education', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'References', path: '/references', icon: <Users className="w-4 h-4" /> },
    { name: 'Gallery', path: '/gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const achievementLinks = [
    { name: 'Academic', path: '/achievements/academic', icon: <Gavel className="w-4 h-4" /> },
    { name: 'Professional', path: '/achievements/professional', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'Field Work', path: '/achievements/fieldwork', icon: <Landmark className="w-4 h-4" /> },
    { name: 'Extra Curricular', path: '/achievements/extracurricular', icon: <Scale className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isAchievementActive = location.pathname.startsWith('/achievements');

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#0B1221]/80 backdrop-blur-xl border-b border-slate-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),_0_4px_10px_rgba(99,102,241,0.4)] group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_8px_20px_rgba(99,102,241,0.6)] transition-all duration-300 group-hover:scale-105">
              IB
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors hidden sm:block">
              Iftekharul
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#1E293B]/50 backdrop-blur-md border border-slate-700/50 p-1.5 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  isActive(link.path)
                    ? "bg-indigo-500/20 text-indigo-300 shadow-inner border border-indigo-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {/* Achievements Dropdown */}
            <div className="relative group">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={achievementsOpen}
                onClick={() => setAchievementsOpen(!achievementsOpen)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
                  isAchievementActive
                    ? "bg-indigo-500/20 text-indigo-300 shadow-inner border border-indigo-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                )}
              >
                <Trophy className="w-4 h-4" />
                Achievements
                <ChevronDown className={cn(
                  "w-3 h-3 transition-transform duration-200 group-hover:rotate-180",
                  achievementsOpen && "rotate-180"
                )} />
              </button>

              <div
                role="menu"
                className={cn(
                  "absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left scale-95 group-hover:scale-100",
                  achievementsOpen && "opacity-100 visible scale-100"
                )}
              >
                <div className="bg-[#0F172A]/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5),_inset_0_1px_1px_rgba(255,255,255,0.1)] border border-slate-700/50 p-2 flex flex-col gap-1">
                  {achievementLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      role="menuitem"
                      onClick={() => setAchievementsOpen(false)}
                      className={cn(
                        "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-3",
                        isActive(link.path)
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      )}
                    >
                      <div className={cn(
                        "p-1.5 rounded-lg",
                        isActive(link.path) ? "bg-indigo-500/20" : "bg-slate-800"
                      )}>
                        {link.icon}
                      </div>
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2",
                  isActive(link.path)
                    ? "bg-indigo-500/20 text-indigo-300 shadow-inner border border-indigo-500/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors border border-slate-700/50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden overflow-hidden border-t border-slate-800/50 bg-[#0B1221]/95 backdrop-blur-xl">
          <div className="px-4 py-6 flex flex-col gap-2">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center gap-3",
                  isActive(link.path)
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {/* Mobile Achievements Dropdown */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setAchievementsOpen(!achievementsOpen)}
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between",
                  isAchievementActive || achievementsOpen
                    ? "bg-slate-800/50 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4" />
                  Achievements
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  achievementsOpen ? "rotate-180" : ""
                )} />
              </button>

              {achievementsOpen && (
                <div className="flex flex-col gap-1 pl-4 border-l-2 border-slate-800 ml-6 mt-1 overflow-hidden">
                  {achievementLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-3",
                        isActive(link.path)
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center gap-3",
                  isActive(link.path)
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
