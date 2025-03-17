// components/BannerSlide.tsx
import React from "react";
import {
  ImageBackground,
  Text,
  useWindowDimensions,
  View,
  StyleSheet,
} from "react-native";
import { COLORS } from "../constants/Colors";
import { FONTS } from "../constants/Fonts";
import { BannerItem } from "./Banner";

export interface BannerSlideProps {
  item: BannerItem;
}

export default function BannerSlide({ item }: BannerSlideProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width: width - 30 }]}>
      <ImageBackground
        source={item.backgroundImage}
        style={[styles.background, { width: width - 30 }]}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginHorizontal: 15,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Light overlay for readability
  },
  content: {
    padding: 20,
    alignItems: "flex-end",
    gap: 5,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.header,
    color: COLORS.light.text,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.medium,
    color: "green", // Matches the green color in the image
  },
});
