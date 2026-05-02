import { Mail, MapPin, Phone, Facebook, Linkedin, X, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolioContent } from '../lib/content';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { content } = usePortfolioContent();
  const email = content.contact.details.find((detail) => detail.type === "email");
  const phone = content.contact.details.find((detail) => detail.type === "phone");
  const address = content.contact.details.find((detail) => detail.type === "address");

  return (
    <footer className="bg-[#0B1221] border-t border-slate-800/50 pt-16 pb-8 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Intro */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                IB
              </div>
              <span className="font-outfit font-bold text-xl tracking-tight text-white">
                Iftekharul Islam Bhuiyan
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6 font-light">
              Bachelor of Law (LLB Hons) graduate from North South University, passionate about human rights, policy making, and legal advocacy.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.facebook.com/Prottyashah.Bhuiyan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/30 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="sr-only">Facebook</span>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/md-iftekharul-islam-bhuiyan-49391a270/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/30 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:iftekharul.bhuiyan@northsouth.edu" className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/30 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="sr-only">Email</span>
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://x.com/Iftekharbhuiya8" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/30 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="sr-only">X</span>
                <X className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/unemployed_by_law" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 hover:border-indigo-500/30 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/education" className="text-slate-400 hover:text-indigo-400 transition-colors">Education</Link></li>
              <li><Link to="/achievements/academic" className="text-slate-400 hover:text-indigo-400 transition-colors">Achievements</Link></li>
              <li><Link to="/references" className="text-slate-400 hover:text-indigo-400 transition-colors">References</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <a href={email?.href || `mailto:${email?.value ?? ""}`} className="hover:text-indigo-400 transition-colors break-all">
                  {email?.value ?? "iftekharul.bhuiyan@northsouth.edu"}
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <Phone className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{phone?.value ?? "+8801633297340"}</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{address?.value ?? "Bashundhara R/A. Dhaka"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {currentYear} MD.IFTEKHARUL ISLAM BHUIYAN. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
