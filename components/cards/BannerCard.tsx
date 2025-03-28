// components/BannerCard.tsx
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
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import Add from "../figma/Add";

interface BannerCardProps {
  image: ImageSourcePropType;
  name: string;
  color: string;
}

const BannerCard: React.FC<BannerCardProps> = ({ image, name, color }) => {
  return (
    <View style={styles.card}>
      {/* Background layer with opacity */}
      <View
        style={[
          styles.background,
          {
            backgroundColor: color,
          },
        ]}
      />
      {/* Content layer with full opacity */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    marginVertical: 5,
    width: 250,
    height: 105,
    position: "relative", // Ensure proper layering
    overflow: "hidden", // Prevent content from spilling outside rounded corners
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Fill the entire card
    opacity: 0.15, // Apply opacity only to the background
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 1, // Ensure content is above the background
    paddingHorizontal: 15, // Match the original paddingHorizontal
  },
  imageContainer: {
    marginRight: 20, // Add spacing between image and text
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  name: {
    fontFamily: FONTS.semi,
    fontSize: 20,
    color: "#181725",
    lineHeight: 24,
  },
  // Removed unused styles (price, actions, addButton) since they weren't used in the original render
});

export default BannerCard;
