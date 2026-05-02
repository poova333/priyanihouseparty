import { MapPin } from 'lucide-react';

const locations = [
  { city: 'Hyderabad', outlets: 12 },
  { city: 'Mumbai', outlets: 8 },
  { city: 'Bangalore', outlets: 6 },
  { city: 'Chennai', outlets: 5 },
  { city: 'Delhi', outlets: 7 },
  { city: 'Pune', outlets: 4 },
];

export const LocationsSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Delivery Cities</span>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            We Deliver Near You
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Find our outlets across major cities in India. Fresh, hot biryani delivered to your doorstep.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {locations.map((location) => (
            <div
              key={location.city}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-card cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{location.city}</p>
                <p className="text-sm text-muted-foreground">{location.outlets} outlets</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
