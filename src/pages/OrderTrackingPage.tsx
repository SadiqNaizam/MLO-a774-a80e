import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrderTrackerMap from '@/components/OrderTrackerMap'; // Custom component
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ChefHat, Bike, PackageCheck, MapPin, Clock, Phone, Home as HomeIcon } from 'lucide-react';

// Placeholder for Header component (if not globally available)
const SiteHeader: React.FC = () => {
  console.log('SiteHeader for OrderTrackingPage loaded');
  return (
    <header className="bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          FoodApp
        </Link>
        <nav className="space-x-4">
          <Link to="/restaurant-listing" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Restaurants</Link>
          <Link to="/cart" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Cart</Link>
          <Link to="/user-profile" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary">Profile</Link>
        </nav>
      </div>
    </header>
  );
};

// Placeholder for Footer component (if not globally available)
const SiteFooter: React.FC = () => {
  console.log('SiteFooter for OrderTrackingPage loaded');
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 text-center text-gray-600 dark:text-gray-400 mt-auto">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} FoodApp. All rights reserved.</p>
        <p className="text-sm">Delivering happiness, one meal at a time.</p>
      </div>
    </footer>
  );
};

interface Step {
  name: string;
  icon: React.ElementType;
}

const orderSteps: Step[] = [
  { name: "Order Confirmed", icon: CheckCircle2 },
  { name: "Preparing Food", icon: ChefHat },
  { name: "Out for Delivery", icon: Bike },
  { name: "Delivered", icon: PackageCheck },
];

// Mock location data for OrderTrackerMap
const mockRestaurantLocation = { lat: 20, lng: 20, name: "Pizza Palace" }; // Example: Top-leftish
const mockCustomerAddress = { lat: 80, lng: 80, name: "Your Home" };    // Example: Bottom-rightish
const initialRiderLocation = { lat: 25, lng: 25 }; // Starts near restaurant

const OrderTrackingPage: React.FC = () => {
  console.log('OrderTrackingPage loaded');
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState("25-35 minutes");
  const [riderLocation, setRiderLocation] = useState(initialRiderLocation);

  useEffect(() => {
    // Simulate order progress
    const timers: NodeJS.Timeout[] = [];
    if (currentStep < orderSteps.length - 1) {
      const timer1 = setTimeout(() => {
        setCurrentStep(prev => Math.min(prev + 1, orderSteps.length - 1));
        if (currentStep === 0) setEstimatedTime("20-30 minutes"); // Preparing
        if (currentStep === 1) { // Out for delivery
            setEstimatedTime("15-20 minutes");
            // Simulate rider moving towards customer
            setRiderLocation({ lat: 50, lng: 50 }); // Mid-point
        }
      }, 5000); // Advance step every 5 seconds

      if (currentStep === 2) { // If "Out for Delivery"
        const timer2 = setTimeout(() => {
             setCurrentStep(prev => Math.min(prev + 1, orderSteps.length - 1)); // Delivered
             setEstimatedTime("Arrived");
             setRiderLocation({ lat: mockCustomerAddress.lat - 5, lng: mockCustomerAddress.lng - 5 }); // Near customer
        }, 5000); // Delivered after another 5 seconds
        timers.push(timer2);
      }
      timers.push(timer1);
    }
    return () => timers.forEach(clearTimeout);
  }, [currentStep]);

  const progressPercentage = (currentStep / (orderSteps.length -1)) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <SiteHeader />

      <main className="flex-1 container mx-auto p-4 md:p-6 space-y-8">
        <section aria-labelledby="order-tracking-title">
          <h1 id="order-tracking-title" className="text-3xl font-bold text-center mb-2">Track Your Order</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Order ID: #FD123456789</p>
        </section>

        {/* Live Order Status Stepper */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <MapPin className="mr-2 h-6 w-6 text-primary" />
              Live Order Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              {orderSteps.map((step, index) => (
                <div key={step.name} className={`flex flex-col items-center text-center w-1/${orderSteps.length}`}>
                  <div
                    className={`p-3 rounded-full mb-2 transition-all duration-300
                      ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <p className={`text-xs sm:text-sm font-medium ${index <= currentStep ? 'text-primary' : 'text-gray-500 dark:text-gray-400'}`}>
                    {step.name}
                  </p>
                </div>
              ))}
            </div>
            <Progress value={progressPercentage} className="w-full h-2" />
            <div className="text-center mt-4">
              <p className="text-lg font-semibold">
                Estimated Arrival: <span className="text-primary">{estimatedTime}</span>
              </p>
              {currentStep === orderSteps.length - 1 && (
                <p className="text-green-600 dark:text-green-400 font-medium mt-1">Your order has been delivered. Enjoy!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Tracker Map */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Bike className="mr-2 h-6 w-6 text-primary" />
              Delivery Route
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTrackerMap
              restaurantLocation={mockRestaurantLocation}
              customerAddress={mockCustomerAddress}
              riderLocation={riderLocation}
            />
          </CardContent>
        </Card>
        
        {/* Order Actions/Details Card */}
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    If you have any questions about your order, feel free to contact support or view your order summary.
                </p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 justify-start">
                <Button variant="outline">
                    <Phone className="mr-2 h-4 w-4" /> Contact Support
                </Button>
                 <Link to="/user-profile?section=orders"> {/* Example: Assuming user profile has an orders section */}
                    <Button variant="outline">
                        View Order Summary
                    </Button>
                </Link>
                <Link to="/" className="w-full sm:w-auto">
                    <Button className="w-full">
                        <HomeIcon className="mr-2 h-4 w-4" /> Back to Homepage
                    </Button>
                </Link>
            </CardFooter>
        </Card>

      </main>

      <SiteFooter />
    </div>
  );
};

export default OrderTrackingPage;