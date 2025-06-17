import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import CuisineFilterChip from '@/components/CuisineFilterChip';
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// lucide-react Icons
import { MapPin, User, ShoppingCart, Search, Utensils, Tag, Star } from 'lucide-react';

// Placeholder Data Types
interface Cuisine {
  id: string;
  name: string;
  icon?: React.ElementType;
}

interface Restaurant {
  id: string;
  slug: string;
  name: string;
  imageUrl: string;
  cuisineTags: string[];
  rating: number;
  reviewCount?: number;
  deliveryTime: string;
  deliveryFee: number;
}

interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string; // e.g. to a specific restaurant or a filtered list
}

// Sample Data
const sampleCuisines: Cuisine[] = [
  { id: '1', name: 'Pizza', icon: Utensils },
  { id: '2', name: 'Burgers', icon: Utensils },
  { id: '3', name: 'Italian', icon: Utensils },
  { id: '4', name: 'Chinese', icon: Utensils },
  { id: '5', name: 'Mexican', icon: Utensils },
  { id: '6', name: 'Sushi', icon: Utensils },
];

const sampleRestaurants: Restaurant[] = [
  { id: 'r1', slug: 'pizza-paradise', name: 'Pizza Paradise', imageUrl: 'https://via.placeholder.com/400x225?text=Pizza+Paradise', cuisineTags: ['Italian', 'Pizza'], rating: 4.5, reviewCount: 150, deliveryTime: '25-35 min', deliveryFee: 2.99 },
  { id: 'r2', slug: 'burger-joint', name: 'Burger Joint', imageUrl: 'https://via.placeholder.com/400x225?text=Burger+Joint', cuisineTags: ['American', 'Burgers'], rating: 4.2, reviewCount: 200, deliveryTime: '20-30 min', deliveryFee: 0 },
  { id: 'r3', slug: 'sushi-central', name: 'Sushi Central', imageUrl: 'https://via.placeholder.com/400x225?text=Sushi+Central', cuisineTags: ['Japanese', 'Sushi'], rating: 4.8, reviewCount: 120, deliveryTime: '30-40 min', deliveryFee: 3.50 },
  { id: 'r4', slug: 'taco-fiesta', name: 'Taco Fiesta', imageUrl: 'https://via.placeholder.com/400x225?text=Taco+Fiesta', cuisineTags: ['Mexican'], rating: 4.3, reviewCount: 90, deliveryTime: '20-30 min', deliveryFee: 1.99 },
  { id: 'r5', slug: 'pasta-place', name: 'The Pasta Place', imageUrl: 'https://via.placeholder.com/400x225?text=Pasta+Place', cuisineTags: ['Italian', 'Pasta'], rating: 4.6, reviewCount: 180, deliveryTime: '35-45 min', deliveryFee: 0 },
  { id: 'r6', slug: 'golden-wok', name: 'Golden Wok', imageUrl: 'https://via.placeholder.com/400x225?text=Golden+Wok', cuisineTags: ['Chinese', 'Asian'], rating: 4.1, reviewCount: 220, deliveryTime: '25-35 min', deliveryFee: 2.00 },
];

const samplePromotions: Promotion[] = [
  { id: 'p1', title: 'Weekend Feast: 20% Off', description: 'Enjoy 20% off on all orders above $30 this weekend!', imageUrl: 'https://via.placeholder.com/600x300?text=Weekend+Feast', link: '/restaurant-listing?promo=weekend20' },
  { id: 'p2', title: 'Free Delivery Fridays', description: 'Get free delivery on all orders every Friday!', imageUrl: 'https://via.placeholder.com/600x300?text=Free+Delivery', link: '/restaurant-listing?promo=freedelivery' },
  { id: 'p3', title: 'Lunch Special $9.99', description: 'Grab a quick lunch special from participating restaurants.', imageUrl: 'https://via.placeholder.com/600x300?text=Lunch+Special', link: '/restaurant-listing?category=lunch' },
];


const Homepage: React.FC = () => {
  console.log('Homepage loaded');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const handleCuisineSelect = (cuisineId: string) => {
    setSelectedCuisine(prev => (prev === cuisineId ? null : cuisineId));
    // In a real app, this would trigger a filter action
    console.log('Selected cuisine:', cuisineId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header Section */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-950/95">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center space-x-2">
            <Utensils className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-50">FoodFleet</span>
          </Link>
          
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
              <MapPin className="w-4 h-4 mr-1.5" />
              New York, NY
            </Button>
            <Link to="/user-profile">
              <Button variant="ghost" size="icon" aria-label="User Profile" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" aria-label="Cart" className="relative text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground">
                <ShoppingCart className="w-5 h-5" />
                {/* Placeholder for cart item count badge */}
                {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">3</span> */}
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Prominent Search Bar */}
        <section aria-labelledby="search-section-title" className="mb-6 sm:mb-8">
           <h1 id="search-section-title" className="sr-only">Discover Your Next Meal</h1>
           <div className="relative">
             <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
             <Input 
                type="search" 
                placeholder="Search restaurants, cuisines, or dishes..." 
                className="w-full pl-10 pr-4 py-3 h-12 text-base rounded-lg shadow-sm border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary dark:bg-gray-800" 
             />
           </div>
        </section>

        {/* Cuisine Filters Section */}
        <section aria-labelledby="cuisine-filters-title" className="mb-6 sm:mb-10">
          <h2 id="cuisine-filters-title" className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 sm:mb-4">Quick Filters</h2>
          <div className="flex flex-nowrap gap-2 pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {sampleCuisines.map((cuisine) => (
              <CuisineFilterChip
                key={cuisine.id}
                cuisineName={cuisine.name}
                isSelected={selectedCuisine === cuisine.id}
                onClick={() => handleCuisineSelect(cuisine.id)}
                className="flex-shrink-0"
              />
            ))}
          </div>
        </section>

        {/* Promotions Section (Carousel) */}
        <section aria-labelledby="promotions-title" className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 id="promotions-title" className="text-xl sm:text-2xl font-semibold tracking-tight">Today's Deals</h2>
            {/* Optional: Link to all promotions */}
          </div>
          <Carousel 
            opts={{ align: "start", loop: false }} 
            className="w-full -mx-2"
          >
            <CarouselContent className="px-2">
              {samplePromotions.map((promo) => (
                <CarouselItem key={promo.id} className="md:basis-1/2 lg:basis-1/3 pl-2 pr-2">
                  <Card className="overflow-hidden group h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg border-gray-200 dark:border-gray-700">
                    <Link to={promo.link} aria-label={promo.title} className="block h-full">
                      <AspectRatio ratio={16 / 9} className="bg-muted">
                        <img src={promo.imageUrl} alt={promo.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"/>
                      </AspectRatio>
                      <CardContent className="p-4 flex-grow">
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{promo.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{promo.description}</p>
                      </CardContent>
                    </Link>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700" />
            <CarouselNext className="hidden sm:flex absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700" />
          </Carousel>
        </section>

        {/* Featured Restaurants Section (Carousel) */}
        <section aria-labelledby="featured-restaurants-title" className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 id="featured-restaurants-title" className="text-xl sm:text-2xl font-semibold tracking-tight">Featured Restaurants</h2>
            <Link to="/restaurant-listing?filter=featured">
              <Button variant="link" className="text-primary hover:text-primary/80 px-0">View All</Button>
            </Link>
          </div>
           <Carousel 
            opts={{ align: "start", loop: false }} 
            className="w-full -mx-2"
          >
            <CarouselContent className="px-2">
              {sampleRestaurants.slice(0,4).map((restaurant) => ( // Show a few featured
                <CarouselItem key={restaurant.id} className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-2 pr-2">
                  <RestaurantCard {...restaurant} className="h-full" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700" />
            <CarouselNext className="hidden sm:flex absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700" />
          </Carousel>
        </section>
        
        {/* Popular Near You Section (Grid) */}
        <section aria-labelledby="popular-near-you-title" className="mb-6 sm:mb-10">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 id="popular-near-you-title" className="text-xl sm:text-2xl font-semibold tracking-tight">Popular Near You</h2>
            <Link to="/restaurant-listing?filter=popular">
              <Button variant="link" className="text-primary hover:text-primary/80 px-0">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sampleRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} FoodFleet. All rights reserved.</p>
          {/* Example footer links - ensure these routes exist or use # for placeholders if not part of App.tsx */}
          {/* <nav className="mt-2 space-x-4">
            <Link to="#" className="hover:text-primary">About Us</Link>
            <Link to="#" className="hover:text-primary">Contact</Link>
            <Link to="#" className="hover:text-primary">Privacy Policy</Link>
          </nav> */}
        </div>
      </footer>
    </div>
  );
};

export default Homepage;