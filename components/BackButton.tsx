import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import BackSvg from "./figma/Back";

interface BackButtonProps {
  onPress?: () => void;
  fill?: string;
  width?: number;
  height?: number;
  style?: object;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  fill = "#181725",
  width = 100,
  height = 100,
  style,
}) => {
  const handlePress = onPress || (() => router.back());

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.goBack, style]}
    >
      <BackSvg width={width} height={height} fill={fill} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goBack: {
    padding: 25,
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 2,
  },
});

export default BackButton;