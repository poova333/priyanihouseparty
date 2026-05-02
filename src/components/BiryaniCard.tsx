import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/types/menu';
import { useCart } from '@/context/CartContext';
import { Star, Plus, Minus, Flame, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BiryaniCardProps {
  item: MenuItem;
}

const spiceLevelColors = {
  mild: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hot: 'bg-orange-100 text-orange-700',
  'extra-hot': 'bg-red-100 text-red-700',
};

export const BiryaniCard = ({ item }: BiryaniCardProps) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
    setTimeout(() => setIsAdding(false), 300);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(item.id, quantity - 1);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:shadow-card">
      {/* Image Container */}
      <Link to={`/menu/${item.id}`} className="block overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {item.isBestSeller && (
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Best Seller
              </span>
            )}
            {item.isNew && (
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                New
              </span>
            )}
          </div>

          {/* Veg/Non-veg indicator */}
          <div className="absolute right-3 top-3">
            <div className={cn(
              "flex h-6 w-6 items-center justify-center rounded border-2",
              item.isVeg ? "border-green-600" : "border-red-600"
            )}>
              <div className={cn(
                "h-3 w-3 rounded-full",
                item.isVeg ? "bg-green-600" : "bg-red-600"
              )} />
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium text-foreground">{item.rating}</span>
            <span className="text-muted-foreground">({item.reviews})</span>
          </div>
          <span className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            spiceLevelColors[item.spiceLevel]
          )}>
            <Flame className="h-3 w-3" />
            {item.spiceLevel}
          </span>
        </div>

        <Link to={`/menu/${item.id}`}>
          <h3 className="mb-1 font-serif text-lg font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
            {item.name}
          </h3>
        </Link>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {/* Price and Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold text-foreground">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>
            )}
          </div>

          {quantity > 0 ? (
            <div className="flex items-center gap-2 rounded-full bg-primary/10 p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleDecrement}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-6 text-center font-semibold text-foreground">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleIncrement}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              size="sm"
              className={cn("gap-1", isAdding && "scale-95")}
              onClick={handleAddToCart}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
