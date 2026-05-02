import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Percent, Clock, Gift, Ticket, Crown, Users } from 'lucide-react';

const offers = [
  {
    id: '1',
    title: 'First Order Discount',
    description: 'Get 25% off on your first order. Maximum discount of ₹150.',
    code: 'WELCOME25',
    icon: Gift,
    validTill: 'Valid for new users',
    color: 'from-primary to-saffron',
  },
  {
    id: '2',
    title: 'Family Combo',
    description: 'Order 2 biryanis, get 1 absolutely free! Perfect for family dinners.',
    code: 'FAMILY3',
    icon: Users,
    validTill: 'Valid on weekends',
    color: 'from-secondary to-maroon',
  },
  {
    id: '3',
    title: 'Lunch Special',
    description: 'Enjoy 20% off on all orders placed between 12PM to 3PM.',
    code: 'LUNCH20',
    icon: Clock,
    validTill: 'Mon-Fri, 12PM-3PM',
    color: 'from-accent to-gold',
  },
  {
    id: '4',
    title: 'Weekend Feast',
    description: 'Flat ₹100 off on orders above ₹500. Feast like royalty!',
    code: 'WEEKEND100',
    icon: Crown,
    validTill: 'Sat-Sun only',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: '5',
    title: 'Refer & Earn',
    description: 'Refer a friend and both get ₹75 off on your next order.',
    code: 'REFER75',
    icon: Users,
    validTill: 'No expiry',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: '6',
    title: 'Loyalty Reward',
    description: 'Every 5th order gets 15% cashback. Max cashback ₹200.',
    code: 'AUTO APPLIED',
    icon: Ticket,
    validTill: 'For registered users',
    color: 'from-pink-500 to-rose-600',
  },
];

const Offers = () => {
  const copyCode = (code: string) => {
    if (code !== 'AUTO APPLIED') {
      navigator.clipboard.writeText(code);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Save More</span>
            <h1 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Special Offers & Deals
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Exclusive discounts and combo offers to make your biryani experience even more delightful
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${offer.color} p-6 text-primary-foreground shadow-card transition-all duration-300 hover:shadow-elevated hover:scale-[1.02]`}
              >
                <div className="absolute -right-8 -top-8 opacity-20">
                  <offer.icon className="h-40 w-40" />
                </div>
                
                <div className="relative z-10">
                  <offer.icon className="mb-4 h-12 w-12" />
                  <h3 className="mb-2 font-serif text-2xl font-bold">{offer.title}</h3>
                  <p className="mb-4 opacity-90">{offer.description}</p>
                  
                  <div className="mb-4 flex items-center gap-2">
                    <span className="rounded-full bg-background/20 px-3 py-1 text-xs backdrop-blur-sm">
                      {offer.validTill}
                    </span>
                  </div>

                  <div
                    onClick={() => copyCode(offer.code)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-background/20 px-4 py-2 backdrop-blur-sm transition-all hover:bg-background/30"
                  >
                    <span className="text-sm font-semibold">Code:</span>
                    <span className="font-mono font-bold">{offer.code}</span>
                    {offer.code !== 'AUTO APPLIED' && (
                      <span className="text-xs opacity-75">(tap to copy)</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">Ready to save? Start ordering now!</p>
            <Link to="/menu">
              <Button variant="hero" size="lg">
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Offers;
