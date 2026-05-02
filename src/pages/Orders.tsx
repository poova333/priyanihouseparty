import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle, MapPin, ChefHat, Truck, Home, RefreshCw, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: '2024-12-09',
    status: 'preparing',
    items: [
      { name: 'Hyderabadi Chicken Dum Biryani', quantity: 2, price: 299 },
      { name: 'Royal Mutton Biryani', quantity: 1, price: 399 },
    ],
    total: 997,
    estimatedDelivery: '30-40 mins',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-12-08',
    status: 'delivered',
    items: [
      { name: 'Paneer Tikka Biryani', quantity: 1, price: 249 },
    ],
    total: 289,
    deliveredAt: '12:45 PM',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-12-05',
    status: 'delivered',
    items: [
      { name: 'Nizami Biryani Special', quantity: 1, price: 549 },
      { name: 'Hyderabadi Kacchi Biryani', quantity: 2, price: 449 },
    ],
    total: 1447,
    deliveredAt: '7:30 PM',
  },
];

const statusConfig = {
  preparing: { label: 'Preparing', color: 'bg-yellow-100 text-yellow-700', icon: ChefHat },
  'out-for-delivery': { label: 'Out for Delivery', color: 'bg-blue-100 text-blue-700', icon: Truck },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700', icon: X },
};

const trackingSteps = [
  { id: 1, label: 'Order Placed', icon: Package, completed: true },
  { id: 2, label: 'Preparing', icon: ChefHat, completed: true },
  { id: 3, label: 'Out for Delivery', icon: Truck, completed: false },
  { id: 4, label: 'Delivered', icon: Home, completed: false },
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [selectedOrder, setSelectedOrder] = useState<string | null>('ORD-2024-001');

  const activeOrders = mockOrders.filter((o) => o.status === 'preparing' || o.status === 'out-for-delivery');
  const orderHistory = mockOrders.filter((o) => o.status === 'delivered' || o.status === 'cancelled');

  const currentOrder = mockOrders.find((o) => o.id === selectedOrder);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="mb-8 font-serif text-3xl font-bold text-foreground">My Orders</h1>

          {/* Tabs */}
          <div className="mb-8 flex gap-4 border-b border-border">
            <button
              onClick={() => setActiveTab('active')}
              className={cn(
                "pb-4 text-sm font-medium transition-colors",
                activeTab === 'active'
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Active Orders ({activeOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                "pb-4 text-sm font-medium transition-colors",
                activeTab === 'history'
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Order History ({orderHistory.length})
            </button>
          </div>

          {activeTab === 'active' && activeOrders.length > 0 && (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Live Tracking */}
              {currentOrder && currentOrder.status === 'preparing' && (
                <div className="rounded-xl border border-border bg-card p-6 shadow-card lg:col-span-2">
                  <h2 className="mb-6 font-serif text-xl font-bold text-foreground">Live Order Tracking</h2>
                  
                  <div className="mb-6 flex items-center justify-between rounded-lg bg-primary/10 p-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">
                        Estimated Delivery: {currentOrder.estimatedDelivery}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">Order #{currentOrder.id}</span>
                  </div>

                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-6 top-0 h-full w-0.5 bg-border" />
                    <div className="absolute left-6 top-0 h-1/4 w-0.5 bg-primary transition-all duration-500" />

                    {/* Steps */}
                    <div className="space-y-6">
                      {trackingSteps.map((step, index) => (
                        <div key={step.id} className="relative flex items-center gap-4">
                          <div className={cn(
                            "relative z-10 flex h-12 w-12 items-center justify-center rounded-full",
                            step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          )}>
                            <step.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className={cn(
                              "font-medium",
                              step.completed ? "text-foreground" : "text-muted-foreground"
                            )}>
                              {step.label}
                            </p>
                            {step.completed && <p className="text-xs text-muted-foreground">Completed</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Order List */}
              <div className="space-y-4 lg:col-span-2">
                {activeOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    isSelected={selectedOrder === order.id}
                    onSelect={() => setSelectedOrder(order.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'active' && activeOrders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Package className="mb-4 h-16 w-16 text-muted-foreground" />
              <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">No active orders</h3>
              <p className="mb-4 text-muted-foreground">Your delicious biryani is just a click away!</p>
              <Link to="/menu">
                <Button variant="hero">Order Now</Button>
              </Link>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <OrderCard key={order.id} order={order} showReorder />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface OrderCardProps {
  order: typeof mockOrders[0];
  isSelected?: boolean;
  onSelect?: () => void;
  showReorder?: boolean;
}

const OrderCard = ({ order, isSelected, onSelect, showReorder }: OrderCardProps) => {
  const status = statusConfig[order.status as keyof typeof statusConfig];
  const StatusIcon = status.icon;

  return (
    <div
      onClick={onSelect}
      className={cn(
        "rounded-xl border bg-card p-4 shadow-soft transition-all",
        isSelected ? "border-primary" : "border-border",
        onSelect && "cursor-pointer hover:border-primary/50"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-medium text-foreground">{order.id}</span>
            <span className={cn("flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium", status.color)}>
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{order.date}</p>
        </div>

        <div className="text-right">
          <p className="font-serif text-lg font-bold text-foreground">₹{order.total}</p>
          <p className="text-sm text-muted-foreground">{order.items.length} item(s)</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
            <span className="text-foreground">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      {showReorder && (
        <div className="mt-4 flex gap-3">
          <Button variant="outline" size="sm" className="flex-1 gap-2">
            <RefreshCw className="h-4 w-4" />
            Reorder
          </Button>
          <Link to={`/orders/${order.id}`} className="flex-1">
            <Button variant="ghost" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
