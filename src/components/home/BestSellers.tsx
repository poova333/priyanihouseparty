import { menuItems } from '@/data/menuData';
import { BiryaniCard } from '@/components/BiryaniCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const BestSellers = () => {
  const bestSellers = menuItems.filter((item) => item.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Most Loved</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Best Sellers
            </h2>
          </div>
          <Link to="/menu">
            <Button variant="outline" className="gap-2">
              View All Menu
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((item) => (
            <BiryaniCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
