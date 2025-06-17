import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import RestaurantCard from '@/components/RestaurantCard';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

// Lucide Icons
import { Filter, Search as SearchIcon, ShoppingCart, User } from 'lucide-react';

// Placeholder Data
const placeholderRestaurantsData = [
  {
    id: '1',
    slug: 'pizza-paradise',
    name: 'Pizza Paradise',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    cuisineTags: ['Italian', 'Pizza', 'Fast Food'],
    rating: 4.5,
    reviewCount: 150,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
  },
  {
    id: '2',
    slug: 'sushi-central',
    name: 'Sushi Central',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    cuisineTags: ['Japanese', 'Sushi'],
    rating: 4.8,
    reviewCount: 200,
    deliveryTime: '30-40 min',
    deliveryFee: 0,
  },
  {
    id: '3',
    slug: 'burger-bliss',
    name: 'Burger Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    cuisineTags: ['American', 'Burgers', 'Fries'],
    rating: 4.2,
    reviewCount: 95,
    deliveryTime: '20-30 min',
    deliveryFee: 1.50,
  },
  {
    id: '4',
    slug: 'taco-town',
    name: 'Taco Town',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    cuisineTags: ['Mexican', 'Tacos'],
    rating: 4.6,
    reviewCount: 120,
    deliveryTime: '25-35 min',
    deliveryFee: 0,
  },
  {
    id: '5',
    slug: 'curry-corner',
    name: 'Curry Corner',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    cuisineTags: ['Indian', 'Curry'],
    rating: 4.7,
    reviewCount: 180,
    deliveryTime: '35-45 min',
    deliveryFee: 3.00,
  },
  {
    id: '6',
    slug: 'salad-spot',
    name: 'Salad Spot',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    cuisineTags: ['Healthy', 'Salads', 'Wraps'],
    rating: 4.9,
    reviewCount: 250,
    deliveryTime: '15-25 min',
    deliveryFee: 2.00,
  }
];

const cuisineFiltersOptions = [
  { id: 'italian', label: 'Italian' },
  { id: 'japanese', label: 'Japanese' },
  { id: 'american', label: 'American' },
  { id: 'mexican', label: 'Mexican' },
  { id: 'indian', label: 'Indian' },
  { id: 'healthy', label: 'Healthy' },
  { id: 'fast-food', label: 'Fast Food'},
];

const featureFiltersOptions = [
  { id: 'offers', label: 'Special Offers' },
  { id: 'free-delivery', label: 'Free Delivery' },
  { id: 'top-rated', label: 'Top Rated (4.5+)'}
];

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'rating', label: 'Rating (High to Low)' },
  { value: 'delivery_time_asc', label: 'Delivery Time (Fastest)' },
  { value: 'name_asc', label: 'Name (A-Z)' },
];

const RestaurantListingPage = () => {
  useEffect(() => {
    console.log('RestaurantListingPage loaded');
  }, []);

  // Basic state for interactivity (can be expanded)
  const [searchTerm, setSearchTerm] = useState('');
  // For a real app, these would influence the displayed restaurants
  // const [selectedSort, setSelectedSort] = useState('default'); 
  // const [activeFilters, setActiveFilters] = useState({});

  const filteredRestaurants = placeholderRestaurantsData.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisineTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-primary">
              FoodApp
            </Link>
            <div className="hidden md:flex items-center space-x-4 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search restaurants or cuisines..." 
                className="pl-10 pr-4 py-2 w-72 border rounded-md focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <nav className="flex items-center space-x-4">
              <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-primary p-2 rounded-md flex items-center">
                <ShoppingCart className="h-5 w-5 mr-1 sm:mr-2" /> 
                <span className="hidden sm:inline">Cart</span>
              </Link>
              <Link to="/user-profile" className="text-gray-600 dark:text-gray-300 hover:text-primary p-2 rounded-md flex items-center">
                <User className="h-5 w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </nav>
          </div>
           {/* Mobile Search Input */}
          <div className="md:hidden mt-2 pb-2 border-t dark:border-gray-700 pt-2">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-primary focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="lg:flex lg:space-x-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4 xl:w-1/5 mb-8 lg:mb-0">
            <ScrollArea className="h-auto lg:max-h-[calc(100vh-12rem)] lg:pr-4"> {/* Adjust max-h as needed */}
              <Card className="shadow-lg">
                <CardHeader className="border-b dark:border-gray-700">
                  <CardTitle className="text-xl flex items-center">
                    <Filter className="mr-2 h-5 w-5 text-primary" /> Filters & Sort
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div>
                    <Label htmlFor="sort-by" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sort by</Label>
                    <Select defaultValue="default" onValueChange={(value) => console.log("Sort by:", value)}>
                      <SelectTrigger id="sort-by" className="w-full mt-1">
                        <SelectValue placeholder="Select sorting" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Cuisine</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {cuisineFiltersOptions.map(filter => (
                        <div key={filter.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`cuisine-${filter.id}`} 
                            onCheckedChange={(checked) => console.log(`${filter.label} checked: ${checked}`)}
                          />
                          <Label htmlFor={`cuisine-${filter.id}`} className="font-normal text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                            {filter.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Features</h4>
                    <div className="space-y-2">
                      {featureFiltersOptions.map(filter => (
                        <div key={filter.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`feature-${filter.id}`}
                            onCheckedChange={(checked) => console.log(`${filter.label} checked: ${checked}`)}
                          />
                          <Label htmlFor={`feature-${filter.id}`} className="font-normal text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                            {filter.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-4" onClick={() => console.log("Apply filters clicked")}>
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            </ScrollArea>
          </aside>

          {/* Restaurant List Section */}
          <section className="lg:w-3/4 xl:w-4/5">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              {searchTerm ? `Results for "${searchTerm}"` : "All Restaurants"}
            </h1>
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <img src="https://illustrations.popsy.co/amber/searching.svg" alt="No results found" className="mx-auto h-40 mb-4"/>
                <p className="text-xl text-gray-600 dark:text-gray-400">No restaurants found matching your criteria.</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Try adjusting your search or filters.</p>
              </div>
            )}

            {/* Pagination */}
            {filteredRestaurants.length > 0 && (
              <div className="mt-10 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" onClick={(e) => e.preventDefault()} />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => e.preventDefault()} isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" onClick={(e) => e.preventDefault()}>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" onClick={(e) => e.preventDefault()} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-950 text-gray-300 dark:text-gray-400 py-10 text-center mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} FoodApp Technologies Inc. All rights reserved.</p>
          <div className="mt-3 space-x-4">
            <Link to="#" className="hover:text-primary text-sm">About Us</Link>
            <Link to="#" className="hover:text-primary text-sm">Contact</Link>
            <Link to="#" className="hover:text-primary text-sm">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary text-sm">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantListingPage;