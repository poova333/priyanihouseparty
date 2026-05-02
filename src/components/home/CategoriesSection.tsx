import { Link } from 'react-router-dom';
import { categories } from '@/data/menuData';
import { ArrowRight } from 'lucide-react';

export const CategoriesSection = () => {
  return (
    <section className="bg-muted py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Explore</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Popular Categories
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From succulent chicken to tender mutton, find your perfect biryani from our wide selection
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/menu?category=${category.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-card transition-all duration-500 hover:shadow-elevated"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="gradient-overlay absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-serif text-xl font-bold text-background">{category.name}</h3>
                <p className="mt-1 text-sm text-background/80">{category.description}</p>
                <div className="mt-3 flex items-center gap-2 text-sm font-medium text-primary">
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
