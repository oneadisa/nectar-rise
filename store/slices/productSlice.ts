import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getApiUrl, API_ENDPOINTS } from "@/config/env";

// Define the product interface based on FakeStore API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  // Additional fields to match our app's structure
  quantity?: string;
  formattedPrice?: string;
}

// Define the state interface
interface ProductState {
  products: Product[];
  exclusiveOffers: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  products: [],
  exclusiveOffers: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(getApiUrl(API_ENDPOINTS.PRODUCTS));
    
    if (!response.ok) {
      return rejectWithValue(`Error fetching products: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue("Network error occurred while fetching products");
  }
});

// Async thunk to fetch a product by ID
export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: string }
>("products/fetchById", async (productId, { rejectWithValue }) => {
  try {
    const response = await fetch(
      getApiUrl(`${API_ENDPOINTS.PRODUCTS}/${productId}`)
    );
    
    if (!response.ok) {
      return rejectWithValue(`Error fetching product: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue("Network error occurred while fetching product");
  }
});

// Async thunk to fetch products by category
export const fetchProductsByCategory = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>("products/fetchByCategory", async (category, { rejectWithValue }) => {
  try {
    const response = await fetch(
      getApiUrl(`${API_ENDPOINTS.CATEGORY}/${category}`)
    );
    
    if (!response.ok) {
      return rejectWithValue(`Error fetching products by category: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue("Network error occurred while fetching products by category");
  }
});

// Create the product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Helper reducer to format products for our app's UI
    formatProductsForUI: (state) => {
      state.products = state.products.map(product => ({
        ...product,
        quantity: product.category.includes('clothing') ? '1 pc' : '1 kg',
        formattedPrice: `$${product.price.toFixed(2)}`
      }));
    },
    
    // Set exclusive offers (a subset of products)
    setExclusiveOffers: (state) => {
      // Select a subset of products for exclusive offers (e.g., first 4)
      state.exclusiveOffers = state.products
        .slice(0, 4)
        .map(product => ({
          ...product,
          quantity: product.category.includes('clothing') ? '1 pc' : '1 kg',
          formattedPrice: `$${product.price.toFixed(2)}`
        }));
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        // Format products for UI
        state.products = state.products.map(product => ({
          ...product,
          quantity: product.category.includes('clothing') ? '1 pc' : '1 kg',
          formattedPrice: `$${product.price.toFixed(2)}`
        }));
        // Set exclusive offers
        state.exclusiveOffers = state.products.slice(0, 4);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })
      
      // Handle fetchProductsByCategory
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        // Format products for UI
        const formattedProducts = action.payload.map(product => ({
          ...product,
          quantity: product.category.includes('clothing') ? '1 pc' : '1 kg',
          formattedPrice: `$${product.price.toFixed(2)}`
        }));
        // Update products based on category
        state.products = formattedProducts;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products by category";
      })
      
      // Handle fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        // Format product for UI
        const formattedProduct = {
          ...action.payload,
          quantity: action.payload.category.includes('clothing') ? '1 pc' : '1 kg',
          formattedPrice: `$${action.payload.price.toFixed(2)}`
        };
        state.selectedProduct = formattedProduct;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product details";
      });
  },
});

export const { formatProductsForUI, setExclusiveOffers } = productSlice.actions;
export default productSlice.reducer;
