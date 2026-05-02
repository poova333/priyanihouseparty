import { Search, ShoppingCart, CreditCard, Truck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse Menu',
    description: 'Explore our wide selection of authentic biryanis',
    step: '01',
  },
  {
    icon: ShoppingCart,
    title: 'Add to Cart',
    description: 'Select your favorites and customize as needed',
    step: '02',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Multiple payment options for your convenience',
    step: '03',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Hot biryani at your doorstep in 30 minutes',
    step: '04',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Simple Process</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            How It Works
          </h2>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 bg-border lg:block" />
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-card shadow-card">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {step.step}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
