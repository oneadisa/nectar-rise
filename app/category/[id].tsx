// app/category/[id].tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import FilterComponent from "@/components/figma/Filter";
import Mas from "@/components/figma/Mas";
import Add from "@/components/figma/Add";

// Define types for category products
interface CategoryProduct {
  id: string;
  name: string;
  image: any;
  price: string;
  volume: string;
}

// Product data by category
const categoryProducts: Record<string, CategoryProduct[]> = {
  "1": [
    // Fresh Fruits & Vegetable
    {
      id: "1",
      name: "Organic Bananas",
      image: require("@/assets/images/banana.png"),
      price: "$4.99",
      volume: "1kg",
    },
    {
      id: "2",
      name: "Red Apple",
      image: require("@/assets/images/apple.png"),
      price: "$4.99",
      volume: "1kg",
    },
    {
      id: "3",
      name: "Bell Pepper Red",
      image: require("@/assets/images/pepper.png"),
      price: "$5.99",
      volume: "1kg",
    },
    {
      id: "4",
      name: "Ginger",
      image: require("@/assets/images/ginger.png"),
      price: "$2.99",
      volume: "250g",
    },
  ],
  "2": [
    // Cooking Oil & Ghee
    {
      id: "1",
      name: "Olive Oil",
      image: require("@/assets/images/product-images/oil&ghee.png"),
      price: "$11.99",
      volume: "1L",
    },
    {
      id: "2",
      name: "Vegetable Oil",
      image: require("@/assets/images/product-images/oil&ghee.png"),
      price: "$8.99",
      volume: "1L",
    },
  ],
  "3": [
    // Meat & Fish
    {
      id: "1",
      name: "Chicken",
      image: require("@/assets/images/chicken.png"),
      price: "$8.99",
      volume: "1kg",
    },
    {
      id: "2",
      name: "Beef Steak",
      image: require("@/assets/images/meat.png"),
      price: "$15.99",
      volume: "1kg",
    },
  ],
  "4": [
    // Bakery & Snacks
    {
      id: "1",
      name: "White Bread",
      image: require("@/assets/images/banana.png"),
      price: "$3.99",
      volume: "400g",
    },
    {
      id: "2",
      name: "Chocolate Cookies",
      image: require("@/assets/images/apple.png"),
      price: "$5.99",
      volume: "300g",
    },
  ],
  "5": [
    // Dairy & Eggs
    {
      id: "1",
      name: "Egg Chicken Red",
      image: require("@/assets/images/product-images/egg-chicken-red.png"),
      price: "$1.99",
      volume: "4pcs",
    },
    {
      id: "2",
      name: "Egg Chicken White",
      image: require("@/assets/images/product-images/egg-chicken-white.png"),
      price: "$1.50",
      volume: "180g",
    },
    {
      id: "3",
      name: "Egg Pasta",
      image: require("@/assets/images/product-images/egg-pasta.png"),
      price: "$15.99",
      volume: "30g",
    },
    {
      id: "4",
      name: "Egg Noodles",
      image: require("@/assets/images/product-images/egg-noodles.png"),
      price: "$15.99",
      volume: "2L",
    },
    {
      id: "5",
      name: "Mayonnaise Eggless",
      image: require("@/assets/images/product-images/mayonaise-eggless.png"),
      price: "$4.99",
      volume: "1L",
    },
    {
      id: "6",
      name: "Egg Noodles",
      image: require("@/assets/images/product-images/egg-noodles-purple.png"),
      price: "$6.99",
      volume: "80g",
    },
  ],
  "6": [
    // Beverages
    {
      id: "1",
      name: "Diet Coke",
      image: require("@/assets/images/product-images/white-coke.png"),
      price: "$1.99",
      volume: "355ml",
    },
    {
      id: "2",
      name: "Sprite Can",
      image: require("@/assets/images/product-images/sprite.png"),
      price: "$1.50",
      volume: "325ml",
    },
    {
      id: "3",
      name: "Apple & Grape Juice",
      image: require("@/assets/images/product-images/apple-juice.png"),
      price: "$15.99",
      volume: "2L",
    },
    {
      id: "4",
      name: "Orange Juice",
      image: require("@/assets/images/product-images/orange-juice.png"),
      price: "$15.99",
      volume: "2L",
    },
    {
      id: "5",
      name: "Coca Cola Can",
      image: require("@/assets/images/product-images/red-coke.png"),
      price: "$4.99",
      volume: "325ml",
    },
    {
      id: "6",
      name: "Pepsi Can",
      image: require("@/assets/images/product-images/pepsi.png"),
      price: "$4.99",
      volume: "330ml",
    },
  ],
};

// Category titles mapping
const categoryTitles: Record<string, string> = {
  "1": "Fresh Fruits & Vegetable",
  "2": "Cooking Oil & Ghee",
  "3": "Meat & Fish",
  "4": "Bakery & Snacks",
  "5": "Dairy & Eggs",
  "6": "Beverages",
};

// Product card component
interface ProductCardProps {
  item: CategoryProduct;
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
            {/* <Text style={styles.addButtonText}> */}
            <Add width={47} height={47} />
            {/* </Text> */}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function CategoryScreen() {
  // Get the category ID from the URL params
  const { id } = useLocalSearchParams();
  const categoryId = typeof id === "string" ? id : "1";

  // Get the category title and products
  const categoryTitle = categoryTitles[categoryId] || "Category";
  const products = categoryProducts[categoryId] || [];

  // Handle navigation to product details
  const handleProductPress = (item: CategoryProduct) => {
    // Create a simplified query string with just the necessary parameters
    const queryParams = `id=${encodeURIComponent(
      item.id
    )}&name=${encodeURIComponent(item.name)}&price=${encodeURIComponent(
      item.price
    )}&quantity=${encodeURIComponent(item.volume)}`;

    router.push(`/product-details?${queryParams}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryTitle}</Text>
        <TouchableOpacity style={styles.filterButton}>
          <FilterComponent />
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard item={item} onPress={() => handleProductPress(item)} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: "GilroyBold",
    fontSize: 20,
    color: "#181725",
  },
  filterButton: {
    padding: 5,
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
    fontFamily: "GilroyBold",
    fontSize: 16,
    color: "#181725",
    textAlign: "center",
    marginBottom: 5,
  },
  productVolume: {
    fontFamily: "GilroyMedium",
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
    fontFamily: "GilroyBold",
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
});
