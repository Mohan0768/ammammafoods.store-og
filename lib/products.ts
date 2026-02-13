export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  isCombo?: boolean;
  servings?: number;
  subscription?: boolean;
}

export interface PantryBox {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  servings: number;
  items: string[];
  rating: number;
  minProducts: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Garam Masala',
    description: 'Traditional blend of aromatic spices for everyday cooking',
    price: 299,
    category: 'Masalas',
    image: '/products/garam-masala.svg',
    rating: 4.8,
    reviews: 234,
  },
  {
    id: '2',
    name: 'Curry Powder',
    description: 'Rich and warm curry powder with turmeric and fenugreek',
    price: 249,
    category: 'Masalas',
    image: '/products/curry-powder.svg',
    rating: 4.6,
    reviews: 189,
  },
  {
    id: '3',
    name: 'Chaat Masala',
    description: 'Tangy and spicy blend perfect for street food snacks',
    price: 199,
    category: 'Masalas',
    image: '/products/chaat-masala.svg',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: '4',
    name: 'Biryani Masala',
    description: 'Premium blend for fragrant basmati rice dishes',
    price: 349,
    category: 'Masalas',
    image: '/products/biryani-masala.svg',
    rating: 4.9,
    reviews: 201,
  },
  {
    id: '5',
    name: 'Panch Phoron',
    description: 'Five-spice blend for tempering and seasoning',
    price: 229,
    category: 'Spices',
    image: '/products/panch-phoron.svg',
    rating: 4.5,
    reviews: 123,
  },
  {
    id: '6',
    name: 'Sambar Powder',
    description: 'South Indian blend for authentic sambar curry',
    price: 269,
    category: 'Masalas',
    image: '/products/sambar-powder.svg',
    rating: 4.7,
    reviews: 167,
  },
  {
    id: '7',
    name: 'Rasam Powder',
    description: 'Spicy and aromatic powder for traditional rasam',
    price: 249,
    category: 'Masalas',
    image: '/products/rasam-powder.svg',
    rating: 4.6,
    reviews: 142,
  },
  {
    id: '8',
    name: 'Tandoori Masala',
    description: 'Smoky and flavorful blend for tandoori dishes',
    price: 319,
    category: 'Masalas',
    image: '/products/tandoori-masala.svg',
    rating: 4.8,
    reviews: 198,
  },
];

export const pantryBoxes: PantryBox[] = [
  {
    id: 'combo-1',
    name: 'Bachelor Box',
    description: 'Perfect for bachelors and individuals living alone',
    price: 999,
    image: '/products/garam-masala.svg',
    servings: 1,
    items: ['Garam Masala', 'Chaat Masala', 'Panch Phoron', 'Curry Powder'],
    rating: 4.7,
    minProducts: 4,
  },
  {
    id: 'combo-2',
    name: 'Family Box',
    description: 'Complete family meal solution - serves 4',
    price: 999,
    image: '/products/biryani-masala.svg',
    servings: 4,
    items: ['Biryani Masala', 'Curry Powder', 'Sambar Powder', 'Rasam Powder', 'Tandoori Masala'],
    rating: 4.9,
    minProducts: 4,
  },
  {
    id: 'combo-3',
    name: 'NRI Box',
    description: 'Authentic Indian flavors for NRI families - serves 4',
    price: 999,
    image: '/products/sambar-powder.svg',
    servings: 4,
    items: ['Garam Masala', 'Biryani Masala', 'Sambar Powder', 'Rasam Powder', 'Curry Powder'],
    rating: 4.8,
    minProducts: 4,
  },
];
