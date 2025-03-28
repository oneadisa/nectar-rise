// app/beverages.tsx
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
import { router } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Mas from "@/components/figma/Mas";
import Add from "@/components/figma/Add";

// Define types for beverage products
interface BeverageProduct {
  id: string;
  name: string;
  image: any;
  price: string;
  volume: string;
}

// Beverage product data
const beverageProducts: BeverageProduct[] = [
  {
    id: "1",
    name: "Diet Coke",
    image: require("@/assets/images/apple.png"),
    price: "$1.99",
    volume: "355ml",
  },
  {
    id: "2",
    name: "Sprite Can",
    image: require("@/assets/images/banana.png"),
    price: "$1.50",
    volume: "325ml",
  },
  {
    id: "3",
    name: "Apple & Grape Juice",
    image: require("@/assets/images/carrot.png"),
    price: "$15.99",
    volume: "2L",
  },
  {
    id: "4",
    name: "Orange Juice",
    image: require("@/assets/images/ginger.png"),
    price: "$15.99",
    volume: "2L",
  },
  {
    id: "5",
    name: "Coca Cola Can",
    image: require("@/assets/images/pepper.png"),
    price: "$4.99",
    volume: "325ml",
  },
  {
    id: "6",
    name: "Pepsi Can",
    image: require("@/assets/images/veggies.png"),
    price: "$4.99",
    volume: "330ml",
  },
];

// Product card component
interface ProductCardProps {
  item: BeverageProduct;
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

export default function BeveragesScreen() {
  // Handle navigation to product details
  const handleProductPress = (item: BeverageProduct) => {
    // Create a simplified query string with just the necessary parameters
    // We're not passing the image directly as it can't be serialized properly
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
        <Text style={styles.headerTitle}>Beverages</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#181725" />
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <FlatList
        data={beverageProducts}
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
    fontFamily: FONTS.bold,
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
});
