// app/search.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "@/components/cards/ProductCard";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const products = [
    {
      id: "1",
      image: "https://your-assets-url/product-images/egg-noodle (1) 2.svg",
      name: "Egg Chicken White",
      price: "$15.99",
    },
    {
      id: "2",
      image:
        "https://your-assets-url/product-images/American-Garden-Mayonnaise-Eggless-473ml 2.svg",
      name: "Mayo Eggless",
      price: "$3.99",
    },
    {
      id: "3",
      image: "https://your-assets-url/product-images/Group 6848.svg",
      name: "Egg Noodle",
      price: "$15.99",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
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
    alignItems: "center",
    padding: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.medium,
    marginRight: 10,
  },
  cancelText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.medium,
    color: COLORS.light.text,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});

export default SearchScreen;
