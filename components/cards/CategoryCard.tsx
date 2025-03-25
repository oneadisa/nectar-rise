// components/CategoryCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";

interface CategoryCardProps {
  image: any; // Changed from string to any to support require() images
  title: string;
  onPress: () => void;
  style?: any; // Added style prop
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  image,
  title,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <Image
        source={typeof image === "string" ? { uri: image } : image}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.light.background,
    borderRadius: 18,
    padding: 15,
    margin: 5,
    width: 174.5,
    height: 190,
    justifyContent: "center",
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.light.text,
    textAlign: "center",
    lineHeight: 22,
  },
});

export default CategoryCard;
