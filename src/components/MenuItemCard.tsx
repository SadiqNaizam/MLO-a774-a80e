import React from 'react';
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingCart, Settings2, PackageX } from 'lucide-react';

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  /** If true, indicates the item is customizable and "Customize" button is shown. Defaults to false. */
  hasOptions?: boolean;
  /** If false, button is "Unavailable" and disabled. Defaults to true. */
  isAvailable?: boolean;
  /** Callback function when "Add to Cart" button is clicked (if !hasOptions). */
  onAddToCart: (itemId: string) => void;
  /** Callback function when "Customize" button is clicked (if hasOptions). */
  onCustomize: (itemId: string) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  hasOptions = false,
  isAvailable = true,
  onAddToCart,
  onCustomize,
}) => {
  console.log(`MenuItemCard loaded for: ${name}, ID: ${id}`);

  const handleButtonClick = () => {
    if (!isAvailable) return;

    if (hasOptions) {
      onCustomize(id);
    } else {
      onAddToCart(id);
    }
  };

  let buttonText: string;
  let ButtonIcon: React.ElementType; // lucide-react icons are React components

  if (!isAvailable) {
    buttonText = 'Unavailable';
    ButtonIcon = PackageX;
  } else if (hasOptions) {
    buttonText = 'Customize';
    ButtonIcon = Settings2;
  } else {
    buttonText = 'Add to Cart';
    ButtonIcon = ShoppingCart;
  }

  return (
    <Card className="w-full overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl flex flex-col group bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
      <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden">
        <img
          src={imageUrl || `https://via.placeholder.com/400x225?text=${encodeURIComponent(name)}`}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </AspectRatio>
      <CardContent className="p-4 space-y-1 flex-grow">
        <CardTitle className="text-lg font-semibold line-clamp-1 text-gray-900 dark:text-gray-100">
          {name}
        </CardTitle>
        <p 
          className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 h-[2.5rem]" 
          title={description} // Show full description on hover
        >
          {description || 'No description available.'}
        </p>
        <p className="text-xl font-bold text-green-600 dark:text-green-500 pt-2">
          ${price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <Button
          onClick={handleButtonClick}
          disabled={!isAvailable}
          className="w-full flex items-center justify-center py-2.5 text-sm font-medium transition-colors duration-150 ease-in-out
                     disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
                     dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
          aria-label={!isAvailable ? `Item ${name} is unavailable` : (hasOptions ? `Customize ${name}` : `Add ${name} to cart`)}
          variant={!isAvailable ? "outline" : "default"}
        >
          <ButtonIcon className="mr-2 h-5 w-5" />
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuItemCard;