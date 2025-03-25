// components/ProductCard.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import Add from "../figma/Add";
import { useFavorites } from "@/context/FavoritesContext";

interface ProductCardProps {
  id: string;
  image: ImageSourcePropType;
  name: string;
  price: string;
  quantity: string;
  onAddToCart: () => void;
  onPress?: () => void;
  // Optional index to make the ID truly unique when used in lists
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  quantity,
  onAddToCart,
  onPress,
  index,
}) => {
  // Create a truly unique ID by combining the product ID with its name
  // This ensures products with the same ID but in different contexts are treated as unique
  const uniqueId = `${id}-${name}`;
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isItemFavorite = isFavorite(uniqueId);
  
  const toggleFavorite = () => {
    if (isItemFavorite) {
      removeFromFavorites(uniqueId);
    } else {
      addToFavorites({
        id: uniqueId, // Use the unique ID for favorites
        name,
        image,
        price,
        quantity,
      });
    }
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
        <Ionicons 
          name={isItemFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isItemFavorite ? "#FF5A5F" : "#181725"} 
        />
      </TouchableOpacity>
      
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{name}</Text>
      <Text
        style={{
          color: "#7C7C7C",
          fontFamily: FONTS.regular,
          fontSize: FONTS.size.small,
          marginBottom: 15,
        }}
      >
        {quantity}, Price
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <Text style={styles.price}>{price}</Text>

        <TouchableOpacity onPress={onAddToCart}>
          <Add width={47} height={47} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    marginVertical: 5,
    // alignItems: "center",
    width: 175,
    height: 250,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    position: "relative",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    alignSelf: "center",
    width: 105,
    height: 75,
    resizeMode: "contain",
    marginBottom: 20,
  },
  name: {
    fontFamily: FONTS.semi,
    fontSize: FONTS.size.medium,
    color: "#181725",
    marginTop: 5,
    marginBottom: 10,
    textAlign: "left",
  },
  price: {
    fontFamily: FONTS.semi,
    fontSize: FONTS.size.large,
    color: "#181725",
    marginVertical: 5,
    alignSelf: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  addButton: {
    backgroundColor: "green",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCard;
