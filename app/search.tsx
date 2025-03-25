// app/search.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  BackHandler,
  Animated,
  PanResponder,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import FilterComponent from "@/components/figma/Filter";

// Define types for products
interface Product {
  id: string;
  name: string;
  image: any;
  price: string;
  volume: string;
  categoryId: string;
}

// All products from all categories
const allProducts: Product[] = [
  // Fresh Fruits & Vegetable (Category 1)
  {
    id: "1-1",
    name: "Organic Bananas",
    image: require("@/assets/images/banana.png"),
    price: "$4.99",
    volume: "1kg",
    categoryId: "1",
  },
  {
    id: "1-2",
    name: "Red Apple",
    image: require("@/assets/images/apple.png"),
    price: "$4.99",
    volume: "1kg",
    categoryId: "1",
  },
  {
    id: "1-3",
    name: "Bell Pepper Red",
    image: require("@/assets/images/pepper.png"),
    price: "$5.99",
    volume: "1kg",
    categoryId: "1",
  },
  {
    id: "1-4",
    name: "Ginger",
    image: require("@/assets/images/ginger.png"),
    price: "$2.99",
    volume: "250g",
    categoryId: "1",
  },
  // Cooking Oil & Ghee (Category 2)
  {
    id: "2-1",
    name: "Olive Oil",
    image: require("@/assets/images/product-images/oil&ghee.png"),
    price: "$11.99",
    volume: "1L",
    categoryId: "2",
  },
  {
    id: "2-2",
    name: "Vegetable Oil",
    image: require("@/assets/images/product-images/oil&ghee.png"),
    price: "$8.99",
    volume: "1L",
    categoryId: "2",
  },
  // Meat & Fish (Category 3)
  {
    id: "3-1",
    name: "Chicken",
    image: require("@/assets/images/chicken.png"),
    price: "$8.99",
    volume: "1kg",
    categoryId: "3",
  },
  {
    id: "3-2",
    name: "Beef Steak",
    image: require("@/assets/images/meat.png"),
    price: "$15.99",
    volume: "1kg",
    categoryId: "3",
  },
  // Bakery & Snacks (Category 4)
  {
    id: "4-1",
    name: "White Bread",
    image: require("@/assets/images/banana.png"),
    price: "$3.99",
    volume: "400g",
    categoryId: "4",
  },
  {
    id: "4-2",
    name: "Chocolate Cookies",
    image: require("@/assets/images/apple.png"),
    price: "$5.99",
    volume: "300g",
    categoryId: "4",
  },
  // Dairy & Eggs (Category 5)
  {
    id: "5-1",
    name: "Egg Chicken Red",
    image: require("@/assets/images/apple.png"),
    price: "$1.99",
    volume: "4pcs",
    categoryId: "5",
  },
  {
    id: "5-2",
    name: "Egg Chicken White",
    image: require("@/assets/images/banana.png"),
    price: "$1.50",
    volume: "180g",
    categoryId: "5",
  },
  {
    id: "5-3",
    name: "Egg Pasta",
    image: require("@/assets/images/carrot.png"),
    price: "$15.99",
    volume: "30gm",
    categoryId: "5",
  },
  {
    id: "5-4",
    name: "Egg Noodles",
    image: require("@/assets/images/ginger.png"),
    price: "$15.99",
    volume: "2L",
    categoryId: "5",
  },
  {
    id: "5-5",
    name: "Mayonnais Eggless",
    image: require("@/assets/images/pepper.png"),
    price: "$4.99",
    volume: "325ml",
    categoryId: "5",
  },
  // Beverages (Category 6)
  {
    id: "6-1",
    name: "Diet Coke",
    image: require("@/assets/images/apple.png"),
    price: "$1.99",
    volume: "355ml",
    categoryId: "6",
  },
  {
    id: "6-2",
    name: "Sprite Can",
    image: require("@/assets/images/banana.png"),
    price: "$1.50",
    volume: "325ml",
    categoryId: "6",
  },
  {
    id: "6-3",
    name: "Apple & Grape Juice",
    image: require("@/assets/images/carrot.png"),
    price: "$15.99",
    volume: "2L",
    categoryId: "6",
  },
  {
    id: "6-4",
    name: "Orange Juice",
    image: require("@/assets/images/ginger.png"),
    price: "$15.99",
    volume: "2L",
    categoryId: "6",
  },
  {
    id: "6-5",
    name: "Coca Cola Can",
    image: require("@/assets/images/pepper.png"),
    price: "$4.99",
    volume: "325ml",
    categoryId: "6",
  },
  {
    id: "6-6",
    name: "Pepsi Can",
    image: require("@/assets/images/veggies.png"),
    price: "$4.99",
    volume: "330ml",
    categoryId: "6",
  },
];

// Product card component
interface ProductCardProps {
  item: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, onPress }) => {
  return (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={onPress} style={styles.productContent}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productVolume}>
          {item.volume}, <Text style={styles.priceLabel}>Price</Text>
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function SearchScreen() {
  const params = useLocalSearchParams<{ query: string }>();
  const initialQuery = params.query || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Animation value for swipe back gesture
  const translateX = new Animated.Value(0);

  // Pan responder for swipe back gesture
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      // Only allow right swipe (positive dx)
      if (gestureState.dx > 0) {
        translateX.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      // If swiped more than 1/3 of the screen width, go back
      if (gestureState.dx > 100) {
        Animated.timing(translateX, {
          toValue: 400,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          router.back();
        });
      } else {
        // Otherwise, snap back
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      // If search query is cleared, go back to previous screen
      if (initialQuery) {
        setTimeout(() => router.back(), 100);
      }
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, initialQuery]);

  // Handle back button press
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        router.back();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  // Handle navigation to product details
  const handleProductPress = (item: Product) => {
    const queryParams = `id=${encodeURIComponent(
      item.id
    )}&name=${encodeURIComponent(item.name)}&price=${encodeURIComponent(
      item.price
    )}&quantity=${encodeURIComponent(item.volume)}`;
    router.push(`/product-details?${queryParams}`);
  };

  // Clear search and go back
  const handleClearSearch = () => {
    setSearchQuery("");
    router.back();
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX }] }]}
      {...panResponder.panHandlers}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Search Header */}
        <View style={styles.searchHeader}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color="#181B19"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search Store"
              placeholderTextColor="#777"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#181B19" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <FilterComponent />
          </TouchableOpacity>
        </View>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                onPress={() => handleProductPress(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productList}
          />
        ) : searchQuery.trim() !== "" ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              No products found for "{searchQuery}"
            </Text>
          </View>
        ) : null}
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,

    paddingBottom: 15,
    marginTop: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
    marginRight: 15,
    height: 55,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "#7C7C7C",
  },
  filterButton: {
    padding: 10,
  },
  productList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  productRow: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    padding: 15,
    marginBottom: 15,
  },
  productContent: {
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productName: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: "#181725",
    textAlign: "center",
    marginBottom: 5,
  },
  productVolume: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "#7C7C7C",
    marginBottom: 10,
  },
  priceLabel: {
    color: "#7C7C7C",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  productPrice: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: "#181725",
  },
  addButton: {
    backgroundColor: "#53B175",
    width: 45,
    height: 45,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  noResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  noResultsText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#7C7C7C",
    textAlign: "center",
  },
});
