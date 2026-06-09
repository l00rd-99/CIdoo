export class User {
  constructor(email, password, name = '') {
    this.email = email;
    this.password = password;
    this.name = name || email.split('@')[0];
    this.createdAt = new Date().toISOString();
  }
}

export class Product {
  constructor({ id, title, price, description, image, category, rating }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
    this.category = category;
    this.rating = rating || { rate: 0, count: 0 };
  }

  get formattedPrice() {
    return `$${this.price.toFixed(2)}`;
  }
}

export class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  get subtotal() {
    return this.product.price * this.quantity;
  }

  get formattedSubtotal() {
    return `$${this.subtotal.toFixed(2)}`;
  }
}

export class Cart {
  constructor() {
    this.items = [];
    this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem('cart');
      if (raw) {
        const data = JSON.parse(raw);
        this.items = data.map(d => {
          const product = new Product(d.product);
          return new CartItem(product, d.quantity);
        });
      }
    } catch (e) {
      this.items = [];
    }
  }

  save() {
    const data = this.items.map(item => ({
      product: { ...item.product },
      quantity: item.quantity
    }));
    localStorage.setItem('cart', JSON.stringify(data));
  }

  add(product, quantity = 1) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push(new CartItem(product, quantity));
    }
    this.save();
  }

  remove(productId) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.save();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.remove(productId);
      } else {
        item.quantity = quantity;
        this.save();
      }
    }
  }

  get total() {
    return this.items.reduce((sum, i) => sum + i.subtotal, 0);
  }

  get formattedTotal() {
    return `$${this.total.toFixed(2)}`;
  }

  get count() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  }

  clear() {
    this.items = [];
    this.save();
  }
}
