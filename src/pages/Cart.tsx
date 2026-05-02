import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 500 ? 0 : 40;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex flex-col items-center justify-center py-24">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="mb-2 font-serif text-3xl font-bold text-foreground">Your cart is empty</h1>
          <p className="mb-6 text-muted-foreground">Add some delicious biryanis to get started!</p>
          <Link to="/menu">
            <Button variant="hero" size="lg">
              Browse Menu
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">Your Cart</h1>
              <p className="text-muted-foreground">{cartItems.length} item{cartItems.length !== 1 && 's'}</p>
            </div>
            <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive">
              Clear Cart
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-soft"
                  >
                    <Link to={`/menu/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover sm:h-32 sm:w-32"
                      />
                    </Link>
                    
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link to={`/menu/${item.id}`}>
                          <h3 className="font-serif text-lg font-semibold text-foreground hover:text-primary">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-lg bg-muted p-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className="font-serif text-lg font-bold text-foreground">
                            ₹{item.price * item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/menu" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card">
                <h2 className="mb-6 font-serif text-xl font-bold text-foreground">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Free delivery on orders above ₹500
                    </p>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Taxes (5%)</span>
                    <span>₹{taxes}</span>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="font-serif text-xl font-bold text-foreground">Total</span>
                      <span className="font-serif text-xl font-bold text-foreground">₹{total}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="mt-6 block">
                  <Button variant="hero" size="lg" className="w-full gap-2">
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Secure payment powered by trusted gateways
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
