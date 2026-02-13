import { Leaf, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative">
      {/* Contact Bar */}
      <div className="bg-gradient-to-r from-secondary to-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: MapPin, label: 'ADDRESS', value: '775 Rolling Green Rd, India' },
              { icon: Mail, label: 'EMAIL', value: 'support@example.com' },
              { icon: Phone, label: 'PHONE', value: '+123 34598768' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-4 text-foreground">
                  <div className="bg-primary rounded-lg p-3 flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider">{item.label}</p>
                    <p className="text-lg font-bold">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gradient-to-b from-foreground to-foreground/95 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4 lg:col-span-1">
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-secondary" />
                <span className="font-bold text-xl text-secondary">Ammamma Foods</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Premium handcrafted Indian masalas made with love and tradition for over 15 years.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3 pt-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="p-2 bg-white/10 hover:bg-secondary rounded-full transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5 text-white hover:text-foreground" />
                  </a>
                ))}
              </div>
            </div>

            {/* Pantry Boxes */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-secondary">Pantry Boxes</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Bachelor Box', href: '/custom-box?box=combo-1' },
                  { label: 'Family Box', href: '/custom-box?box=combo-2' },
                  { label: 'NRI Box', href: '/custom-box?box=combo-3' },
                  { label: 'Build Custom Box', href: '/custom-box' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-white/70 hover:text-secondary transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-secondary">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { label: 'About Us', href: '/#about' },
                  { label: 'Our Story', href: '/#story' },
                  { label: 'FAQ', href: '/#faq' },
                  { label: 'Contact Us', href: '/#contact' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-white/70 hover:text-secondary transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 lg:col-span-2">
              <h3 className="font-bold text-lg text-secondary">Get in Touch</h3>
              <div className="space-y-3">
                <p className="text-white/70 text-sm leading-relaxed">
                  Have questions about our pantry boxes? We would love to hear from you. Reach out and we will get back to you within 24 hours.
                </p>
                <Link
                  href="/#contact"
                  className="inline-block px-5 py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-lg text-sm font-semibold transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
              <p>{`© ${currentYear} Ammamma Foods. All rights reserved.`}</p>
              <p>Proudly powered by tradition and quality</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
