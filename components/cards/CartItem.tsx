// components/cards/CartItem.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import Mas from "../figma/Mas";
import Menos from "../figma/Menos";

interface CartItemProps {
  image: any; // Changed to any to support require() images
  name: string;
  price: string;
  quantity: string; // Changed to string for "1kg, Price" format
  count: number; // Renamed from quantity to count
  section?: string; // Optional section identifier
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  price,
  quantity,
  count,
  section, // Added section prop
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemContent}>
        <Image source={image} style={styles.productImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productQuantity}>{quantity}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={[styles.quantityButton, count === 1 && styles.disabledButton]}
              onPress={onDecrease}
              disabled={count === 1}
            >
              <Text style={[styles.quantityButtonText, count === 1 && styles.disabledButtonText]}>
                <Menos />
              </Text>
            </TouchableOpacity>
            <Text style={styles.countText}>{count}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={onIncrease}
            >
              <Text style={styles.quantityButtonText}>
                <Mas />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.rightContent}>
        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="close-outline" size={24} color="#7C7C7C" />
        </TouchableOpacity>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    marginHorizontal: 25,
    borderBottomColor: "#E2E2E2",
  },
  itemContent: {
    flexDirection: "row",
    flex: 1,
  },
  productImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  itemDetails: {
    marginLeft: 15,
    justifyContent: "space-between",
  },
  productName: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: "#181725",
  },
  productQuantity: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "#7C7C7C",
    marginTop: 5,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  quantityButtonText: {
    fontSize: 20,
    color: "#53B175",
    fontWeight: "500",
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: "#A0A0A0",
  },
  countText: {
    marginHorizontal: 15,
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#181725",
  },
  rightContent: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  price: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#181725",
  },
});

export default CartItem;
