import { Flame, Timer, Truck, Award } from 'lucide-react';
import kitchenImage from '@/assets/kitchen-story.jpg';

const features = [
  {
    icon: Flame,
    title: 'Fresh Spices',
    description: 'Hand-picked spices from authentic sources, ground fresh daily for maximum flavor.',
  },
  {
    icon: Timer,
    title: 'Dum Cooked',
    description: 'Traditional slow-cooking technique that locks in flavors and keeps meat tender.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Hot biryani delivered to your doorstep within 30 minutes, guaranteed.',
  },
  {
    icon: Award,
    title: '20+ Varieties',
    description: 'From classic Hyderabadi to regional favorites, we have it all.',
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
            <img
              src={kitchenImage}
              alt="Traditional biryani being prepared in our kitchen"
              className="relative rounded-3xl shadow-elevated object-cover w-full h-[400px] lg:h-[500px]"
            />
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg">
              <p className="font-serif text-4xl font-bold">28+</p>
              <p className="text-sm">Years of Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Why Choose Us</span>
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                The Secret to Our <span className="text-gradient">Perfect Biryani</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Every plate of biryani we serve carries the legacy of generations. Our chefs use time-honored 
                techniques passed down through families of master cooks from Hyderabad.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-card"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
