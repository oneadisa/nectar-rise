// app/(tab)/explore.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CategoryCard from "@/components/cards/CategoryCard";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import FilterComponent from "@/components/figma/Filter";
import Add from "@/components/figma/Add";

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
            <Add width={47} height={47} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ExploreScreen = () => {
  // State for search input
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  // Handle navigation to product details
  const handleProductPress = (item: Product) => {
    const queryParams = `id=${encodeURIComponent(
      item.id
    )}&name=${encodeURIComponent(item.name)}&price=${encodeURIComponent(
      item.price
    )}&quantity=${encodeURIComponent(item.volume)}`;
    router.push(`/product-details?${queryParams}`);
  };

  // Category data matching the UI in the image
  const categories = [
    {
      id: "1",
      image: require("@/assets/images/product-images/freshv&g.png"),
      title: "Fresh Fruits\n& Vegetable",
      backgroundColor: "#53B1751A",
      borderColor: "#53B175",
    },
    {
      id: "2",
      image: require("@/assets/images/product-images/oil&ghee.png"),
      title: "Cooking Oil\n& Ghee",
      backgroundColor: "#F8A44C1A",
      borderColor: "#F8A44C",
    },
    {
      id: "3",
      image: require("@/assets/images/product-images/meat&fish.png"),
      title: "Meat & Fish",
      backgroundColor: "#F7A59340",
      borderColor: "#F7A593",
    },
    {
      id: "4",
      image: require("@/assets/images/product-images/bakery&snacks.png"),
      title: "Bakery & Snacks",
      backgroundColor: "#D3B0E040",
      borderColor: "#D3B0E0",
    },
    {
      id: "5",
      image: require("@/assets/images/product-images/dairy&eggs.png"),
      title: "Dairy & Eggs",
      backgroundColor: "#FDE59840",
      borderColor: "#FDE598",
    },
    {
      id: "6",
      image: require("@/assets/images/product-images/beverages.png"),
      title: "Beverages",
      backgroundColor: "#B7DFF540",
      borderColor: "#B7DFF5",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {!isSearching && (
        <View style={styles.header}>
          <Text style={styles.headerText}>Find Products</Text>
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchHeader}>
        <View style={[styles.searchContainer, !isSearching && styles.fullWidthSearch]}>
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
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#181B19" />
            </TouchableOpacity>
          )}
        </View>
        {isSearching && (
          <TouchableOpacity style={styles.filterButton}>
            <FilterComponent />
          </TouchableOpacity>
        )}
      </View>

      {!isSearching ? (
        /* Categories Grid */
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryCard
              image={item.image}
              title={item.title}
              onPress={() => {
                // Navigate to the dynamic category screen with the category ID
                router.push(`/category/${item.id}`);
              }}
              style={[
                styles.categoryCard,
                {
                  backgroundColor: item.backgroundColor,
                  borderColor: item.borderColor,
                },
              ]}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        /* Search Results */
        <View style={styles.searchResultsContainer}>
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
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                No products found for "{searchQuery}"
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
    paddingHorizontal: 15,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 15,
    alignItems: "center",
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: "#181725",
    textAlign: "center",
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    marginRight: 15,
    height: 51,
  },
  fullWidthSearch: {
    marginRight: 0,
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
  row: {
    justifyContent: "space-between",
    width: "100%",
  },
  listContent: {
    paddingBottom: 20,
  },
  categoryCard: {
    width: "48%",
    borderRadius: 18,
    padding: 15,
    height: 190,
  },
  searchResultsContainer: {
    flex: 1,
  },
  productList: {
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
    paddingTop: 50,
  },
  noResultsText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#7C7C7C",
    textAlign: "center",
  },
});

export default ExploreScreen;
