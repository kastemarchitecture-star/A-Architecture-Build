import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowDown,
  Award,
  Users,
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
      className={`transition-all duration-1000 ease-luxury ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} ${className}`}
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

      // Update active section based on scroll position
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
    <div className="min-h-screen bg-obsidian-500 overflow-x-hidden">
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}>
        <div className="bg-obsidian-500/80 backdrop-blur-sm border-b border-ivory-white/5 py-3 hidden md:block">
          <div className="container-luxury flex items-center justify-between text-xs">
            <span className="font-light text-ivory-300/60 tracking-wide">
              Standardization of Luxury — Membawa Standar Eksklusif Jawa & Bali ke Kalimantan Timur
            </span>
            <a
              href="https://wa.me/6282147777570?text=Halo%20Adityarch%20Studio,%20saya%20ingin%20berkonsultasi%20mengenai%20proyek%20hunian%20atau%20komersial%20premium."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-ivory-300/80 hover:text-champagne-400 transition-colors duration-300"
            >
              <Phone size={14} />
              <span className="tracking-wider">+62 821 4777 7570</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-700 ease-luxury ${
          isScrolled
            ? 'top-0 bg-obsidian-500/80 backdrop-blur-glass-lg border-b border-ivory-white/5 shadow-luxury py-4'
            : 'top-12 md:top-8 bg-transparent py-6'
        }`}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-4 group">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 ${
              isScrolled
                ? 'bg-ivory-white border-ivory-white'
                : 'bg-transparent border-ivory-white/20'
            }`}>
              <span className={`font-display font-bold text-2xl transition-colors duration-500 ${
                isScrolled ? 'text-obsidian-500' : 'text-ivory-white'
              }`}>A</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-display text-2xl font-semibold tracking-tight transition-colors duration-500 ${
                isScrolled ? 'text-ivory-white' : 'text-ivory-white'
              }`}>
                ADITYARCH
              </span>
              <span className={`text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 ${
                isScrolled ? 'text-champagne-500' : 'text-ivory-300/70'
              }`}>
                Studio & Build
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 line-hover ${
                  activeSection === item.id
                    ? 'text-champagne-400'
                    : isScrolled
                    ? 'text-ivory-300 hover:text-ivory-white'
                    : 'text-ivory-300/80 hover:text-ivory-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://wa.me/6282147777570"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-xs px-8 py-4"
            >
              Free Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 transition-colors duration-300 ${
              isScrolled ? 'text-ivory-white' : 'text-ivory-white'
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-luxury ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="bg-obsidian-500/95 backdrop-blur-glass-lg border-t border-ivory-white/10">
            <div className="container-luxury py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="text-sm tracking-[0.2em] uppercase text-ivory-300 hover:text-champagne-400 text-left transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://wa.me/6282147777570"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-center"
              >
                Free Consultation
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${heroParallax}px)` }}
        >
          <img
            image: "./public/images/foto1.jpg"
            alt="Luxury Modern Classic Mansion in Bandung"
            className="w-full h-[120%] object-cover hero-breath"
          />
          <div className="absolute inset-0 bg-gradient-dark" />
          <div className="absolute inset-0 bg-gradient-radial-dark" />
        </div>

        {/* Content */}
        <div className="container-luxury relative z-10 pt-32 pb-40">
          <div className="max-w-4xl">
            <div className="opacity-0 animate-fade-in-up">
              <span className="section-label text-champagne-400">
                Designing Timeless Luxury, Building Your Legacy
              </span>
            </div>

            <h1 className="text-hero text-ivory-white mb-8 opacity-0 animate-fade-in-up animate-delay-200">
              Hunian Bukan Sekadar<br />
              <span className="gold-shimmer">Tempat Tinggal.</span>
            </h1>

            <div className="mb-8 opacity-0 animate-fade-in-up animate-delay-300">
              <p className="text-2xl md:text-3xl text-ivory-200 font-display font-light mb-4">
                Ini Adalah Warisan yang Mencerminkan Pencapaian Anda.
              </p>
            </div>

            <div className="mb-10 opacity-0 animate-fade-in-up animate-delay-400">
              <p className="text-base md:text-lg text-ivory-300/70 max-w-2xl leading-relaxed font-light">
                ADITYARCH STUDIO & BUILD menghadirkan layanan Arsitektur, Konstruksi, Interior, dan Custom Furniture dalam satu sistem terintegrasi. Berbekal pengalaman proyek premium di Jawa dan Bali, kami membawa standar desain, material, dan pengerjaan terbaik untuk Balikpapan, Samarinda, IKN Nusantara, dan seluruh Kalimantan Timur.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-12 opacity-0 animate-fade-in-up animate-delay-500">
              {[
                'Estetika yang abadi dan berkelas',
                'Kenyamanan hidup yang maksimal',
                'Nilai investasi properti meningkat',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-ivory-200/90">
                  <div className="w-5 h-5 rounded-full bg-champagne-500/20 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-champagne-400" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-5 opacity-0 animate-fade-in-up animate-delay-600">
              <a
                href="https://wa.me/6282147777570"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold group"
              >
                <span>Jadwalkan Konsultasi Gratis</span>
                <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => handleNavClick('portfolio')}
                className="btn-outline"
              >
                Lihat Portofolio
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-0 animate-fade-in animate-delay-800">
          <button
            onClick={() => handleNavClick('about')}
            className="flex flex-col items-center gap-3 text-ivory-300/50 hover:text-champagne-400 transition-colors group"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-6 h-10 border border-ivory-300/30 rounded-full flex justify-center pt-2 group-hover:border-champagne-400/50 transition-colors">
              <ChevronDown size={14} className="animate-bounce" />
            </div>
          </button>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative bg-obsidian-400/50 py-16 border-y border-ivory-white/5">
        <div className="absolute inset-0 bg-gradient-champagne opacity-20" />
        <div className="container-luxury relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x divide-ivory-white/10">
            {[
              { value: 50, suffix: '+', label: 'Premium Projects', icon: Crown },
              { value: 10, suffix: ',000+', label: 'Square Meters', icon: Building2 },
              { value: 95, suffix: '%', label: 'Client Referral', icon: Heart },
              { value: 100, suffix: '%', label: 'Integration', icon: Wrench },
            ].map((stat, index) => (
              <div key={index} className="text-center lg:px-10">
                <stat.icon size={24} className="mx-auto mb-4 text-champagne-500/60" />
                <div className="text-4xl md:text-5xl font-display text-ivory-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <span className="text-[11px] tracking-[0.2em] uppercase text-ivory-300/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            image: "./public/images/foto3.jpg"
            alt="Luxury Architecture Interior"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-500 via-obsidian-500/90 to-obsidian-500/70" />
        </div>

        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection>
              <span className="section-label">Our Philosophy</span>
              <h2 className="section-title">
                Menciptakan<br />
                <span className="text-gradient-gold">Arsitektur yang Bernilai</span><br />
                untuk Generasi Berikutnya
              </h2>
              <div className="divider-gold mb-8" />
              <p className="text-ivory-300/70 leading-relaxed mb-6 text-lg font-light">
                Kami percaya bahwa sebuah bangunan bukan hanya struktur fisik. Bangunan adalah representasi pencapaian, identitas, dan investasi jangka panjang.
              </p>
              <p className="text-ivory-300/70 leading-relaxed mb-10 font-light">
                Melalui pendekatan Design & Build yang terintegrasi, kami memastikan setiap detail dirancang dan dibangun dengan presisi tinggi untuk menghasilkan karya yang elegan, fungsional, dan bernilai tinggi.
              </p>
              <button
                onClick={() => handleNavClick('services')}
                className="btn-outline group"
              >
                <span>Explore Our Services</span>
                <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </AnimatedSection>

            <AnimatedSection delay={200} className="relative">
              <div className="relative">
                <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-luxury-xl">
                  <img
                    image: "./public/images/foto8.jpg"
                    alt="Premium Modern Classic Interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Card */}
                <div className="absolute -bottom-8 -left-8 glass p-8 rounded-sm shadow-luxury">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-champagne-500/20 flex items-center justify-center border border-champagne-500/30">
                      <Award className="w-7 h-7 text-champagne-400" />
                    </div>
                    <div>
                      <span className="text-4xl font-display text-ivory-white">10+</span>
                      <p className="text-[10px] text-champagne-400 tracking-[0.2em] uppercase mt-1">Years Excellence</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section-padding bg-obsidian-400/30">
        <div className="container-luxury">
          <AnimatedSection className="text-center mb-20">
            <span className="section-label">Why Adityarch</span>
            <h2 className="section-title">
              Mengapa Klien Premium<br />
              Memilih ADITYARCH?
            </h2>
            <div className="divider-gold mx-auto mt-6" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Diamond,
                title: 'Timeless Luxury Design',
                description: 'Desain yang tidak mengikuti tren sesaat. Setiap proporsi, detail, dan elemen arsitektur dirancang agar tetap elegan dan relevan puluhan tahun ke depan.',
              },
              {
                icon: Wrench,
                title: 'Integrated Design & Build',
                description: 'Arsitektur, konstruksi, interior, dan custom furniture berada dalam satu sistem manajemen sehingga menghasilkan akurasi tinggi dan efisiensi biaya.',
              },
              {
                icon: Sparkles,
                title: 'Java & Bali Quality Standard',
                description: 'Menghadirkan kualitas pengerjaan, craftsmanship, dan detail finishing yang identik dengan proyek-proyek premium Jawa dan Bali.',
              },
              {
                icon: Eye,
                title: 'Transparent Project Monitoring',
                description: 'Laporan progres berkala, dokumentasi lapangan, dan pengawasan profesional selama proses pembangunan.',
              },
              {
                icon: Clock,
                title: 'Precision Timeline Management',
                description: 'Setiap proyek dijalankan menggunakan sistem penjadwalan profesional untuk menjaga kualitas dan ketepatan waktu.',
              },
              {
                icon: Heart,
                title: 'Client-Centered Experience',
                description: 'Pendampingan langsung mulai dari konsultasi awal hingga serah terima bangunan.',
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="card-luxury p-10 h-full group hover:shadow-inner-glow">
                  <div className="w-14 h-14 rounded-sm bg-champagne-500/10 border border-champagne-500/20 flex items-center justify-center mb-8 group-hover:bg-champagne-500/20 transition-colors duration-500">
                    <item.icon className="w-6 h-6 text-champagne-400" />
                  </div>
                  <h3 className="font-display text-xl text-ivory-white mb-4">{item.title}</h3>
                  <p className="text-ivory-300/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding relative">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            image: "./public/images/foto6.jpg"
            alt="Luxury Property Architecture"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-500 via-obsidian-500/95 to-obsidian-500" />
        </div>

        <div className="container-luxury relative z-10">
          <AnimatedSection className="text-center mb-20">
            <span className="section-label">Premium Services</span>
            <h2 className="section-title">Layanan Terintegrasi</h2>
            <p className="section-subtitle mx-auto">
              Arsitektur, Konstruksi, Interior & Custom Furniture dalam satu sistem terintegrasi
            </p>
            <div className="divider-gold mx-auto mt-8" />
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: 'Architectural Design',
                description: 'Perancangan Rumah Tinggal, Villa, Resort, Cafe, Restaurant, Office Building, dan Commercial Property.',
                services: [
                  'Concept Design',
                  'Master Planning',
                  '3D Photorealistic Rendering',
                  'Detail Engineering Drawing (DED)',
                  'Working Drawing',
                  'Official Budget Planning (RAB)',
                ],
                image: "./public/images/foto21.jpg",
              },
              {
                icon: Hammer,
                title: 'Construction & Build',
                description: 'Pembangunan rumah baru, renovasi total, commercial building, hingga fit-out interior premium.',
                services: [
                  'Structural Quality Assurance',
                  'Waterproofing Warranty',
                  'S-Curve Progress Monitoring',
                  'Premium Certified Materials',
                  'Professional Site Management',
                ],
                image: "./public/images/foto16.jpg",
              },
              {
                icon: Palette,
                title: 'Interior & Furniture',
                description: 'Desain interior dan produksi furniture eksklusif sesuai karakter dan kebutuhan klien.',
                services: [
                  'Luxury Interior Design',
                  'meeting room Premium',
                  'Walk-In Closet',
                  'Custom Wardrobe',
                  'Built-In Furniture',
                  'Independent Workshop Production',
                ],
                image: "./public/images/foto12.jpg",
              },
            ].map((service, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="group relative overflow-hidden rounded-sm border border-ivory-white/5 hover:border-champagne-500/30 transition-all duration-700">
                  <div className="aspect-[4/5] relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-500 via-obsidian-500/50 to-obsidian-500/20 group-hover:from-obsidian-500/95 group-hover:via-obsidian-500/70 transition-colors duration-700" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="w-12 h-12 rounded-sm bg-champagne-500/10 backdrop-blur-sm border border-champagne-500/20 flex items-center justify-center mb-5">
                      <service.icon className="w-5 h-5 text-champagne-400" />
                    </div>
                    <h3 className="font-display text-2xl text-ivory-white mb-3">{service.title}</h3>
                    <p className="text-ivory-300/60 text-sm mb-6">{service.description}</p>
                    <ul className="space-y-2 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {service.services.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-ivory-200/70 text-xs">
                          <div className="w-1 h-1 rounded-full bg-champagne-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Design Build Advantage */}
      <section className="section-padding overflow-hidden">
        {/* Full Width Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            image: "./public/images/foto13.jpg"
            alt="Tropical Luxury Villa"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-obsidian-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian-500 via-obsidian-500/80 to-transparent" />
        </div>

        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection>
              <span className="section-label">The Advantage</span>
              <h2 className="section-title">
                Sistem Satu Atap<br />
                <span className="text-gradient-gold">Lebih Menguntungkan</span>
              </h2>
              <div className="divider-gold mb-8" />
              <p className="text-ivory-300/70 leading-relaxed mb-6 text-lg font-light">
                Ketika desain, kontraktor, dan interior dikerjakan oleh vendor yang berbeda, risiko kesalahan komunikasi dan pembengkakan biaya menjadi jauh lebih tinggi.
              </p>
              <p className="text-ivory-300/60 mb-8">Dengan sistem terintegrasi ADITYARCH:</p>
              <div className="space-y-4">
                {[
                  'Visualisasi 3D lebih akurat terhadap hasil akhir',
                  'Anggaran lebih terkendali sejak tahap perencanaan',
                  'Komunikasi lebih sederhana melalui satu Project Manager',
                  'Waktu pembangunan lebih efisien',
                  'Kualitas akhir lebih konsisten',
                  'Nilai properti meningkat secara signifikan',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full border border-champagne-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-champagne-500/20 transition-colors">
                      <CheckCircle2 size={12} className="text-champagne-400" />
                    </div>
                    <span className="text-ivory-200/80">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '3x', label: 'More Efficient' },
                  { value: '100%', label: 'Design Accuracy' },
                  { value: '1', label: 'Project Manager' },
                  { value: '30%', label: 'Cost Savings' },
                ].map((stat, i) => (
                  <div key={i} className="card-glass p-8 text-center hover:border-champagne-500/20 transition-colors duration-500">
                    <span className="block text-4xl md:text-5xl font-display text-champagne-400 mb-2">{stat.value}</span>
                    <span className="text-[10px] text-ivory-300/50 tracking-[0.2em] uppercase">{stat.label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section id="process" className="section-padding bg-obsidian-400/40">
        <div className="container-luxury">
          <AnimatedSection className="text-center mb-24">
            <span className="section-label">Our Methodology</span>
            <h2 className="section-title">Proses Kerja Kami</h2>
            <div className="divider-gold mx-auto mt-6" />
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-24 left-[8%] right-[8%] h-[1px] bg-gradient-to-r from-transparent via-champagne-500/30 to-transparent" />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  step: '01',
                  title: 'Initial Consultation',
                  description: 'Diskusi kebutuhan, gaya desain, target anggaran, dan jadwal pembangunan.',
                  icon: Users,
                  image: "./public/images/foto17.jpg",
                },
                {
                  step: '02',
                  title: 'Site Survey & Analysis',
                  description: 'Analisa kondisi lahan, orientasi bangunan, dan potensi pengembangan.',
                  icon: Target,
                  image: "./public/images/foto19.jpg",
                },
                {
                  step: '03',
                  title: 'Concept Design',
                  description: 'Penyusunan konsep desain, zoning ruang, dan visualisasi awal.',
                  icon: Palette,
                  image: "./public/images/foto6.jpg",
                },
                {
                  step: '04',
                  title: 'Technical Planning',
                  description: 'Pembuatan gambar kerja lengkap, DED, dan RAB.',
                  icon: Shield,
                  image: "./public/images/foto25.jpg",
                },
                {
                  step: '05',
                  title: 'Construction',
                  description: 'Pelaksanaan pembangunan dengan pengawasan profesional.',
                  icon: Hammer,
                  image: "./public/images/foto6.jpg",
                },
                {
                  step: '06',
                  title: 'Project Handover',
                  description: 'Quality control akhir, serah terima proyek, dan garansi.',
                  icon: Award,
                  image: "./public/images/foto20.jpg",
                },
              ].map((item, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="relative group">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-luxury flex items-center justify-center text-obsidian-500 text-sm font-bold shadow-gold z-10 group-hover:scale-110 transition-transform duration-500">
                      {item.step}
                    </div>
                    <div className="card-luxury overflow-hidden pt-14">
                      <div className="aspect-[3/2] overflow-hidden mb-6">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                        />
                      </div>
                      <div className="px-8 pb-8">
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-10 h-10 rounded-sm bg-champagne-500/10 flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-champagne-400" />
                          </div>
                        </div>
                        <h3 className="font-display text-lg text-ivory-white text-center mb-3">{item.title}</h3>
                        <p className="text-ivory-300/50 text-sm text-center">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src=image: "./public/images/foto10.jpg"
            alt="Luxury Architecture Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-obsidian-500" />
        </div>

        <div className="container-luxury relative z-10">
          <AnimatedSection className="text-center mb-20">
            <span className="section-label">Portofolio</span>
            <h2 className="section-title">Selected Masterpieces</h2>
            <div className="divider-gold mx-auto mt-6" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Modern Classic Residence',
                category: 'Luxury Residence',
                location: 'Jepara',
                image: "./public/images/foto5.jpg" ,
              },
              {
                title: 'Nglimut House',
                category: 'Contemporary Villa',
                location: 'Semarang',
                image: "./public/images/foto22.jpg",
              },
              {
                title: 'Executive Office Premier',
                category: 'Commercial Building',
                location: 'Canggu',
                image: "./public/images/foto9.jpg",
              },
              {
                title: 'Bayfront Villa',
                category: 'Villa & Resort',
                location: 'Balikpapan',
                image: "./public/images/foto13.jpg",
              },
              {
                title: 'Artisan Restaurant',
                category: 'F&B Space',
                location: 'Tuban',
                image: "./public/images/nama-foto11.jpg",
              },
              {
                title: 'Grand Kitchen Suite',
                category: 'Interior & Furniture',
                location: 'Balikpapan',
                image: "./public/images/foto7.jpg",
              },
            ].map((project, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer border border-ivory-white/5 hover:border-champagne-500/30 transition-all duration-700">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-500/95 via-obsidian-500/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-champagne-400 mb-3">{project.category}</span>
                    <h3 className="font-display text-2xl text-ivory-white mb-2">{project.title}</h3>
                    <span className="text-ivory-300/50 text-xs">{project.location}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 rounded-full bg-champagne-500/10 backdrop-blur-sm border border-champagne-500/30 flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-champagne-400" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-16" delay={300}>
            <a
              href="https://wa.me/6282147777570?text=Halo%20Adityarch%20Studio,%20saya%20ingin%20melihat%20portofolio%20lengkap."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <span>Explore Full Portfolio</span>
              <ArrowRight size={18} className="ml-3" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding bg-obsidian-400/30">
        <div className="container-luxury">
          <AnimatedSection className="text-center mb-20">
            <span className="section-label">Client Stories</span>
            <h2 className="section-title">Kata Mereka</h2>
            <div className="divider-gold mx-auto mt-6" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              {
                quote: '"Awalnya cukup sulit menemukan kontraktor yang benar-benar memahami gaya Modern Classic. ADITYARCH berhasil menghadirkan kualitas yang sangat rapi dan elegan."',
                author: 'Homeowner',
                location: 'Jakarta',
                rating: 5,
                image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=100',
              },
              {
                quote: '"Koordinasi sangat profesional. Dari desain hingga custom furniture berjalan dalam satu sistem yang terorganisir dengan sangat baik."',
                author: 'Business Owner',
                location: 'Semarang',
                rating: 5,
                image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=100',
              },
            ].map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="card-luxury p-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="aspect-square w-16 rounded-sm overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                    <div>
                      <span className="block font-display text-lg text-ivory-white">{testimonial.author}</span>
                      <span className="text-ivory-300/50 text-sm">{testimonial.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-champagne-400 fill-champagne-400" />
                    ))}
                  </div>
                  <p className="text-ivory-300/70 leading-relaxed italic font-light">{testimonial.quote}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            image: "./public/images/foto2.jpg"
            alt="Luxury Property Exterior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-obsidian-500/85" />
          <div className="absolute inset-0 bg-gradient-radial-dark" />
        </div>

        <div className="container-luxury relative z-10">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <span className="section-label text-champagne-400">Start Your Journey</span>
            <h2 className="text-display-xl font-display text-ivory-white mb-6">
              Wujudkan Properti Impian<br />
              <span className="text-gradient-gold">Bersama ADITYARCH</span>
            </h2>
            <p className="text-xl text-ivory-300/70 mb-12 font-light leading-relaxed">
              Diskusikan kebutuhan proyek Anda secara langsung bersama Lead Architect kami. Konsultasi awal, survey lokasi, dan analisa kebutuhan ruang tersedia tanpa biaya untuk area Balikpapan dan sekitarnya.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-14 max-w-2xl mx-auto">
              {[
                'Konsultasi Eksklusif',
                'Site Survey',
                'Analisa Karakter Lahan',
                'Konsep Zoning Ruang',
                'Estimasi Awal RAB',
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-center gap-3 text-ivory-200/90 bg-ivory-white/5 px-4 py-3 rounded-sm">
                  <CheckCircle2 size={14} className="text-champagne-400" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/6282147777570?text=Halo%20Adityarch%20Studio,%20saya%20ingin%20mengklaim%20konsultasi%20gratis%20untuk%20proyek%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-base px-14 py-6 inline-flex items-center gap-4 group"
            >
              <Phone size={22} />
              <span>KLAIM KONSULTASI GRATIS</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-obsidian-black pt-20 pb-10 border-t border-ivory-white/5">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-luxury flex items-center justify-center shadow-gold">
                  <span className="font-display font-bold text-2xl text-obsidian-500">A</span>
                </div>
                <div>
                  <span className="font-display text-2xl text-ivory-white block">ADITYARCH</span>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-champagne-500">
                    Studio & Build
                  </span>
                </div>
              </div>
              <p className="text-ivory-300/50 text-sm leading-relaxed max-w-md mb-8">
                Designing Timeless Luxury, Building Your Legacy. Arsitektur, Konstruksi, Interior & Custom Furniture dengan Standar Premium Jawa & Bali untuk Kalimantan Timur.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/6282147777570"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-ivory-white/10 flex items-center justify-center text-ivory-300/60 hover:border-champagne-500/50 hover:text-champagne-400 transition-all"
                >
                  <Phone size={18} />
                </a>
                <a
                  href="mailto:info@adityarchstudio.com"
                  className="w-11 h-11 rounded-full border border-ivory-white/10 flex items-center justify-center text-ivory-300/60 hover:border-champagne-500/50 hover:text-champagne-400 transition-all"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-ivory-white/10 flex items-center justify-center text-ivory-300/60 hover:border-champagne-500/50 hover:text-champagne-400 transition-all"
                >
                  <MapPin size={18} />
                </a>
              </div>
            </div>

            {/* Office */}
            <div>
              <h4 className="font-display text-lg text-ivory-white mb-6">Office & Studio</h4>
              <div className="space-y-4 text-sm text-ivory-300/50">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-champagne-500/60 mt-1 flex-shrink-0" />
                  <span>
                    Jl.Mulawarman,Lamaru, Balikpapan Timur<br />
                    Kota Balikpapan<br />
                    Kalimantan Timur 76118
                    Jl.Gajah Mada No.49, Kec Semarang Tengah
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-champagne-500/60 flex-shrink-0" />
                  <a href="tel:+6282147777570" className="hover:text-champagne-400 transition-colors">
                    +62 821 4777 7570
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-champagne-500/60 flex-shrink-0" />
                  <a href="mailto:info@adityarchstudio.com" className="hover:text-champagne-400 transition-colors">
                    info@adityarchstudio.com
                  </a>
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div>
              <h4 className="font-display text-lg text-ivory-white mb-6">Service Area</h4>
              <div className="grid grid-cols-2 gap-3 text-sm text-ivory-300/50">
                {['Balikpapan', 'Samarinda', 'IKN Nusantara', 'Bontang', 'Sangatta', 'Penajam', 'Kaltim'].map((area, i) => (
                  <span key={i} className="hover:text-champagne-400 transition-colors cursor-default">{area}</span>
                ))}
              </div>
            </div>
          </div>

          {/* SEO Keywords */}
          <div className="border-t border-ivory-white/5 pt-8 mb-8">
            <p className="text-[10px] text-ivory-300/30 text-center leading-relaxed tracking-wide">
              Jasa Arsitek Balikpapan | Arsitek Modern Classic Balikpapan | Kontraktor Rumah Balikpapan | Jasa Bangun Rumah Balikpapan | Interior Design Balikpapan | Kitchen Set Balikpapan | Arsitek Samarinda | Kontraktor Samarinda | Arsitek IKN | Design Build Balikpapan | Luxury House Architect Balikpapan | Premium Architecture Indonesia
            </p>
          </div>

          {/* Copyright */}
          <div className="border-t border-ivory-white/5 pt-6 text-center">
            <p className="text-[11px] text-ivory-300/40">
              &copy; {new Date().getFullYear()} ADITYARCH Studio & Build. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
