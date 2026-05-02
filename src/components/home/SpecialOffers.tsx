import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Percent, Clock, Gift, ArrowRight } from 'lucide-react';

const offers = [
  {
    id: '1',
    title: 'First Order Discount',
    description: 'Get 25% off on your first order',
    code: 'WELCOME25',
    icon: Gift,
    color: 'from-primary to-saffron',
  },
  {
    id: '2',
    title: 'Family Combo',
    description: 'Order 2 biryanis, get 1 free',
    code: 'FAMILY3',
    icon: Percent,
    color: 'from-secondary to-maroon',
  },
  {
    id: '3',
    title: 'Lunch Special',
    description: '20% off between 12PM-3PM',
    code: 'LUNCH20',
    icon: Clock,
    color: 'from-accent to-gold',
  },
];

export const SpecialOffers = () => {
  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Limited Time</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Special Offers
            </h2>
          </div>
          <Link to="/offers">
            <Button variant="outline" className="gap-2">
              View All Offers
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${offer.color} p-6 text-primary-foreground shadow-card transition-all duration-300 hover:shadow-elevated hover:scale-[1.02]`}
            >
              <div className="absolute -right-4 -top-4 opacity-20">
                <offer.icon className="h-32 w-32" />
              </div>
              
              <div className="relative z-10">
                <offer.icon className="mb-4 h-10 w-10" />
                <h3 className="mb-2 font-serif text-2xl font-bold">{offer.title}</h3>
                <p className="mb-4 opacity-90">{offer.description}</p>
                <div className="inline-flex items-center gap-2 rounded-full bg-background/20 px-4 py-2 backdrop-blur-sm">
                  <span className="text-sm font-semibold">Code:</span>
                  <span className="font-mono font-bold">{offer.code}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
