import { testimonials } from '@/data/menuData';
import { Star, Quote } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="bg-foreground py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Testimonials</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-background sm:text-4xl lg:text-5xl">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-2xl bg-background/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-background/10"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/30" />
              
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-background">{testimonial.name}</p>
                  <p className="text-sm text-background/60">{testimonial.location}</p>
                </div>
              </div>

              <div className="mb-3 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="mb-4 text-sm text-background/80 line-clamp-4">{testimonial.comment}</p>
              <p className="text-xs text-background/50">{testimonial.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
