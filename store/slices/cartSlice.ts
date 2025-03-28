import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getApiUrl, API_ENDPOINTS } from "@/config/env";
import { Product } from "./productSlice";

// Define the cart item interface
export interface CartItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  formattedPrice: string;
  formattedQuantity: string;
  section?: string;
}

// Define the cart state interface
interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunk to fetch user's cart
export const fetchUserCart = createAsyncThunk<
  CartItem[],
  number, // userId
  { rejectValue: string }
>("cart/fetchUserCart", async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(getApiUrl(`${API_ENDPOINTS.USER_CART}/${userId}`));
    
    if (!response.ok) {
      return rejectWithValue(`Error fetching cart: ${response.status}`);
    }
    
    const data = await response.json();
    
    // FakeStore API returns cart with products array, we need to transform it
    // to match our app's CartItem structure
    const cartItems: CartItem[] = [];
    
    // Fetch product details for each item in the cart
    for (const item of data.products) {
      try {
        const productResponse = await fetch(
          getApiUrl(`${API_ENDPOINTS.PRODUCTS}/${item.productId}`)
        );
        
        if (productResponse.ok) {
          const product = await productResponse.json();
          cartItems.push({
            id: cartItems.length + 1, // Generate unique ID for cart item
            productId: product.id,
            title: product.title,
            price: product.price,
            quantity: item.quantity,
            image: product.image,
            formattedPrice: `$${product.price.toFixed(2)}`,
            formattedQuantity: product.category.includes('clothing') ? '1 pc' : '1 kg',
          });
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
    
    return cartItems;
  } catch (error) {
    return rejectWithValue("Network error occurred while fetching cart");
  }
});

// Async thunk to add item to cart
export const addItemToCart = createAsyncThunk<
  CartItem,
  { product: Product; quantity: number; section?: string },
  { rejectValue: string }
>("cart/addItem", async ({ product, quantity, section }, { rejectWithValue }) => {
  try {
    // In a real app, we would make a POST request to add the item to the cart
    // For FakeStore API, we'll simulate this since it doesn't support real cart operations
    
    // Create a cart item from the product
    const cartItem: CartItem = {
      id: Date.now(), // Generate a unique ID
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity,
      image: product.image,
      formattedPrice: product.formattedPrice || `$${product.price.toFixed(2)}`,
      formattedQuantity: product.quantity || (product.category.includes('clothing') ? '1 pc' : '1 kg'),
      section,
    };
    
    return cartItem;
  } catch (error) {
    return rejectWithValue("Error adding item to cart");
  }
});

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItemIndex = state.items.findIndex(
        item => item.productId === action.payload.productId && 
               item.section === action.payload.section
      );
      
      if (existingItemIndex >= 0) {
        // If item exists, update quantity
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // If item doesn't exist, add it
        state.items.push(action.payload);
      }
    },
    
    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<{ productId: number; section?: string }>) => {
      state.items = state.items.filter(
        item => !(item.productId === action.payload.productId && 
                 item.section === action.payload.section)
      );
    },
    
    // Update item quantity
    updateQuantity: (
      state, 
      action: PayloadAction<{ productId: number; quantity: number; section?: string }>
    ) => {
      const { productId, quantity, section } = action.payload;
      
      const itemIndex = state.items.findIndex(
        item => item.productId === productId && item.section === section
      );
      
      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items.splice(itemIndex, 1);
        } else {
          // Update quantity
          state.items[itemIndex].quantity = quantity;
        }
      }
    },
    
    // Clear cart
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserCart
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      })
      
      // Handle addItemToCart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        
        // Check if item already exists in cart
        const existingItemIndex = state.items.findIndex(
          item => item.productId === action.payload.productId && 
                 item.section === action.payload.section
        );
        
        if (existingItemIndex >= 0) {
          // If item exists, update quantity
          state.items[existingItemIndex].quantity += action.payload.quantity;
        } else {
          // If item doesn't exist, add it
          state.items.push(action.payload);
        }
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add item to cart";
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Calculate cart total
export const selectCartTotal = (state: { cart: CartState }) => {
  return state.cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// Get cart item count
export const selectCartItemCount = (state: { cart: CartState }) => {
  return state.cart.items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
};

export default cartSlice.reducer;
