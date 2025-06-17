import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import { User, Mail, Phone, MapPin, CreditCard, ShoppingBag, Bell, HelpCircle, Edit2, Trash2, PlusCircle, LogOut, Settings } from 'lucide-react';

// Placeholder Data
const currentUser = {
  name: "Alice Wonderland",
  email: "alice.wonder@example.com",
  phone: "+1 (555) 123-4567",
  avatarUrl: "https://images.unsplash.com/photo-1529688499550-80b95435e235?q=80&w=200&h=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  joinedDate: "2023-01-15",
};

interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault?: boolean;
}
const savedAddressesData: Address[] = [
  { id: 'addr1', type: 'Home', street: '123 Main St, Apt 4B', city: 'Metropolis', state: 'NY', zip: '10001', isDefault: true },
  { id: 'addr2', type: 'Work', street: '456 Office Pkwy, Suite 200', city: 'Gotham City', state: 'NJ', zip: '07001' },
];

interface PaymentMethod {
  id: string;
  type: 'Visa' | 'Mastercard' | 'Amex';
  last4: string;
  expiry: string; // MM/YY
  isDefault?: boolean;
}
const paymentMethodsData: PaymentMethod[] = [
  { id: 'pay1', type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: 'pay2', type: 'Mastercard', last4: '5555', expiry: '06/26' },
];

interface Order {
  id: string;
  date: string;
  restaurantName: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Cancelled' | 'Out for Delivery';
  itemCount: number;
}
const orderHistoryData: Order[] = [
  { id: '#FD12345', date: '2024-07-20', restaurantName: 'The Great Pizza', total: 25.99, status: 'Delivered', itemCount: 2 },
  { id: '#FD12346', date: '2024-07-15', restaurantName: 'Sushi Heaven', total: 45.50, status: 'Delivered', itemCount: 3 },
  { id: '#FD12347', date: '2024-07-10', restaurantName: 'Burger Queen', total: 15.00, status: 'Cancelled', itemCount: 1 },
  { id: '#FD12348', date: '2024-07-28', restaurantName: 'Taco Temple', total: 33.20, status: 'Processing', itemCount: 4 },
  { id: '#FD12349', date: '2024-07-29', restaurantName: 'Noodle Bar', total: 18.75, status: 'Out for Delivery', itemCount: 2 },
];


const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);

  const [notificationPreferences, setNotificationPreferences] = useState({
    emailOffers: true,
    emailOrderStatus: true,
    smsOrderStatus: false,
    pushNewRestaurants: true,
  });

  const getStatusBadgeVariant = (status: Order['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Delivered':
        return 'default'; // Greenish in many themes, or use primary
      case 'Processing':
      case 'Out for Delivery':
        return 'secondary'; // Bluish/Yellowish
      case 'Cancelled':
        return 'destructive'; // Reddish
      default:
        return 'outline';
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
            FoodApp
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to="/restaurant-listing" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
              Restaurants
            </Link>
            <Link to="/cart" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
              Cart
            </Link>
            <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <Link to="/user-profile">
                    <User className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
                <Link to="/login"> {/* Assuming /login is the route for logging out or managing login status */}
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-primary">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback className="text-4xl">{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{currentUser.name}</h1>
            <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
              <Mail className="h-4 w-4 mr-2" /> {currentUser.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Joined: {currentUser.joinedDate}</p>
          </div>
        </section>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mb-6 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg shadow">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><User className="h-4 w-4 mr-2 inline-block sm:hidden md:inline-block" />Profile</TabsTrigger>
            <TabsTrigger value="addresses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><MapPin className="h-4 w-4 mr-2 inline-block sm:hidden md:inline-block" />Addresses</TabsTrigger>
            <TabsTrigger value="payment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><CreditCard className="h-4 w-4 mr-2 inline-block sm:hidden md:inline-block" />Payment</TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><ShoppingBag className="h-4 w-4 mr-2 inline-block sm:hidden md:inline-block" />Orders</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Bell className="h-4 w-4 mr-2 inline-block sm:hidden md:inline-block" />Notifications</TabsTrigger>
            <TabsTrigger value="help" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><HelpCircle className="h-4 w-4 mr-2 inline-block sm:hidden md:inline-block" />Help</TabsTrigger>
          </TabsList>

          {/* Profile Information Tab */}
          <TabsContent value="profile">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center"><Settings className="h-5 w-5 mr-2 text-primary"/>Personal Information</CardTitle>
                <CardDescription>Manage your name, email, and phone number.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center"><User className="h-4 w-4 mr-2 text-gray-500"/>Full Name</Label>
                    <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center"><Mail className="h-4 w-4 mr-2 text-gray-500"/>Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center"><Phone className="h-4 w-4 mr-2 text-gray-500"/>Phone Number</Label>
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    <Edit2 className="h-4 w-4 mr-2"/>Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delivery Addresses Tab */}
          <TabsContent value="addresses">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <CardTitle className="flex items-center"><MapPin className="h-5 w-5 mr-2 text-primary"/>Saved Addresses</CardTitle>
                    <CardDescription>Manage your delivery locations.</CardDescription>
                  </div>
                  <Button className="mt-2 sm:mt-0 w-full sm:w-auto">
                    <PlusCircle className="h-4 w-4 mr-2"/>Add New Address
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedAddressesData.length > 0 ? savedAddressesData.map(addr => (
                  <Card key={addr.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-md">{addr.type} {addr.isDefault && <Badge variant="outline" className="ml-2 border-primary text-primary">Default</Badge>}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{addr.street}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{addr.city}, {addr.state} {addr.zip}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon"><Edit2 className="h-4 w-4"/></Button>
                        <Button variant="outline" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                      </div>
                    </div>
                  </Card>
                )) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">No saved addresses yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <CardTitle className="flex items-center"><CreditCard className="h-5 w-5 mr-2 text-primary"/>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved payment options.</CardDescription>
                  </div>
                  <Button className="mt-2 sm:mt-0 w-full sm:w-auto">
                    <PlusCircle className="h-4 w-4 mr-2"/>Add New Method
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethodsData.length > 0 ? paymentMethodsData.map(method => (
                  <Card key={method.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-md">{method.type} ending in •••• {method.last4} {method.isDefault && <Badge variant="outline" className="ml-2 border-primary text-primary">Default</Badge>}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Expires: {method.expiry}</p>
                      </div>
                       <div className="flex space-x-2">
                        <Button variant="outline" size="icon"><Edit2 className="h-4 w-4"/></Button>
                        <Button variant="outline" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4"/></Button>
                      </div>
                    </div>
                  </Card>
                )) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">No saved payment methods yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center"><ShoppingBag className="h-5 w-5 mr-2 text-primary"/>Order History</CardTitle>
                <CardDescription>Review your past orders.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption className="dark:text-gray-400">A list of your recent orders.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Restaurant</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderHistoryData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.restaurantName}</TableCell>
                        <TableCell>{order.itemCount}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="link" size="sm" asChild>
                            <Link to={`/order-tracking?orderId=${order.id.substring(1)}`}>View</Link> {/* Assuming order tracking takes orderId */}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {orderHistoryData.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-8">You haven't placed any orders yet.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Preferences Tab */}
          <TabsContent value="notifications">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center"><Bell className="h-5 w-5 mr-2 text-primary"/>Notification Preferences</CardTitle>
                <CardDescription>Manage how we contact you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
                  <div>
                    <Label htmlFor="emailOffers" className="font-medium">Email Notifications for Offers & Promotions</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about new deals and special offers.</p>
                  </div>
                  <Switch
                    id="emailOffers"
                    checked={notificationPreferences.emailOffers}
                    onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, emailOffers: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
                 <div>
                    <Label htmlFor="emailOrderStatus" className="font-medium">Email Notifications for Order Status</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get updates on your order status via email.</p>
                  </div>
                  <Switch
                    id="emailOrderStatus"
                    checked={notificationPreferences.emailOrderStatus}
                    onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, emailOrderStatus: checked }))}
                  />
                </div>
                 <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
                  <div>
                    <Label htmlFor="smsOrderStatus" className="font-medium">SMS Notifications for Order Status</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive SMS updates for critical order changes.</p>
                  </div>
                  <Switch
                    id="smsOrderStatus"
                    checked={notificationPreferences.smsOrderStatus}
                    onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, smsOrderStatus: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm">
                  <div>
                    <Label htmlFor="pushNewRestaurants" className="font-medium">Push Notifications for New Restaurants</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when new restaurants are available in your area.</p>
                  </div>
                  <Switch
                    id="pushNewRestaurants"
                    checked={notificationPreferences.pushNewRestaurants}
                    onCheckedChange={(checked) => setNotificationPreferences(prev => ({ ...prev, pushNewRestaurants: checked }))}
                  />
                </div>
                 <Button type="button" className="w-full sm:w-auto mt-4">
                    <Edit2 className="h-4 w-4 mr-2"/>Update Preferences
                  </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Help & Support Tab */}
          <TabsContent value="help">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center"><HelpCircle className="h-5 w-5 mr-2 text-primary"/>Help & Support</CardTitle>
                <CardDescription>Find answers to common questions or contact us.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>How do I track my order?</li>
                    <li>What payment methods are accepted?</li>
                    <li>How can I change my delivery address?</li>
                    <li>What is the refund policy?</li>
                  </ul>
                  <Button variant="link" className="mt-2 px-0">View all FAQs</Button>
                </section>
                <section>
                  <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                  <p className="text-gray-700 dark:text-gray-300">If you need further assistance, please reach out to our support team:</p>
                  <p className="mt-1"><strong>Email:</strong> support@foodapp.example.com</p>
                  <p><strong>Phone:</strong> +1 (800) 555-FOOD</p>
                  <Button className="mt-4">
                    <Mail className="h-4 w-4 mr-2"/>Email Support
                  </Button>
                </section>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 py-8 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} FoodApp. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/about" className="hover:underline hover:text-primary">About Us</Link>
            <Link to="/contact" className="hover:underline hover:text-primary">Contact</Link>
            <Link to="/privacy" className="hover:underline hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserProfilePage;