// ============================================
//  API — Custom Brand Products
//  Nike, Adidas, Rolex, Gucci, LV, Prada
// ============================================

import { Product } from './models.js';

const BRAND_PRODUCTS = [
  // NIKE
  {
    id: 101, title: 'Nike Air Max 270', price: 149.99, category: 'Nike',
    description: 'The Nike Air Max 270 features a large Max Air unit in the heel for all-day comfort. Lightweight mesh upper with foam midsole delivers a smooth, cushioned ride throughout your day.',
    image: 'https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/awjogtdnqxniqqk0wpgf/AIR+MAX+270.png',
    rating: { rate: 4.7, count: 312 }
  },
  {
    id: 102, title: 'Nike Air Force 1 Low', price: 109.99, category: 'Nike',
    description: 'The radically original Nike Air Force 1 was the first basketball shoe to use Nike Air cushioning. Low-cut design with premium leather upper and classic rubber cupsole.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfe--fctVn9fGN7p6uGwA-jfKlYIO6Dk4Btg&s',
    rating: { rate: 4.8, count: 540 }
  },
  {
    id: 103, title: 'Nike Dri-FIT Running Jacket', price: 89.99, category: 'Nike',
    description: 'Lightweight running jacket with Dri-FIT technology to help you stay dry during your run. Reflective details for low-light visibility, full zip with stand-up collar.',
    image: 'https://i.ebayimg.com/images/g/89QAAOSwNi5nxFKW/s-l1600.jpg',
    rating: { rate: 4.5, count: 178 }
  },
  {
    id: 104, title: 'Nike Pro Training Shorts', price: 44.99, category: 'Nike',
    description: 'Engineered to support your movement with a body-contouring fit. Smooth, stretchy fabric stays put while you push your limits.',
    image: 'https://n.cdn.cdek.shopping/images/shopping/QNh4cNmkfwJMsbY5.jpg?v=1',
    rating: { rate: 4.4, count: 210 }
  },
  // ADIDAS
  {
    id: 201, title: 'Adidas Ultraboost 23', price: 189.99, category: 'Adidas',
    description: 'Feel the Boost cushioning underfoot with the Adidas Ultraboost 23. Premium Primeknit+ upper adapts to the shape of your foot for an incredible running experience.',
    image: 'https://m.media-amazon.com/images/I/51UQ1rYgFFL._AC_SL1000_.jpg',
    rating: { rate: 4.8, count: 420 }
  },
  {
    id: 202, title: 'Adidas Stan Smith Sneakers', price: 99.99, category: 'Adidas',
    description: 'An icon since 1973. The clean Stan Smith silhouette features a perforated 3-Stripes, smooth leather upper and cupsole. A timeless classic for any outfit.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgeTfPOv3NF21M8LyWdRiMbATOW4R4oiN8-w&s',
    rating: { rate: 4.6, count: 890 }
  },
  {
    id: 203, title: 'Adidas Tiro Track Pants', price: 64.99, category: 'Adidas',
    description: 'Training-ready track pants with a tapered fit and moisture-managing fabric. Zip pockets keep your essentials secure during workouts.',
    image: 'https://api.copa.kz/product-images/JY7113_2.jpg',
    rating: { rate: 4.3, count: 315 }
  },
  {
    id: 204, title: 'Adidas Originals Hoodie', price: 79.99, category: 'Adidas',
    description: 'Soft French terry cotton blend hoodie with the classic Trefoil logo. Kangaroo pocket and adjustable drawcord hood for a relaxed streetwear look.',
    image: 'https://cdn-images.farfetch-contents.com/12/67/75/21/12677521_12376310_600.jpg',
    rating: { rate: 4.5, count: 267 }
  },
  // ROLEX
  {
    id: 301, title: 'Rolex Submariner Date', price: 10500.00, category: 'Rolex',
    description: 'The reference among divers watches. The Submariner Date features a black dial, unidirectional rotatable bezel and is water-resistant to 300 metres. Oystersteel bracelet with Glidelock extension system.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1IVEqbq4NJmna2TILSC9PGIz1OUxhsJGQMg&s',
    rating: { rate: 5.0, count: 88 }
  },
  {
    id: 302, title: 'Rolex Datejust 41', price: 8750.00, category: 'Rolex',
    description: 'The Datejust is the classic watch of reference. The 41 mm case in Oystersteel with fluted bezel and Jubilee bracelet. Automatic movement with date display and Cyclops lens.',
    image: 'https://ir.ozone.ru/s3/multimedia-1-r/7050995307.jpg',
    rating: { rate: 4.9, count: 62 }
  },
  {
    id: 303, title: 'Rolex GMT-Master II', price: 12400.00, category: 'Rolex',
    description: 'Originally created for pilots, the GMT-Master II displays two time zones simultaneously. Features the iconic two-colour Cerachrom bezel insert in Oystersteel, with an Oyster bracelet.',
    image: 'https://s3.amazonaws.com/ISHOWIMAGES/ROLEX+V7/Rolex+Watches/Rolex+Model+Pages/watch_assets/upright_watches_assets/desktop/m126710grnr-0003_drp-upright-bba-with-shadow.png',
    rating: { rate: 5.0, count: 47 }
  },
  // GUCCI
  {
    id: 401, title: 'Gucci GG Marmont Bag', price: 1350.00, category: 'Gucci',
    description: 'The GG Marmont collection features the Double G hardware in a matelassé chevron design. Crafted in soft matelassé leather with a smooth leather interior and chain strap.',
    image: 'https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1727973903/443497_AAER0_1523_001_063_0000_Light-gg-marmont-medium-shoulder-bag.jpg',
    rating: { rate: 4.8, count: 134 }
  },
  {
    id: 402, title: 'Gucci Ace Sneakers', price: 650.00, category: 'Gucci',
    description: "The Ace sneaker is one of the House's most recognised styles. In white leather with the signature web stripe embroidery, this is the ultimate casual luxury sneaker.",
    image: 'https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1774630822/760775_FACMZ_9746_007_100_0000_Light-mens-gucci-ace-sneaker-with-web.jpg',
    rating: { rate: 4.7, count: 201 }
  },
  {
    id: 403, title: 'Gucci Dionysus Shoulder Bag', price: 1980.00, category: 'Gucci',
    description: 'Inspired by Greek mythology, the Dionysus bag features a distinctive tiger head closure with antique gold-toned hardware. Crafted in GG Supreme canvas with leather trim.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbe9vy7P3ArvPPf5waAQCq1InGbRce9W-nrQ&s',
    rating: { rate: 4.9, count: 76 }
  },
  // LOUIS VUITTON
  {
    id: 501, title: 'Louis Vuitton Speedy 30', price: 1480.00, category: 'Louis Vuitton',
    description: 'A mainstay of the Louis Vuitton legacy since 1930. The Speedy 30 in Monogram canvas with golden brass hardware and tan cowhide leather trim. Iconic, timeless, effortless.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkhBijD7QqYWbWXglQhWEBB-cUCFaPtg1pyw&s',
    rating: { rate: 4.9, count: 218 }
  },
  {
    id: 502, title: 'Louis Vuitton Neverfull MM', price: 1860.00, category: 'Louis Vuitton',
    description: 'The Neverfull tote is as functional as it is chic. Large enough for all your daily essentials, the open top design and adjustable side lacings make it perfectly adaptable.',
    image: 'https://cdn-images.farfetch-contents.com/32/53/70/50/32537050_62676327_600.jpg',
    rating: { rate: 4.8, count: 180 }
  },
  {
    id: 503, title: 'Louis Vuitton Horizon 55 Trolley', price: 4800.00, category: 'Louis Vuitton',
    description: 'The Horizon 55 brings luxury to travel with Monogram canvas body, a lightweight aluminum spinner frame and multi-directional wheels. Includes garment sleeve and organisational pockets.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpPxOA26Tp94etbaPCyN_XJCabYcRjTB_pqw&s',
    rating: { rate: 4.7, count: 55 }
  },
  // PRADA
  {
    id: 601, title: 'Prada Galleria Bag', price: 2900.00, category: 'Prada',
    description: "The Galleria is Prada's quintessential handbag. Structured Saffiano leather with golden hardware double turn-lock clasp and removable shoulder strap. Suede interior with gold-stamped logo.",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrFJosGYs3M6-vWw78UCBvmPp7kW8Q3EJqUQ&s',
    rating: { rate: 4.9, count: 92 }
  },
  {
    id: 602, title: 'Prada Re-Nylon Backpack', price: 1350.00, category: 'Prada',
    description: "Crafted in ECONYL regenerated nylon, the Re-Nylon backpack reflects Prada's commitment to sustainability. Features the triangle logo plaque, padded straps, and multiple compartments.",
    image: 'https://cdn-images.farfetch-contents.com/22/71/59/97/22715997_52716562_600.jpg',
    rating: { rate: 4.7, count: 113 }
  },
  {
    id: 603, title: 'Prada Monolith Boots', price: 1150.00, category: 'Prada',
    description: 'The Monolith collection merges traditional craftsmanship with contemporary design. Brushed leather upper with the iconic lug sole and contrasting nylon detail at the ankle.',
    image: 'https://cdn-images.farfetch-contents.com/26/34/58/53/26345853_65094055_600.jpg',
    rating: { rate: 4.6, count: 87 }
  },
  {
    id: 604, title: 'Prada Symbole Sunglasses', price: 420.00, category: 'Prada',
    description: 'Bold cat-eye silhouette with the signature Prada Symbole logo at the temples. UV400 protection lenses in a lightweight acetate frame available in multiple colourways.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrWAsm42b_7OJaiDtnVE8zPEXYroq73oFTuw&s',
    rating: { rate: 4.5, count: 145 }
  },
];

export const api = {
  async getProducts() {
    return BRAND_PRODUCTS.map(p => new Product(p));
  },
  async getProduct(id) {
    const numId = Number(id);
    const p = BRAND_PRODUCTS.find(p => p.id === numId);
    if (!p) throw new Error('Product not found');
    return new Product(p);
  },
  getCategories() {
    return [...new Set(BRAND_PRODUCTS.map(p => p.category))];
  },
  getBrands() {
    return [...new Set(BRAND_PRODUCTS.map(p => p.category))];
  }
};
