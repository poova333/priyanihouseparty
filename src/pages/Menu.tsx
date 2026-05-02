import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BiryaniCard } from '@/components/BiryaniCard';
import { Button } from '@/components/ui/button';
import { menuItems, categories } from '@/data/menuData';
import { Flame, Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const spiceLevels = ['mild', 'medium', 'hot', 'extra-hot'] as const;

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const selectedCategory = searchParams.get('category') || 'all';
  const selectedSpice = searchParams.get('spice') || 'all';

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSpice = selectedSpice === 'all' || item.spiceLevel === selectedSpice;
      return matchesSearch && matchesCategory && matchesSpice;
    });
  }, [searchQuery, selectedCategory, selectedSpice]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleSpiceChange = (spice: string) => {
    const params = new URLSearchParams(searchParams);
    if (spice === 'all') {
      params.delete('spice');
    } else {
      params.set('spice', spice);
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedSpice !== 'all' || searchQuery;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              Our Menu
            </h1>
            <p className="mt-2 text-muted-foreground">
              Explore our wide selection of authentic biryanis
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search biryani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  !
                </span>
              )}
            </Button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className={cn(
            "mb-8 space-y-6 rounded-xl border border-border bg-card p-4 lg:p-0 lg:border-0 lg:bg-transparent lg:space-y-0",
            showFilters ? "block" : "hidden lg:block"
          )}>
            {/* Categories */}
            <div className="lg:mb-6">
              <h3 className="mb-3 text-sm font-semibold text-foreground lg:hidden">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange('all')}
                >
                  All
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Spice Levels */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground lg:hidden">Spice Level</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedSpice === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSpiceChange('all')}
                >
                  All Spice
                </Button>
                {spiceLevels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedSpice === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleSpiceChange(level)}
                    className="gap-1 capitalize"
                  >
                    <Flame className="h-3 w-3" />
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredItems.length > 0 ? (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                Showing {filteredItems.length} item{filteredItems.length !== 1 && 's'}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item) => (
                  <BiryaniCard key={item.id} item={item} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 text-6xl">🍚</div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">No biryanis found</h3>
              <p className="mb-4 text-muted-foreground">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
