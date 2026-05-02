import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  User, MapPin, CreditCard, LogOut, 
  Edit2, Plus, Trash2, Check, Phone, Mail, Camera
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Account = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payments'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 9876543210',
  });

  const [addresses, setAddresses] = useState([
    { id: '1', type: 'Home', address: '123, MG Road, Indiranagar, Bangalore - 560038', isDefault: true },
    { id: '2', type: 'Work', address: '456, Tech Park, Whitefield, Bangalore - 560066', isDefault: false },
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', type: 'card', last4: '4242', brand: 'Visa', isDefault: true },
    { id: '2', type: 'upi', upiId: 'rahul@okicici', isDefault: false },
  ]);

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="mb-8 font-serif text-3xl font-bold text-foreground">My Account</h1>

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-border bg-card p-4 shadow-soft">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-serif text-xl font-bold text-foreground">Profile Information</h2>
                    {!isEditing && (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    )}
                  </div>

                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {isEditing && (
                        <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md">
                          <Camera className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">Member since 2024</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground disabled:bg-muted disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          disabled={!isEditing}
                          className="w-full rounded-lg border border-border bg-background py-3 pl-12 pr-4 text-foreground disabled:bg-muted disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          disabled={!isEditing}
                          className="w-full rounded-lg border border-border bg-background py-3 pl-12 pr-4 text-foreground disabled:bg-muted disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex gap-3">
                      <Button variant="hero" onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-serif text-xl font-bold text-foreground">Saved Addresses</h2>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={cn(
                          "rounded-lg border p-4",
                          address.isDefault ? "border-primary bg-primary/5" : "border-border"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg",
                              address.isDefault ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                              <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">{address.type}</span>
                                {address.isDefault && (
                                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">{address.address}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-serif text-xl font-bold text-foreground">Payment Methods</h2>
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={cn(
                          "rounded-lg border p-4",
                          method.isDefault ? "border-primary bg-primary/5" : "border-border"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "flex h-10 w-10 items-center justify-center rounded-lg",
                              method.isDefault ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            )}>
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                  {method.type === 'card' ? `${method.brand} •••• ${method.last4}` : method.upiId}
                                </span>
                                {method.isDefault && (
                                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground capitalize">{method.type}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
