// app/(tab)/favorites.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import FavoriteItem from "@/components/cards/FavoriteItem";
import { COLORS } from "../../constants/Colors";
import { FONTS } from "../../constants/Fonts";
import { useFavorites } from "@/context/FavoritesContext";

const FavoritesScreen = () => {
  const { favorites } = useFavorites();

  // We're using the favorites from context directly
  // No dummy data needed

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Favorites Added</Text>
          <Text style={styles.emptySubtext}>
            Add items to your favorites to see them here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <FavoriteItem
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity || "1 item"}
              onPress={() => router.push(`/product-details?id=${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  header: {
    padding: 15,
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.header,
    color: COLORS.light.text,
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
});

export default FavoritesScreen;
