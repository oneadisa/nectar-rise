import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

export function Background({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
});
