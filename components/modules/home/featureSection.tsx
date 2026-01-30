
'use client';
import { MealCard } from "@/components/common/card/mealcard";
import { useState } from "react";

const MEALS_DATA = [
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 245,
      restaurant: 'Pizza Palace',
      description: 'Classic pizza with fresh mozzarella and basil',
    },
    {
      id: '2',
      name: 'Grilled Chicken Burger',
      price: 10.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 189,
      restaurant: 'Burger Kingdom',
      description: 'Juicy grilled chicken with crispy fries',
    },
    {
      id: '3',
      name: 'Pad Thai Noodles',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 312,
      restaurant: 'Thai Express',
      description: 'Authentic Thai noodles with shrimp and peanuts',
    },
    {
      id: '4',
      name: 'Caesar Salad',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 156,
      restaurant: 'Green Leaf Bistro',
      description: 'Fresh romaine with parmesan and croutons',
    },
    {
      id: '5',
      name: 'Sushi Platter',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 423,
      restaurant: 'Tokyo Kitchen',
      description: 'Assorted fresh sushi rolls and nigiri',
    },
    {
      id: '6',
      name: 'Tacos Al Pastor',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 267,
      restaurant: 'Mexico City Eats',
      description: 'Three soft tacos with marinated pork',
    },
    {
      id: '7',
      name: 'Biryani Rice',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a104?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 298,
      restaurant: 'Spice House',
      description: 'Aromatic basmati rice with spiced chicken',
    },
    {
      id: '8',
      name: 'Margherita Pasta',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1621996346565-431f63602f41?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 201,
      restaurant: 'Pasta Italia',
      description: 'Creamy pasta with fresh tomato sauce',
    },
  ]
  
  const CATEGORIES = ['All', 'Pizza', 'Burgers', 'Asian', 'Salads', 'Sushi', 'Mexican', 'Indian', 'Pasta']
  
const FeatureSection = () => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All')
    return (
        <div>
            
      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Meals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <h2 className="text-3xl font-bold text-foreground mb-8">Popular Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEALS_DATA.map((meal) => (
            <MealCard key={meal.id} {...meal} />
          ))}
        </div>
      </section>
        </div>
    );
};

export default FeatureSection;