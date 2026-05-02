import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Clock, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBiryani from '@/assets/hero-biryani.jpg';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Star className="h-4 w-4 fill-current" />
              #1 Rated Biryani in the City
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Authentic{' '}
              <span className="text-gradient">Hyderabadi</span>
              <br />
              Dum Biryani
            </h1>

            <p className="mx-auto max-w-xl text-lg text-muted-foreground lg:mx-0">
              Experience the royal taste of slow-cooked biryani, crafted with premium spices, 
              aged basmati rice, and generations of culinary expertise.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/menu">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Explore Menu
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 lg:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <span>30 min delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <span>4.9 ★ (10K+ reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <span>Free delivery</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-primary/20 blur-3xl lg:h-96 lg:w-96" />
              <div className="absolute -bottom-4 -right-4 h-48 w-48 rounded-full bg-accent/30 blur-2xl lg:h-64 lg:w-64" />
              
              {/* Main image */}
              <div className="relative z-10 animate-float">
                <img
                  src={heroBiryani}
                  alt="Delicious Hyderabadi Dum Biryani served in a traditional copper pot"
                  className="h-64 w-auto rounded-3xl shadow-elevated sm:h-80 lg:h-[450px] object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 z-20 rounded-2xl bg-card p-4 shadow-card sm:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <span className="text-lg font-bold">₹</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Starting at</p>
                    <p className="font-serif text-xl font-bold text-foreground">₹199</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
