import badam from "@/assets/badam-milk.jpg";
import pista from "@/assets/pista-milk.jpg";
import rose from "@/assets/rose-milk.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  accent: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "badam",
    name: "Badam Milk",
    description:
      "Premium almond milk made using fresh milk and natural almonds, infused with a hint of saffron.",
    price: 60,
    image: badam,
    accent: "oklch(0.86 0.07 85)",
  },
  {
    id: "pista",
    name: "Pista Milk",
    description:
      "Rich pistachio flavoured milk with an authentic, slow-brewed taste and a delicate creamy finish.",
    price: 60,
    image: pista,
    accent: "oklch(0.85 0.09 140)",
  },
  {
    id: "rose",
    name: "Rose Milk",
    description:
      "Refreshing rose flavoured chilled milk made with natural rose essence and a touch of honey.",
    price: 60,
    image: rose,
    accent: "oklch(0.86 0.07 20)",
  },
];

export const DELIVERY_FEE = 25;