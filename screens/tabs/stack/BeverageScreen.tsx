// app/beverages.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "@/components/cards/ProductCard";
import BackButton from "@/components/BackButton";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";

const BeveragesScreen = () => {
  const navigation = useNavigation();
  const products = [
    {
      id: "1",
      image: "https://your-assets-url/product-images/pngfuel 11.svg",
      name: "Diet Coke",
      price: "$1.99",
    },
    {
      id: "2",
      image: "https://your-assets-url/product-images/pngfuel 12.svg",
      name: "Sprite Can",
      price: "$1.50",
    },
    {
      id: "3",
      image:
        "https://your-assets-url/product-images/tree-top-juice-apple-grape-64oz 1.svg",
      name: "Apple & Grape Juice",
      price: "$9.99",
    },
    {
      id: "4",
      image: "https://your-assets-url/product-images/pngfuel 14.svg",
      name: "Orange Juice",
      price: "$9.99",
    },
    {
      id: "5",
      image: "https://your-assets-url/product-images/pngfuel 16.svg",
      name: "Coca Cola Can",
      price: "$1.99",
    },
    {
      id: "6",
      image: "https://your-assets-url/product-images/pngfuel 18.svg",
      name: "Pepsi Can",
      price: "$1.99",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <BackButton />
          <Text style={styles.headerText}>Beverages</Text>
          <TouchableOpacity onPress={() => navigation.navigate("filters")}>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard
              image={item.image}
              name={item.name}
              price={item.price}
              onAddToCart={() => navigation.navigate("cart", { product: item })}
              onFavorite={() => {}}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.header,
    color: COLORS.light.text,
  },
  filterText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.medium,
    color: COLORS.light.text,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default BeveragesScreen;
