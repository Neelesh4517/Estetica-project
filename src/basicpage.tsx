import React, { useState, type ChangeEvent,  } from "react";
import "./basicpage.css";
// import OrderCompletion from "./OrderCompletion";
import OrderCompletion from "./ordercompletion";
// import { MdDelete } from "react-icons/md";
import { MdDelete } from 'react-icons/md';
import logo from './assets/logo.png';
import firstImg from './assets/first.png';
import secondImg from './assets/second.png';
import third from './assets/third.png';
import four from './assets/four.png';
import five from './assets/five.png';
import six from './assets/six.png';
import seven from './assets/eight.png'

type Product = {
  id: number;
  name: string;
  image: string;
};

type CartItem = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
};

const products: Product[] = [
  { id: 1, name: "Trillion Protein Transfusion", image: firstImg },
  { id: 2, name: "TIRTIR Mask Fit Red Cushion", image: secondImg },
  { id: 3, name: "Kay Beauty Hydrating Fo...", image: third },
  { id: 4, name: "Suroskie My Glow All-In...", image: four },
  { id: 5, name: "L'Oreal Professionnel Hair...", image: five },
  { id: 6, name: "L'Oreal Professionnel D...", image: six },
  { id: 7, name: "L'Oreal Professionnel D...", image: six },
  { id: 8, name: "Trillion Protein Transfusion", image: five },
  { id: 9, name: "TIRTIR Mask Fit Red Cushion", image: seven},
  { id: 10, name: "Kay Beauty Hydrating Fo...", image: four },
  { id: 11, name: "Suroskie My Glow All-In...", image: secondImg },
  { id: 12, name: "L'Oreal Professionnel Hair...", image: seven },
  { id: 13, name: "L'Oreal Professionnel D...", image: five },
  { id: 14, name: "L'Oreal Professionnel D...", image: six },
];

const ProductsPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add unit price based on product (you can customize these prices)
        const unitPrice = getProductPrice(product.id);
        return [...prevCart, { ...product, quantity: 1, unitPrice }];
      }
    });
  };

  const getProductPrice = (productId: number): number => {
    const prices: { [key: number]: number } = {
      1: 300, 
      2: 200, 
      3: 250,
      4: 180, 
      5: 320,
      6: 280, 
      7: 280, 
      8: 300, 
      9: 200, 
      10: 250,
      11: 180, 
      12: 320,
      13: 280, 
      14: 280, 
    };
    return prices[productId] || 200; 
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Show checkout page if checkout button was clicked
  if (showCheckout) {
    return (
      <OrderCompletion 
        cartItems={cart} 
        onBack={() => setShowCheckout(false)} 
      />
    );
  }

  return (
    <div className="page">

      {cart.length > 0 && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h3 className="cart-title">Cart ({cart.length})</h3>
            <button 
              className="clear-cart-btn"
              onClick={() => setCart([])}
              title="Clear Cart"
            >
    ⛔
            </button>
          </div>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove Item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <button 
              className="checkout-btn"
              onClick={() => setShowCheckout(true)}
            >
              Checkout ({cart.reduce((total, item) => total + item.quantity, 0)} items)
            </button>
          </div>
        </div>
      )}

      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <img src={logo} className="logo"></img>
            <div className="welcome-text">
              <span className="welcome">Welcome Back, Rajesh</span>
              <span className="subtitle">
                Hello, here you can manage your orders by zone
              </span>
            </div>
          </div>

          <div className="header-center">
            <input
              type="text"
              placeholder="Search for Product !"
              value={search}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="header-right">
            <button className="icon-btn">🔔</button>
            <button className="profile-btn">AD</button>
            <span className="profile-text">Profile</span>
          </div>
        </header>

        {/* Title */}
        <h2 className="section-title">Products</h2>

        {/* Filters */}
        <div className="filters">
          <button className="filter-btn active">Massage Therapy</button>
          <button className="filter-btn">Hair Cut Wash & Style</button>
          <button className="filter-btn">Nail Bar</button>
          <button className="filter-btn">Manicure & Pedicure</button>
        </div>

        {/* Products Grid */}
        <div className="grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card">
              <div className="card-img-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img"
                />
                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  +
                </button>
              </div>
              <p className="product-name">{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;