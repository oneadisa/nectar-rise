// types/navigation.ts
export type RootStackParamList = {
  "(onboarding)": undefined;
  "(tab)": undefined;
  // "product-detail": {
  //   product: { id: string; image: string; name: string; price: string };
  // };
  "product-details": {
    product: {
      id: string;
      image: string;
      name: string;
      price: string;
      quantity?: string;
    };
  };
  beverages: undefined;
  search: undefined;
  filters: undefined;
  cart: {
    product?: {
      id: string;
      image: string;
      name: string;
      price: string;
      quantity?: string;
    };
  };
  "+not-found": undefined;
};

export type TabParamList = {
  index: undefined;
  explore: undefined;
  cart: {
    product?: {
      id: string;
      image: string;
      name: string;
      price: string;
      quantity?: string;
    };
  };
  favorites: undefined;
};
