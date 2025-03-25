// context/CartContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageSourcePropType } from 'react-native';

export interface CartItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
  price: string;
  quantity: string;
  count: number;
  section?: string; // Section identifier (e.g., 'exclusive', 'bestselling', 'groceries')
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'count'>, count?: number, section?: string) => void;
  removeFromCart: (id: string, section?: string) => void;
  updateQuantity: (id: string, count: number, section?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    
    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };
    
    saveCart();
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'count'>, count: number = 1, section?: string) => {
    // Create a unique identifier for the item based on id and section
    const itemWithSection = section ? { ...item, section } : item;
    
    // Find existing item with same ID and section (if provided)
    const existingItem = cartItems.find(cartItem => {
      if (section) {
        return cartItem.id === item.id && cartItem.section === section;
      }
      return cartItem.id === item.id && cartItem.section === itemWithSection.section;
    });
    
    if (existingItem) {
      // If item already exists, update its count
      setCartItems(prev => 
        prev.map(cartItem => {
          if (section) {
            return (cartItem.id === item.id && cartItem.section === section)
              ? { ...cartItem, count: cartItem.count + count }
              : cartItem;
          }
          return (cartItem.id === item.id && cartItem.section === itemWithSection.section)
            ? { ...cartItem, count: cartItem.count + count }
            : cartItem;
        })
      );
    } else {
      // If item doesn't exist, add it with the specified count
      setCartItems(prev => [...prev, { ...itemWithSection, count }]);
    }
  };

  const removeFromCart = (id: string, section?: string) => {
    if (section) {
      // Remove item with specific ID and section
      setCartItems(prev => prev.filter(item => !(item.id === id && item.section === section)));
    } else {
      // Remove item with specific ID (regardless of section)
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateQuantity = (id: string, count: number, section?: string) => {
    if (count <= 0) {
      removeFromCart(id, section);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => {
        if (section) {
          return (item.id === id && item.section === section) ? { ...item, count } : item;
        }
        return item.id === id ? { ...item, count } : item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.count);
    }, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
