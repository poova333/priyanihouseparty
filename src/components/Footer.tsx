import { Link } from 'react-router-dom';
import { ChefHat, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ChefHat className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold">Biryani</span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-primary">House of Flavors</span>
              </div>
            </Link>
            <p className="text-sm text-background/70">
              Serving authentic Hyderabadi Dum Biryani since 1995. Every grain tells a story of tradition and taste.
            </p>
            <div className="flex gap-4">
              <a href="#" className="rounded-full bg-background/10 p-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-background/10 p-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-background/10 p-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-full bg-background/10 p-2 transition-colors hover:bg-primary hover:text-primary-foreground">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/menu" className="text-background/70 transition-colors hover:text-primary">Our Menu</Link></li>
              <li><Link to="/offers" className="text-background/70 transition-colors hover:text-primary">Special Offers</Link></li>
              <li><Link to="/orders" className="text-background/70 transition-colors hover:text-primary">Track Order</Link></li>
              <li><Link to="/about" className="text-background/70 transition-colors hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-background/70 transition-colors hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-background/70 transition-colors hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-background/70 transition-colors hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/refund" className="text-background/70 transition-colors hover:text-primary">Refund Policy</Link></li>
              <li><Link to="/faq" className="text-background/70 transition-colors hover:text-primary">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-serif text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-background/70">123 Biryani Street, Charminar, Hyderabad - 500002</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-background/70">+91 9876543210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-background/70">order@biryanihouse.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-8 text-center text-sm text-background/50">
          <p>© 2024 Biryani House. All rights reserved. Made with ❤️ for biryani lovers.</p>
        </div>
      </div>
    </footer>
  );
};
