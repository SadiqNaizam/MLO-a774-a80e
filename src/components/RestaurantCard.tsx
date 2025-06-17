import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock, Bike } from "lucide-react";
import { cn } from "@/lib/utils";

interface RestaurantCardProps {
  id: string; // For React key, if this component is mapped.
  slug: string; // Unique identifier for URL query param (e.g., "best-pizza-place")
  name: string;
  imageUrl: string;
  cuisineTags: string[]; // e.g., ["Italian", "Pizza"]
  rating: number; // e.g., 4.7
  reviewCount?: number; // Optional: e.g., (100)
  deliveryTime: string; // e.g., "25-35 min"
  deliveryFee: number; // Amount in currency, 0 for free
  className?: string; // Optional additional class names
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  slug,
  name,
  imageUrl,
  cuisineTags,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  className,
}) => {
  console.log('RestaurantCard loaded for:', name, 'with ID:', id);

  const placeholderImage = "https://via.placeholder.com/400x225?text=Restaurant";

  return (
    <Card className={cn("w-full overflow-hidden transition-all duration-200 hover:shadow-xl group rounded-lg", className)}>
      <Link 
        to={`/restaurant-detail?slug=${slug}`} 
        className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded-lg"
        aria-label={`View details for ${name}`}
      >
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-t-lg overflow-hidden">
          <img
            src={imageUrl || placeholderImage}
            alt={`Image of ${name}`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </AspectRatio>
        <CardContent className="p-3 space-y-1.5">
          <h3 className="text-md font-semibold truncate group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          {cuisineTags && cuisineTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center min-h-[26px]"> {/* min-h to prevent layout shift if tags are empty */}
              {cuisineTags.slice(0, 2).map((tag) => ( // Show up to 2 tags for compactness
                <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0.5">
                  {tag}
                </Badge>
              ))}
              {cuisineTags.length > 2 && (
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  +{cuisineTags.length - 2}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <div className="flex items-center" title={`${rating.toFixed(1)} stars` + (reviewCount ? ` based on ${reviewCount} reviews` : '')}>
              <Star className="w-3.5 h-3.5 mr-1 text-yellow-400 fill-yellow-400" />
              <span className="font-medium text-foreground">{rating.toFixed(1)}</span>
              {reviewCount !== undefined && <span className="ml-0.5">({reviewCount})</span>}
            </div>
            <div className="flex items-center" title={`Estimated delivery time: ${deliveryTime}`}>
              <Clock className="w-3.5 h-3.5 mr-1" />
              <span>{deliveryTime}</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground pt-0.5">
            {deliveryFee === 0 ? (
              <span className="font-medium text-green-600">Free delivery</span>
            ) : (
              <div className="flex items-center" title={`Delivery fee: $${deliveryFee.toFixed(2)}`}>
                <Bike className="w-3.5 h-3.5 mr-1" /> 
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default RestaurantCard;