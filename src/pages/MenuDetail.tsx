import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/data/menuData';
import { BiryaniCard } from '@/components/BiryaniCard';
import { useCart } from '@/context/CartContext';
import { Star, Flame, Plus, Minus, ArrowLeft, Clock, Users, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const spiceLevelColors = {
  mild: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hot: 'bg-orange-100 text-orange-700',
  'extra-hot': 'bg-red-100 text-red-700',
};

const MenuDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, addToCart, updateQuantity } = useCart();

  const item = menuItems.find((i) => i.id === id);
  const cartItem = cartItems.find((i) => i.id === id);
  const quantity = cartItem?.quantity || 0;

  const relatedItems = menuItems
    .filter((i) => i.category === item?.category && i.id !== item?.id)
    .slice(0, 4);

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex flex-col items-center justify-center py-24">
          <h1 className="mb-4 font-serif text-3xl font-bold">Item Not Found</h1>
          <Link to="/menu">
            <Button>Back to Menu</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <Link to="/menu" className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Link>

          {/* Product Detail */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image */}
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src={item.image}
                alt={item.name}
                className="aspect-square w-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {item.isBestSeller && (
                  <span className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                    Best Seller
                  </span>
                )}
                {item.isNew && (
                  <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground">
                    New
                  </span>
                )}
              </div>

              {/* Veg/Non-veg indicator */}
              <div className="absolute right-4 top-4">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded border-2 bg-background",
                  item.isVeg ? "border-green-600" : "border-red-600"
                )}>
                  <div className={cn(
                    "h-4 w-4 rounded-full",
                    item.isVeg ? "bg-green-600" : "bg-red-600"
                  )} />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{item.rating}</span>
                    <span className="text-muted-foreground">({item.reviews} reviews)</span>
                  </div>
                  <span className={cn(
                    "flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
                    spiceLevelColors[item.spiceLevel]
                  )}>
                    <Flame className="h-4 w-4" />
                    {item.spiceLevel}
                  </span>
                  {item.isVeg && (
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      <Leaf className="h-4 w-4" />
                      Vegetarian
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
                  {item.name}
                </h1>
              </div>

              <p className="text-lg text-muted-foreground">{item.description}</p>

              <div className="flex items-center gap-6 border-y border-border py-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>30-40 mins</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Serves 1-2</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-4xl font-bold text-foreground">₹{item.price}</span>
                {item.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">₹{item.originalPrice}</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Add to Cart */}
              <div className="flex items-center gap-4">
                {quantity > 0 ? (
                  <div className="flex items-center gap-3 rounded-xl bg-muted p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      onClick={() => updateQuantity(item.id, quantity - 1)}
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <span className="w-8 text-center text-xl font-bold text-foreground">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-lg"
                      onClick={() => updateQuantity(item.id, quantity + 1)}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <Button variant="hero" size="xl" onClick={handleAddToCart} className="flex-1 gap-2">
                    <Plus className="h-5 w-5" />
                    Add to Cart
                  </Button>
                )}
                
                {quantity > 0 && (
                  <Link to="/cart" className="flex-1">
                    <Button variant="outline" size="xl" className="w-full">
                      View Cart
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">You May Also Like</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedItems.map((relatedItem) => (
                  <BiryaniCard key={relatedItem.id} item={relatedItem} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MenuDetail;
