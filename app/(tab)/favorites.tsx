import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { router } from "expo-router";
import FavoriteItem from "@/components/cards/FavoriteItem";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { FONTS } from "@/constants/Fonts";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const { addToCart } = useCart();

  const navigateToProductDetail = (item: any) => {
    // Navigate to product detail screen using expo-router
    router.push({
      pathname: "/product-details",
      params: {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imagePath: typeof item.image === "string" ? item.image : null,
      },
    });
  };

  // No sample data - we'll show a message when favorites is empty

  const handleAddAllToCart = () => {
    if (favorites.length === 0) {
      Alert.alert(
        "No favorites",
        "You don't have any favorite items to add to the cart."
      );
      return;
    }

    // Add all favorites to cart
    favorites.forEach((item) => {
      addToCart(
        {
          id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        },
        1
      );
    });

    // Show success message
    Alert.alert("Success", "All favorite items have been added to your cart.", [
      { text: "View Cart", onPress: () => router.push("/(tab)/cart") },
      { text: "Continue Shopping", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Favorites Added</Text>
          <Text style={styles.emptySubtext}>
            Add items to your favorites to see them here
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {favorites.map((item) => (
            <FavoriteItem
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onPress={() => navigateToProductDetail(item)}
            />
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddAllToCart}
      >
        <Text style={styles.addToCartText}>Add All To Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  headerTitle: {
    fontFamily: FONTS.semi,
    fontSize: 20,
    color: "#181725",
    letterSpacing: 0.1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 80, // Add space at the bottom for the floating button
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  emptyText: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: "#181725",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtext: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: "#7C7C7C",
    textAlign: "center",
  },
  addToCartButton: {
    backgroundColor: "#53B175",
    borderRadius: 19,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    zIndex: 10,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addToCartText: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    color: "#FFFFFF",
  },
});
