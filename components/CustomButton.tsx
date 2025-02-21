import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  style,
  textStyle,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" ? styles.primaryButton : styles.secondaryButton,
        style,
      ]}
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        {icon}
        <Text
          style={[
            styles.text,
            variant === "primary" ? styles.primaryText : styles.secondaryText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 67,
  },
  primaryButton: {
    backgroundColor: "#55B277",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#55B277",
  },
  text: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: "GilroyBold",
    color: "#FFF9FF",
  },
  primaryText: {
    color: "#FFF9FF",
  },
  secondaryText: {
    color: "#55B277",
  },
});
