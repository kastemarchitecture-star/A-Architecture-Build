import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Award,
  Building2,
  Wrench,
  Palette,
  Hammer,
  CheckCircle2,
  ChevronRight,
  Star,
  Clock,
  Shield,
  Target,
  Eye,
  Heart,
  Diamond,
  Crown,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

// Custom hook for scroll-triggered animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Parallax hook
function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
}

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

// Section wrapper with scroll animation
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const heroParallax = useParallax(0.3);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sections = ['about', 'services', 'portfolio', 'process', 'testimonials', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white overflow-x-hidden">
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}>
        <div className="bg-[#111111]/80 backdrop-blur-sm border-b border-white/5 py-3 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
            <span className="font-light text-gray-400 tracking-wide">
              Standardization of Luxury — Membawa Standar Eksklusif Jawa & Bali ke Kalimantan Timur
            </span>
            <a
              href="https://wa.me/6282147777570?text=Halo%20Adityarch%20Studio,%20saya%20ingin%20berkonsultasi%20mengenai%20proyek%20hunian%20atau%20komersial%20premium."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors duration-300"
            >
              <Phone size={14} />
              <span className="tracking-wider">+62 821 4777 7570</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'top-0 bg-[#111111]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-lg'
            : 'top-12 md:top-8 bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-4 group">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500 ${
              isScrolled ? 'bg-white border-white' : 'bg-transparent border-white/20'
            }`}>
              <span className={`font-bold text-xl ${isScrolled ? 'text-black' : 'text-white'}`}>A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold tracking-tight text-white">ADITYARCH</span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-amber-500">Studio & Build</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                  activeSection === item.id ? 'text-amber-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://wa.me/6282147777570"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs px-6 py-3 rounded-sm transition-colors"
            >
              Free Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${heroParallax}px)` }}
        >
          <img
            src="/images/foto1.jpg"
            alt="Luxury Modern Classic Mansion"
            className="w-full h-[120%] object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]/40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
          <div className="max-w-3xl">
            <span className="text-amber-400 text-xs tracking-[0.25em] uppercase font-semibold block mb-4">
              Designing Timeless Luxury, Building Your Legacy
            </span>

            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
              Hunian Bukan Sekadar<br />
              <span className="text-amber-500 font-normal">Tempat Tinggal.</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 font-light mb-6">
              Ini Adalah Warisan yang Mencerminkan Pencapaian Anda.
            </p>

            <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed font-light mb-8">
              ADITYARCH STUDIO & BUILD menghadirkan layanan Arsitektur, Konstruksi, Interior, dan Custom Furniture dalam satu sistem terintegrasi. Berbekal pengalaman proyek premium di Jawa dan Bali, kami membawa standar desain, material, dan pengerjaan terbaik untuk Balikpapan, Samarinda, IKN Nusantara, dan seluruh Kalimantan Timur.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/6282147777570"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 rounded-sm flex items-center justify-center gap-2 transition-colors group"
              >
                <span>Jadwalkan Konsultasi Gratis</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => handleNavClick('portfolio')}
                className="border border-white/20 hover:border-white text-white px-8 py-4 rounded-sm transition-colors"
              >
                Lihat Portofolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative bg-[#1a1a1a] py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 50, suffix: '+', label: 'Premium Projects', icon: Crown },
              { value: 10, suffix: ',000+', label: 'Square Meters', icon: Building2 },
              { value: 95, suffix: '%', label: 'Client Referral', icon: Heart },
              { value: 100, suffix: '%', label: 'Integration', icon: Wrench },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon size={20} className="mx-auto mb-2 text-amber-500/60" />
                <div className="text-3xl font-semibold text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/foto3.jpg"
            alt="Luxury Architecture"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-amber-500 text-xs tracking-widest uppercase font-semibold block mb-2">Our Philosophy</span>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
                Menciptakan<br />
                <span className="text-amber-500 font-normal">Arsitektur yang Bernilai</span><br />
                untuk Generasi Berikutnya
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4 font-light">
                Kami percaya bahwa sebuah bangunan bukan hanya struktur fisik. Bangunan adalah representasi pencapaian, identitas, dan investasi jangka panjang.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6 font-light">
                Melalui pendekatan Design & Build yang terintegrasi, kami memastikan setiap detail dirancang dan dibangun dengan presisi tinggi untuk menghasilkan karya yang elegan, fungsional, dan bernilai tinggi.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="relative max-w-md mx-auto">
                <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                  <img
                    src="/images/foto8.jpg"
                    alt="Premium Interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#1a1a1a] p-6 rounded-sm border border-white/5 shadow-xl">
                  <div className="flex items-center gap-4">
                    <Award className="w-8 h-8 text-amber-500" />
                    <div>
                      <span className="text-2xl font-bold text-white">10+</span>
                      <p className="text-[9px] text-gray-500 tracking-wider uppercase">Years Excellence</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-amber-500 text-xs tracking-widest uppercase font-semibold block mb-2">Premium Services</span>
            <h2 className="text-3xl font-light text-white">Layanan Terintegrasi</h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: 'Architectural Design',
                description: 'Perancangan Rumah Tinggal, Villa, Resort, Cafe, Restaurant, Office Building, dan Commercial Property.',
                image: "/images/foto21.jpg",
              },
              {
                icon: Hammer,
                title: 'Construction & Build',
                description: 'Pembangunan rumah baru, renovasi total, commercial building, hingga fit-out interior premium.',
                image: "/images/foto16.jpg",
              },
              {
                icon: Palette,
                title: 'Interior & Furniture',
                description: 'Desain interior dan produksi furniture eksklusif sesuai karakter dan kebutuhan klien.',
                image: "/images/foto12.jpg",
              },
            ].map((service, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="bg-[#1a1a1a] rounded-sm overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300">
                  <div className="aspect-[4/3] relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-sm bg-amber-500/10 flex items-center justify-center mb-4">
                      <service.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-amber-500 text-xs tracking-widest uppercase font-semibold block mb-2">Portfolio</span>
            <h2 className="text-3xl font-light text-white">Selected Masterpieces</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Modern Classic Residence', category: 'Luxury Residence', location: 'Jepara', image: "/images/foto5.jpg" },
              { title: 'Nglimut House', category: 'Contemporary Villa', location: 'Semarang', image: "/images/foto22.jpg" },
              { title: 'Executive Office Premier', category: 'Commercial Building', location: 'Canggu', image: "/images/foto9.jpg" },
              { title: 'Bayfront Villa', category: 'Villa & Resort', location: 'Balikpapan', image: "/images/foto13.jpg" },
              { title: 'Artisan Restaurant', category: 'F&B Space', location: 'Tuban', image: "/images/foto6.jpg" },
              { title: 'Grand Kitchen Suite', category: 'Interior & Furniture', location: 'Balikpapan', image: "/images/foto7.jpg" },
            ].map((project, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-[#1a1a1a] border border-white/5">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[9px] text-amber-400 tracking-widest uppercase mb-1">{project.category}</span>
                    <h3 className="text-lg font-medium text-white mb-1">{project.title}</h3>
                    <span className="text-gray-500 text-xs">{project.location}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & CTA */}
      <section id="contact" className="py-24 bg-[#161616] relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <span className="text-amber-400 text-xs tracking-widest uppercase font-semibold block mb-2">Start Your Journey</span>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
            Wujudkan Properti Impian<br />
            <span className="text-amber-500 font-normal">Bersama ADITYARCH</span>
          </h2>
          <p className="text-gray-400 mb-8 font-light max-w-2xl mx-auto">
            Diskusikan kebutuhan proyek Anda secara langsung bersama Lead Architect kami. Konsultasi awal, survey lokasi, dan analisa kebutuhan ruang tersedia tanpa biaya untuk area Balikpapan dan sekitarnya.
          </p>
          <a
            href="https://wa.me/6282147777570"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-10 py-5 rounded-sm inline-flex items-center gap-3 transition-colors"
          >
            <Phone size={18} />
            <span>KLAIM KONSULTASI GRATIS</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f0f] py-12 border-t border-white/5 text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4 text-gray-400">© {new Date().getFullYear()} ADITYARCH Studio & Build. All Rights Reserved.</p>
          <p className="text-[10px] text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Jl. Mulawarman, Lamaru, Balikpapan Timur, Kota Balikpapan, Kalimantan Timur 76118
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
