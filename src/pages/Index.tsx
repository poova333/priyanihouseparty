import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { BestSellers } from '@/components/home/BestSellers';
import { Testimonials } from '@/components/home/Testimonials';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SpecialOffers } from '@/components/home/SpecialOffers';
import { LocationsSection } from '@/components/home/LocationsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <CategoriesSection />
        <BestSellers />
        <SpecialOffers />
        <HowItWorks />
        <Testimonials />
        <LocationsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
