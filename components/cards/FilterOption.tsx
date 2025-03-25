// components/FilterOption.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";

interface FilterOptionProps {
  title: string;
  options: string[];
  selected: string[];
  onSelect: (option: string) => void;
  type: "checkbox" | "radio";
}

const FilterOption: React.FC<FilterOptionProps> = ({
  title,
  options,
  selected,
  onSelect,
  type,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <TouchableOpacity
            key={option}
            style={styles.option}
            onPress={() => onSelect(option)}
          >
            <Icon
              name={
                isSelected
                  ? type === "checkbox"
                    ? "check-box"
                    : "radio-button-checked"
                  : type === "checkbox"
                  ? "check-box-outline-blank"
                  : "radio-button-unchecked"
              }
              size={20}
              color={isSelected ? COLORS.light.primary : COLORS.light.muted}
            />
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.large,
    color: COLORS.light.text,
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  optionText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.medium,
    color: COLORS.light.text,
    marginLeft: 10,
  },
});

export default FilterOption;
