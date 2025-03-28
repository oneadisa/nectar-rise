// components/cards/FavoriteItem.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import { useFavorites } from "@/context/FavoritesContext";

interface FavoriteItemProps {
  id?: string;
  image: any; // Can be require() or uri
  name: string;
  quantity: string;
  price: string;
  onPress: () => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({
  id,
  image,
  name,
  quantity,
  price,
  onPress,
}) => {
  const { removeFromFavorites } = useFavorites();
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.mainContent} onPress={onPress}>
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={styles.productImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productQuantity}>{quantity}, Price</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.rightContainer}>
        <Text style={styles.price}>{price}</Text>
        {id && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => id && removeFromFavorites(id)}
          >
            <Ionicons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    marginHorizontal: 15,
    borderBottomColor: "#E2E2E2",
    backgroundColor: "#FFFFFF",
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 20,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  productName: {
    fontFamily: FONTS.semi,
    fontSize: 16,
    color: "#181725",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  productQuantity: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "#7C7C7C",
  },
  price: {
    fontFamily: FONTS.semi,
    fontSize: 16,
    color: "#181725",
    marginRight: 15,
  },
  removeButton: {
    padding: 8,
  },
});

export default FavoriteItem;
