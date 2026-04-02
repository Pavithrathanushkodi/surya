import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Globe, 
  Calendar,
  User,
  Smartphone,
  Info
} from 'lucide-react';

// --- Types ---
type Language = 'en' | 'ta';

interface Content {
  title: string;
  subtitle: string;
  consultation: string;
  bookNow: string;
  servicesTitle: string;
  benefitsTitle: string;
  pricingTitle: string;
  appointmentTitle: string;
  formName: string;
  formMobile: string;
  formTime: string;
  formSubmit: string;
  formSuccess: string;
  whatsappMessage: string;
  benefits: string[];
  serviceDescription: string;
  durations: { label: string; price: string }[];
}

// --- Data ---
const CONTENT: Record<Language, Content> = {
  en: {
    title: "Try Massage & Healthcare",
    subtitle: "Traditional Thai Healing & Modern Wellness",
    consultation: "Free Consultation",
    bookNow: "Book Appointment",
    servicesTitle: "Our Specialized Services",
    benefitsTitle: "Key Benefits of Thai Massage",
    pricingTitle: "Pricing & Duration",
    appointmentTitle: "Request an Appointment",
    formName: "Full Name",
    formMobile: "Mobile Number",
    formTime: "Preferred Time",
    formSubmit: "Book via WhatsApp",
    formSuccess: "Redirecting to WhatsApp...",
    whatsappMessage: "Hello! I would like to book an appointment.",
    serviceDescription: "Thai massage is a traditional body treatment that combines stretching and pressure techniques to restore energy and balance.",
    benefits: [
      "Reduces body pain (Back, Neck, Joints)",
      "Improves blood circulation and energy",
      "Reduces stress and anxiety",
      "Increases flexibility and muscle relaxation",
      "Supports digestive and immune systems",
      "Relieves fatigue and exhaustion"
    ],
    durations: [
      { label: "Half Hour", price: "₹1000" },
      { label: "One Hour", price: "₹1500" },
      { label: "One & Half Hours", price: "₹2000" },
      { label: "Two Hours", price: "₹2500" }
    ]
  },
  ta: {
    title: "ட்ரை மசாஜ் & ஹெல்த்கேர்",
    subtitle: "பாரம்பரிய தாய் சிகிச்சை மற்றும் நவீன ஆரோக்கியம்",
    consultation: "இலவச ஆலோசனை",
    bookNow: "முன்பதிவு செய்யுங்கள்",
    servicesTitle: "எங்கள் சிறப்பு சேவைகள்",
    benefitsTitle: "தாய் மசாஜின் முக்கிய பயன்கள்",
    pricingTitle: "கட்டணம் மற்றும் நேரம்",
    appointmentTitle: "முன்பதிவு கோரிக்கை",
    formName: "முழு பெயர்",
    formMobile: "கைபேசி எண்",
    formTime: "விருப்பமான நேரம்",
    formSubmit: "வாட்ஸ்அப் மூலம் முன்பதிவு",
    formSuccess: "வாட்ஸ்அப்பிற்கு செல்கிறது...",
    whatsappMessage: "வணக்கம்! நான் ஒரு அப்பாயிண்ட்மெண்ட் பதிவு செய்ய விரும்புகிறேன்.",
    serviceDescription: "தாய் மசாஜ் ஒரு பாரம்பரிய உடல் சிகிச்சை முறை. இது stretching + pressure technique சேர்ந்து செய்யப்படும்.",
    benefits: [
      "உடல் வலி குறையும் (முதுகு, கழுத்து, மூட்டு வலி)",
      "ரத்த ஓட்டம் மேம்படும் மற்றும் ஆற்றல் அதிகரிக்கும்",
      "மன அழுத்தம் மற்றும் பதட்டம் குறையும்",
      "உடல் நெகிழ்வு மற்றும் தசை தளர்வு அதிகரிக்கும்",
      "செரிமானம் மற்றும் நோய் எதிர்ப்பு சக்திக்கு உதவும்",
      "உடல் சோர்வு மற்றும் களைப்பை நீக்கும்"
    ],
    durations: [
      { label: "அரை மணி நேரம்", price: "₹1000" },
      { label: "ஒரு மணி நேரம்", price: "₹1500" },
      { label: "ஒன்றரை மணி நேரம்", price: "₹2000" },
      { label: "இரண்டு மணி நேரம்", price: "₹2500" }
    ]
  }
};

const WHATSAPP_NUMBER = "8190942026";

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = CONTENT[lang];

  const handleWhatsAppConsultation = () => {
    const message = encodeURIComponent(content.whatsappMessage);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.time) {
      alert(lang === 'en' ? "Please fill all fields" : "தயவுசெய்து அனைத்து விவரங்களையும் நிரப்பவும்");
      return;
    }

    setIsSubmitting(true);
    
    const message = encodeURIComponent(
      `*New Appointment Request*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Mobile:* ${formData.mobile}\n` +
      `*Time:* ${formData.time}\n` +
      `*Service:* Try Massage (Thai + Chiropractic + Yoga + Stretching)\n` +
      `*Duration:* ${selectedDuration || 'Not selected'}`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-olive/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-olive rounded-full flex items-center justify-center text-white">
              <span className="font-serif text-xl font-bold">T</span>
            </div>
            <h1 className="serif text-xl font-bold text-brand-olive hidden sm:block">
              {content.title}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-olive/20 text-sm font-medium hover:bg-brand-olive/5 transition-colors"
            >
              <Globe size={16} />
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>
            <button 
              onClick={handleWhatsAppConsultation}
              className="bg-green-600 text-white px-4 py-2 pill-button flex items-center gap-2 text-sm font-semibold"
            >
              <MessageCircle size={18} />
              <span className="hidden xs:inline">{content.consultation}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/images/image3.jpg" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/80 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="text-brand-olive font-semibold tracking-widest uppercase text-sm mb-4 block">
                {content.subtitle}
              </span>
              <h2 className="serif text-5xl md:text-7xl font-bold text-brand-olive leading-tight mb-6">
                {content.title}
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {content.serviceDescription}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#appointment" className="bg-brand-olive text-white px-8 py-4 pill-button font-bold text-lg inline-block">
                  {content.bookNow}
                </a>
                <button 
                  onClick={handleWhatsAppConsultation}
                  className="bg-white text-brand-olive border-2 border-brand-olive px-8 py-4 pill-button font-bold text-lg"
                >
                  {content.consultation}
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services & Benefits */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="serif text-4xl font-bold text-brand-olive mb-8">
                  {content.benefitsTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {content.benefits.map((benefit, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="text-brand-gold shrink-0 mt-1" size={20} />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="/images/image1.jpg" />
                  <img 
                    src="images/pic2.jpeg" 
                    alt="Stretching" 
                    className="rounded-3xl w-full aspect-video object-cover card-shadow"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="pt-12 space-y-4">
                 <img src="/images/image2.jpg" />
                  <img 
                    src="images/pic1.jpeg" 
                    alt="Chiropractic Care" 
                    className="rounded-3xl w-full aspect-[3/4] object-cover card-shadow"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24 bg-brand-cream/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="serif text-4xl font-bold text-brand-olive mb-4">
                {content.pricingTitle}
              </h3>
              <p className="text-gray-600 max-w-xl mx-auto">
                {lang === 'en' 
                  ? "Choose the duration that fits your schedule. All sessions include Thai Massage, Chiropractic, Yoga, and Stretching."
                  : "உங்கள் நேரத்திற்கு ஏற்ற கால அளவைத் தேர்ந்தெடுக்கவும். அனைத்து அமர்வுகளிலும் தாய் மசாஜ், சிரோபிராக்டிக், யோகா மற்றும் ஸ்ட்ரெச்சிங் ஆகியவை அடங்கும்."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.durations.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDuration(item.label)}
                  className={`p-8 rounded-3xl text-center transition-all duration-300 ${
                    selectedDuration === item.label 
                      ? 'bg-brand-olive text-white scale-105 shadow-xl' 
                      : 'bg-white text-brand-olive hover:shadow-lg border border-brand-olive/10'
                  }`}
                >
                  <Clock className={`mx-auto mb-4 ${selectedDuration === item.label ? 'text-white' : 'text-brand-gold'}`} size={32} />
                  <div className="text-sm uppercase tracking-widest font-bold mb-2 opacity-80">{item.label}</div>
                  <div className="text-3xl font-serif font-bold">{item.price}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Appointment Form */}
        <section id="appointment" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-brand-cream rounded-[40px] p-8 md:p-12 card-shadow border border-brand-olive/5">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-brand-olive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-brand-olive" size={32} />
                </div>
                <h3 className="serif text-3xl font-bold text-brand-olive">
                  {content.appointmentTitle}
                </h3>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-2">
                      {content.formName}
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-brand-olive/10 focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-2">
                      {content.formMobile}
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="tel" 
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-brand-olive/10 focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all"
                        placeholder="8190942026"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-2">
                    {content.formTime}
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-brand-olive/10 focus:outline-none focus:ring-2 focus:ring-brand-olive/20 transition-all"
                      placeholder="e.g. Tomorrow 10:00 AM"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-olive text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-brand-olive/90 transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      />
                      {content.formSuccess}
                    </>
                  ) : (
                    <>
                      <MessageCircle size={24} />
                      {content.formSubmit}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-olive text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-olive">
                  <span className="font-serif text-xl font-bold">T</span>
                </div>
                <h4 className="serif text-2xl font-bold">{content.title}</h4>
              </div>
              <p className="text-white/70 leading-relaxed">
                {content.serviceDescription}
              </p>
            </div>
            
            <div>
              <h5 className="font-bold uppercase tracking-widest text-sm mb-6 text-brand-gold">
                {lang === 'en' ? 'Contact Us' : 'தொடர்புக்கு'}
              </h5>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-brand-gold" />
                  <span>+91 8190942026</span>
                </li>
                
                <li className="flex items-center gap-3">
                  <Info size={18} className="text-brand-gold" />
                  <span>{lang === 'en' ? 'Open 9:00 AM - 9:00 PM' : 'காலை 9:00 - இரவு 9:00'}</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-widest text-sm mb-6 text-brand-gold">
                {lang === 'en' ? 'Quick Links' : 'விரைவு இணைப்புகள்'}
              </h5>
              <div className="flex flex-col gap-4">
                <button onClick={handleWhatsAppConsultation} className="text-left hover:text-brand-gold transition-colors">
                  {content.consultation}
                </button>
                <a href="#appointment" className="hover:text-brand-gold transition-colors">
                  {content.bookNow}
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            © 2026 {content.title}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button 
        onClick={handleWhatsAppConsultation}
        className="fixed bottom-8 right-8 w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <MessageCircle size={32} />
      </button>
    </div>
  );
}
