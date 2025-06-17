import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Shadcn UI
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

// Custom Components
import MenuItemCard from '@/components/MenuItemCard'; // Assuming MenuItemCard.tsx is in src/components/

// Lucide Icons
import { Star, Clock, Bike, Utensils, MessageSquare, InfoIcon as InfoIconLucide, ChevronLeft, ShoppingCart, MapPin, Phone } from 'lucide-react';

// Mock Data Interfaces
interface MenuItemOption { id: string; name: string; priceAdjustment?: number; }
interface MenuItemOptionGroup { id: string; name: string; type: 'radio' | 'checkbox'; options: MenuItemOption[]; }
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  hasOptions?: boolean;
  isAvailable?: boolean;
  options?: MenuItemOptionGroup[];
}
interface Review { id: string; userName: string; rating: number; comment: string; date: string; }
interface Restaurant {
  slug: string;
  name: string;
  logoUrl: string;
  bannerUrl: string;
  cuisineTypes: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  address: string;
  phone: string;
  openingHours: string;
  menu: MenuItem[];
  reviews: Review[];
}

// Mocked restaurant data array
const mockRestaurantsData: Restaurant[] = [
  {
    slug: 'pizza-palace-deluxe',
    name: 'Pizza Palace Deluxe',
    logoUrl: 'https://via.placeholder.com/150/FFD700/000000?Text=PPD+Logo',
    bannerUrl: 'https://via.placeholder.com/1200x400/FFA500/FFFFFF?Text=Delicious+Pizza+Here',
    cuisineTypes: ['Italian', 'Pizza', 'Pasta', 'Calzones'],
    rating: 4.5,
    reviewCount: 120,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    address: '123 Pizza St, Foodville, TX 75001',
    phone: '(555) 123-4567',
    openingHours: 'Mon-Sun: 11:00 AM - 10:00 PM',
    menu: [
      { id: 'm1', name: 'Margherita Pizza', description: 'Classic delight with 100% real mozzarella cheese and fresh basil.', price: 12.99, imageUrl: 'https://via.placeholder.com/400x225/FF6347/FFFFFF?Text=Margherita', category: 'Pizzas', hasOptions: true, isAvailable: true, options: [{ id: 'g1', name: 'Crust Type', type: 'radio', options: [{id: 'o1', name: 'Thin Crust'}, {id: 'o2', name: 'Thick Crust', priceAdjustment: 1.00}]}, { id: 'g1b', name: 'Toppings', type: 'checkbox', options: [{id: 'o1b', name: 'Extra Basil', priceAdjustment: 0.50}]}]},
      { id: 'm2', name: 'Pepperoni Passion Pizza', description: 'Loaded with spicy pepperoni, mozzarella, and a tangy tomato sauce.', price: 14.99, imageUrl: 'https://via.placeholder.com/400x225/DC143C/FFFFFF?Text=Pepperoni', category: 'Pizzas', hasOptions: true, isAvailable: true, options: [{ id: 'g2', name: 'Extra Cheese', type: 'checkbox', options: [{id: 'o3', name: 'Add Extra Cheese', priceAdjustment: 2.00}]}]},
      { id: 'm3', name: 'Spaghetti Bolognese', description: 'A hearty portion of spaghetti topped with our signature rich meat sauce.', price: 10.50, imageUrl: 'https://via.placeholder.com/400x225/8B4513/FFFFFF?Text=Spaghetti', category: 'Pastas', isAvailable: true },
      { id: 'm4', name: 'Caesar Salad', description: 'Crisp romaine lettuce, house-made croutons, parmesan shavings, and Caesar dressing.', price: 7.00, imageUrl: 'https://via.placeholder.com/400x225/90EE90/000000?Text=Salad', category: 'Salads', hasOptions: false, isAvailable: true },
      { id: 'm5', name: 'Garlic Bread Sticks', description: 'Warm and toasty bread sticks, brushed with garlic butter and sprinkled with parmesan.', price: 4.50, imageUrl: 'https://via.placeholder.com/400x225/F5DEB3/000000?Text=Garlic+Bread', category: 'Sides', isAvailable: false },
      { id: 'm6', name: 'Coca-Cola (Can)', description: '330ml can of chilled Coca-Cola.', price: 2.00, imageUrl: 'https://via.placeholder.com/400x225/A52A2A/FFFFFF?Text=Coke', category: 'Drinks', isAvailable: true },
    ],
    reviews: [
      { id: 'r1', userName: 'Jane D.', rating: 5, comment: 'Best pizza in town! Fast delivery too, and the Margherita was divine.', date: '2024-07-15' },
      { id: 'r2', userName: 'John S.', rating: 4, comment: 'Good food, reasonable prices. The Spaghetti Bolognese was very authentic.', date: '2024-07-10' },
    ],
  },
  {
    slug: 'sushi-central-station',
    name: 'Sushi Central Station',
    logoUrl: 'https://via.placeholder.com/150/4682B4/FFFFFF?Text=SCS+Logo',
    bannerUrl: 'https://via.placeholder.com/1200x400/20B2AA/FFFFFF?Text=Fresh+Quality+Sushi',
    cuisineTypes: ['Japanese', 'Sushi', 'Seafood'],
    rating: 4.8,
    reviewCount: 250,
    deliveryTime: '30-45 min',
    deliveryFee: 3.50,
    address: '456 Fish Ln, Foodville, TX 75002',
    phone: '(555) 987-6543',
    openingHours: 'Tue-Sun: 12:00 PM - 9:00 PM (Closed Mondays)',
    menu: [
      { id: 's1', name: 'Salmon Nigiri (2pcs)', description: 'Two pieces of fresh, high-quality salmon served over expertly seasoned sushi rice.', price: 5.00, imageUrl: 'https://via.placeholder.com/400x225/FA8072/000000?Text=Nigiri', category: 'Nigiri & Sashimi', isAvailable: true },
      { id: 's2', name: 'California Roll (8pcs)', description: 'Classic roll with crab meat, creamy avocado, and crisp cucumber, wrapped in seaweed and rice.', price: 8.50, imageUrl: 'https://via.placeholder.com/400x225/98FB98/000000?Text=Roll', category: 'Rolls', hasOptions: true, options: [{id: 'g3', name: 'Add-ons', type:'checkbox', options: [{id:'o4', name: 'Add Masago (Fish Roe)', priceAdjustment: 1.00}, {id:'o5', name: 'Spicy Mayo Drizzle', priceAdjustment: 0.75}]}]},
      { id: 's3', name: 'Miso Soup', description: 'Traditional Japanese soup with dashi broth, soft tofu, wakame seaweed, and green onions.', price: 3.00, imageUrl: 'https://via.placeholder.com/400x225/FFE4B5/000000?Text=Miso', category: 'Soups & Sides', isAvailable: true },
      { id: 's4', name: 'Edamame', description: 'Steamed young soybeans, lightly salted. A healthy and delicious starter.', price: 4.00, imageUrl: 'https://via.placeholder.com/400x225/32CD32/000000?Text=Edamame', category: 'Soups & Sides', isAvailable: true },
    ],
    reviews: [
      { id: 'sr1', userName: 'Kenji M.', rating: 5, comment: 'Incredibly fresh sushi! The salmon just melts in your mouth. Best I have had outside of Japan.', date: '2024-07-20' },
      { id: 'sr2', userName: 'Alice W.', rating: 4, comment: 'The California roll was excellent, and delivery was quick. Will order again!', date: '2024-07-18' },
    ],
  }
];


const RestaurantDetailPage = () => {
  console.log('RestaurantDetailPage loaded');
  const [searchParams] = useSearchParams();
  const restaurantSlug = searchParams.get('slug');

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] = useState(false);
  const [currentItemToCustomize, setCurrentItemToCustomize] = useState<MenuItem | null>(null);

  useEffect(() => {
    if (restaurantSlug) {
      const foundRestaurant = mockRestaurantsData.find(r => r.slug === restaurantSlug);
      setRestaurant(foundRestaurant || mockRestaurantsData[0]); // Fallback to the first mock if not found or no slug
    } else {
        setRestaurant(mockRestaurantsData[0]); // Default if no slug
    }
  }, [restaurantSlug]);

  const handleAddToCart = (itemId: string) => {
    const item = restaurant?.menu.find(m => m.id === itemId);
    console.log('Add to cart:', itemId, item?.name);
    toast.success(`${item?.name || 'Item'} added to cart!`);
  };

  const handleCustomize = (itemId: string) => {
    const item = restaurant?.menu.find(m => m.id === itemId);
    if (item) {
      setCurrentItemToCustomize(item);
      setIsCustomizationDialogOpen(true);
    }
  };

  const handleDialogAddToCart = () => {
    if (currentItemToCustomize) {
      // Here you would typically gather selected options from state
      console.log('Add customized item to cart:', currentItemToCustomize.name /*, with selected options */);
      toast.success(`${currentItemToCustomize.name} (customized) added to cart!`);
      setIsCustomizationDialogOpen(false);
      setCurrentItemToCustomize(null);
    }
  };

  if (!restaurant) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading restaurant details...</div>;
  }

  const menuCategories = restaurant.menu.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Page Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-700">
        <div className="container mx-auto px-4 h-16 flex justify-between items-center">
          <Button variant="outline" size="icon" asChild className="dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
            <Link to="/restaurant-listing" aria-label="Back to restaurants">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold truncate hidden sm:block">
            {restaurant.name}
          </h1>
          <Button variant="ghost" size="icon" asChild className="dark:text-gray-300 dark:hover:bg-gray-700">
            <Link to="/cart" aria-label="View Cart">
              <ShoppingCart className="h-5 w-5" />
              {/* Future: Add cart item count badge here */}
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6">
        {/* Restaurant Banner */}
        <div className="relative h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden shadow-xl mb-6">
          <img src={restaurant.bannerUrl} alt={`${restaurant.name} banner`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>

        {/* Restaurant Info Section */}
        <section className="mb-8 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl -mt-16 md:-mt-20 lg:-mt-24 relative z-10 mx-2 sm:mx-4 md:mx-auto max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white dark:border-gray-700 shadow-lg -mt-12 sm:mr-6 mb-4 sm:mb-0 flex-shrink-0">
              <AvatarImage src={restaurant.logoUrl} alt={`${restaurant.name} logo`} />
              <AvatarFallback className="text-3xl">{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-grow pt-4 sm:pt-0">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{restaurant.name}</h2>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
                {restaurant.cuisineTypes.map(cuisine => (
                  <Badge key={cuisine} variant="secondary" className="text-sm px-2.5 py-1 dark:bg-gray-700 dark:text-gray-200">{cuisine}</Badge>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-semibold">{restaurant.rating.toFixed(1)}</span>
                  <span className="ml-1">({restaurant.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center">
                  <Bike className="w-4 h-4 mr-1" />
                  <span>{restaurant.deliveryFee === 0 ? 'Free Delivery' : `$${restaurant.deliveryFee.toFixed(2)}`}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs for Menu, Reviews, Info */}
        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 sticky top-16 z-40 bg-gray-100 dark:bg-gray-800/80 backdrop-blur-sm p-1 rounded-lg shadow-md">
            <TabsTrigger value="menu" className="flex items-center justify-center gap-2 py-2.5 text-sm sm:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary"><Utensils className="h-4 w-4 sm:h-5 sm:w-5"/> Menu</TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center justify-center gap-2 py-2.5 text-sm sm:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary"><MessageSquare className="h-4 w-4 sm:h-5 sm:w-5"/> Reviews</TabsTrigger>
            <TabsTrigger value="info" className="flex items-center justify-center gap-2 py-2.5 text-sm sm:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground dark:data-[state=active]:bg-primary"><InfoIconLucide className="h-4 w-4 sm:h-5 sm:w-5"/> Info</TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <ScrollArea className="h-[auto] max-h-[calc(100vh-300px)] sm:max-h-[calc(100vh-350px)] pr-1">
              {Object.entries(menuCategories).length > 0 ? Object.entries(menuCategories).map(([category, items]) => (
                <section key={category} className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 border-b dark:border-gray-700 pb-2">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {items.map(item => (
                      <MenuItemCard
                        key={item.id}
                        {...item}
                        onAddToCart={handleAddToCart}
                        onCustomize={handleCustomize}
                      />
                    ))}
                  </div>
                </section>
              )) : <p className="text-center text-gray-500 dark:text-gray-400 py-10 text-lg">No menu items available at the moment.</p>}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {restaurant.reviews.length > 0 ? restaurant.reviews.map(review => (
                  <div key={review.id} className="p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold">{review.userName}</h4>
                      <div className="flex items-center flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{new Date(review.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                  </div>
                )) : <p className="text-center text-gray-500 dark:text-gray-400 py-10 text-lg">No reviews yet for this restaurant.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
             <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Restaurant Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm sm:text-base">
                <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-primary"/>
                    <div>
                        <h4 className="font-semibold">Address</h4>
                        <p>{restaurant.address}</p>
                    </div>
                </div>
                 <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-primary"/>
                    <div>
                        <h4 className="font-semibold">Phone</h4>
                        <p><a href={`tel:${restaurant.phone}`} className="hover:underline">{restaurant.phone}</a></p>
                    </div>
                </div>
                <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-primary"/>
                    <div>
                        <h4 className="font-semibold">Opening Hours</h4>
                        <p className="whitespace-pre-line">{restaurant.openingHours}</p>
                    </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Item Customization Dialog */}
      {currentItemToCustomize && (
        <Dialog open={isCustomizationDialogOpen} onOpenChange={setIsCustomizationDialogOpen}>
          <DialogContent className="sm:max-w-md md:max-w-lg dark:bg-gray-800 dark:text-gray-100 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">Customize: {currentItemToCustomize.name}</DialogTitle>
              <DialogDescription className="text-sm dark:text-gray-400">
                {currentItemToCustomize.description}. Make your selections below.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] p-0.5">
                <div className="py-4 space-y-4 pr-3">
                {currentItemToCustomize.options?.map(group => (
                    <div key={group.id} className="space-y-3 border dark:border-gray-700 p-3 rounded-md">
                    <Label className="text-base font-medium">{group.name}</Label>
                    {group.type === 'radio' && (
                        <RadioGroup defaultValue={group.options[0]?.id} className="space-y-1">
                        {group.options.map(option => (
                            <div key={option.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.id} id={`${group.id}-${option.id}`} />
                            <Label htmlFor={`${group.id}-${option.id}`} className="font-normal dark:text-gray-300">
                                {option.name} {option.priceAdjustment ? `(+$${option.priceAdjustment.toFixed(2)})` : ''}
                            </Label>
                            </div>
                        ))}
                        </RadioGroup>
                    )}
                    {group.type === 'checkbox' && (
                        group.options.map(option => (
                            <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox id={`${group.id}-${option.id}`} />
                            <Label htmlFor={`${group.id}-${option.id}`} className="font-normal dark:text-gray-300">
                                {option.name} {option.priceAdjustment ? `(+$${option.priceAdjustment.toFixed(2)})` : ''}
                            </Label>
                            </div>
                        ))
                    )}
                    </div>
                ))}
                {(!currentItemToCustomize.options || currentItemToCustomize.options.length === 0) && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No customization options available for this item.</p>
                )}
                </div>
            </ScrollArea>
            <DialogFooter className="sm:justify-between items-center pt-4 border-t dark:border-gray-700">
                <p className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 mr-auto mb-2 sm:mb-0">
                    Item Price: ${currentItemToCustomize.price.toFixed(2)} {/* Price should update with options in real app */}
                </p>
                <div className="flex space-x-2 w-full sm:w-auto">
                    <Button type="button" variant="outline" onClick={() => setIsCustomizationDialogOpen(false)} className="w-1/2 sm:w-auto dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">Cancel</Button>
                    <Button type="button" onClick={handleDialogAddToCart} className="w-1/2 sm:w-auto">Add to Cart</Button>
                </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Page Footer */}
      <footer className="mt-12 py-8 bg-gray-100 dark:bg-gray-900 border-t dark:border-gray-700/50">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} FoodApp Inc. All rights reserved.</p>
          <p>Your favorite meals, delivered with care.</p>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantDetailPage;