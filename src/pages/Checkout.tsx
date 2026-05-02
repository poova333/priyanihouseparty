import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, CreditCard, Wallet, Banknote, Check } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'login' | 'payment'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [isSignup, setIsSignup] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 500 ? 0 : 40;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI', icon: Wallet },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
      setStep('payment');
      toast.success('Logged in successfully!');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.name && signupForm.email && signupForm.phone && signupForm.password) {
      setIsLoggedIn(true);
      setStep('payment');
      toast.success('Account created successfully!');
    }
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="flex flex-col items-center justify-center py-24">
          <h1 className="mb-4 font-serif text-3xl font-bold text-foreground">No items to checkout</h1>
          <Link to="/menu">
            <Button variant="hero">Browse Menu</Button>
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
          <Link to="/cart" className="mb-6 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          {/* Steps Indicator */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2",
              step === 'login' || isLoggedIn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              {isLoggedIn ? <Check className="h-4 w-4" /> : <span>1</span>}
              <span className="font-medium">Login</span>
            </div>
            <div className="h-px w-12 bg-border" />
            <div className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2",
              step === 'payment' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <span>2</span>
              <span className="font-medium">Payment</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 'login' && !isLoggedIn ? (
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
                    {isSignup ? 'Create Account' : 'Login to Continue'}
                  </h2>

                  {isSignup ? (
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Full Name</label>
                        <input
                          type="text"
                          value={signupForm.name}
                          onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                        <input
                          type="email"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Phone Number</label>
                        <input
                          type="tel"
                          value={signupForm.phone}
                          onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Password</label>
                        <input
                          type="password"
                          value={signupForm.password}
                          onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Create a password"
                          required
                        />
                      </div>
                      <Button type="submit" variant="hero" size="lg" className="w-full">
                        Create Account
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                        <input
                          type="email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Password</label>
                        <input
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      <Button type="submit" variant="hero" size="lg" className="w-full">
                        Login
                      </Button>
                    </form>
                  )}

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setIsSignup(!isSignup)}
                      className="text-sm text-primary hover:underline"
                    >
                      {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">Payment Method</h2>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={cn(
                          "flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-all",
                          selectedPayment === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg",
                          selectedPayment === method.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          <method.icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-foreground">{method.name}</span>
                        <div className={cn(
                          "ml-auto h-5 w-5 rounded-full border-2",
                          selectedPayment === method.id
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        )}>
                          {selectedPayment === method.id && (
                            <Check className="h-full w-full p-0.5 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedPayment === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Card Number</label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-foreground">Expiry Date</label>
                          <input
                            type="text"
                            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-foreground">CVV</label>
                          <input
                            type="text"
                            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    variant="hero"
                    size="lg"
                    className="mt-6 w-full"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay ₹${total}`}
                  </Button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-card">
                <h2 className="mb-4 font-serif text-xl font-bold text-foreground">Order Summary</h2>
                
                <div className="mb-4 max-h-48 space-y-3 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-foreground">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Taxes</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="font-serif text-lg font-bold text-foreground">Total</span>
                    <span className="font-serif text-lg font-bold text-foreground">₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
