import badam from "../assets/badam-milk.png";
import pista from "../assets/pista-milk.png";
import rose from "../assets/rose-milk.png";

export type Dish = {
  id: string;
  name: string;
  category: "Signature Milks" | "Special Drinks" | "Sweets & Snacks";
  description: string;
  price: number;
  rating: number;
  image: string;
  isPopular?: boolean;
};

export const DISHES: Dish[] = [
  {
    id: "badam-milk",
    name: "Classic Badam Milk",
    category: "Signature Milks",
    description: "Premium almond milk brewed with real almonds, saffron strands, and fresh cardamom.",
    price: 60,
    rating: 4.9,
    image: badam,
    isPopular: true,
  },
  {
    id: "pista-milk",
    name: "Royal Pista Milk",
    category: "Signature Milks",
    description: "Rich pistachio flavored milk crafted with real pistachio nuts and slow-boiled milk.",
    price: 60,
    rating: 4.8,
    image: pista,
    isPopular: true,
  },
  {
    id: "rose-milk",
    name: "Chilled Rose Milk",
    category: "Signature Milks",
    description: "Cooling and fragrant rose milk prepared with organic rose syrup and chilled pure milk.",
    price: 60,
    rating: 4.9,
    image: rose,
    isPopular: true,
  },
];
