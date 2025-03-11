import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Continue from "./figma/Continue";
import { StyleSheet } from "react-native";
type Props = {
  text?: string;
  onPress: () => void;
};
const Next = ({ text, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Continue width={70} height={70} fill="#55B277" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 16,
    fontFamily: "GilroyMedium",
    color: "#55B277",
  },
});

export default Next;
