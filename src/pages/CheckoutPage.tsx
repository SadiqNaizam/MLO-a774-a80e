import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast'; // Or use Sonner if preferred

import { Home, CreditCard, ShoppingCart, ChevronLeft, PackageCheck } from 'lucide-react';

// Define Zod schemas for validation
const addressSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  street: z.string().min(5, { message: "Street address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  postalCode: z.string().min(4, { message: "Postal code is required." }),
  country: z.string().min(2, { message: "Country is required." }),
  phoneNumber: z.string().min(7, { message: "A valid phone number is required." }).optional(),
});

const paymentSchema = z.object({
  paymentMethod: z.enum(['creditCard', 'paypal', 'googlePay'], {
    required_error: "You need to select a payment type.",
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVC: z.string().optional(),
});

// Combine schemas if needed or handle them in separate forms/steps
// For this example, we'll use one form object but validate sections conceptually
const checkoutFormSchema = addressSchema.merge(paymentSchema);

// Mock order summary data
const mockOrderItems = [
  { id: '1', name: 'Margherita Pizza', quantity: 1, price: 15.99 },
  { id: '2', name: 'Coke Zero', quantity: 2, price: 2.50 },
  { id: '3', name: 'Garlic Knots', quantity: 1, price: 6.00 },
];
const subtotal = mockOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const deliveryFee = 3.50;
const taxRate = 0.08; // 8%
const taxAmount = subtotal * taxRate;
const totalAmount = subtotal + deliveryFee + taxAmount;


const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      phoneNumber: '',
      paymentMethod: undefined, // 'creditCard'
      cardNumber: '',
      cardExpiry: '',
      cardCVC: '',
    },
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | undefined>(undefined);

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log('Checkout form submitted:', values);
    // Here you would typically send data to your backend
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed. Redirecting to tracking...",
      action: <PackageCheck className="h-5 w-5 text-green-500" />,
    });
    // Simulate API call and redirect
    setTimeout(() => {
      navigate('/order-tracking'); // Path from App.tsx
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Conceptual Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary dark:text-sky-400">
            FoodFleet
          </Link>
          <Button variant="ghost" asChild>
            <Link to="/cart">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-8 text-center">
          Checkout
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Address & Payment */}
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery Address Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Home className="mr-2 h-6 w-6 text-primary" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, Apt 4B" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Anytown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USA">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormDescription>For delivery updates.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Payment Method Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <CreditCard className="mr-2 h-6 w-6 text-primary" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Select Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedPaymentMethod(value);
                            }}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="creditCard" />
                              </FormControl>
                              <FormLabel className="font-normal">Credit Card</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="paypal" />
                              </FormControl>
                              <FormLabel className="font-normal">PayPal</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="googlePay" />
                              </FormControl>
                              <FormLabel className="font-normal">Google Pay</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedPaymentMethod === 'creditCard' && (
                    <div className="space-y-4 pt-4 border-t mt-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="•••• •••• •••• ••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cardCVC"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC/CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="•••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  {selectedPaymentMethod === 'paypal' && (
                     <div className="pt-4 border-t mt-4 text-sm text-gray-600 dark:text-gray-400">
                        You will be redirected to PayPal to complete your payment.
                     </div>
                  )}
                  {selectedPaymentMethod === 'googlePay' && (
                     <div className="pt-4 border-t mt-4 text-sm text-gray-600 dark:text-gray-400">
                        Complete your payment using Google Pay.
                     </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24"> {/* Sticky for long forms */}
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <ShoppingCart className="mr-2 h-6 w-6 text-primary" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockOrderItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" size="lg">
                    Place Order (${totalAmount.toFixed(2)})
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </main>

      {/* Conceptual Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} FoodFleet. All rights reserved. Secure Checkout.
        </div>
      </footer>
    </div>
  );
};

export default CheckoutPage;