import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const SocialLink = ({ href, icon: Icon }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-white transition-colors duration-200"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon size={20} />
  </a>
);

const QuickLink = ({ href, children }) => (
  <li>
    <a href={href} className="text-gray-400 hover:text-white transition-colors duration-200">
      {children}
    </a>
  </li>
);

const ContactItem = ({ icon: Icon, children }) => (
  <li className="flex items-center space-x-2 text-gray-400">
    <Icon size={16} />
    <span>{children}</span>
  </li>
);

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' }
  ];

  const quickLinks = [
    { href: '#', text: 'Menu' },
    { href: '#', text: 'Locations' },
    { href: '#', text: 'Rewards Program' },
    { href: '#', text: 'Gift Cards' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Moonbrew Coffee</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting exceptional coffee experiences since 2020. Every cup tells a story.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <QuickLink key={index} href={link.href}>
                  {link.text}
                </QuickLink>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <ContactItem icon={MapPin}>123 Coffee Lane, Brewtown</ContactItem>
              <ContactItem icon={Phone}>(555) 123-4567</ContactItem>
              <ContactItem icon={Mail}>hello@moonbrew.coffee</ContactItem>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg 
                         border border-gray-700 focus:outline-none focus:ring-2 
                         focus:ring-gray-400 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg font-medium
                         hover:bg-gray-600 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Moonbrew Coffee Company. All rights reserved.
          </p>
          <div className="mt-4 space-x-4 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}