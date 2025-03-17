// app/filters.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import FilterOption from "@/components/cards/FilterOption";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import BackButton from "@/components/BackButton";

const FiltersScreen = () => {
  const navigation = useNavigation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleCategorySelect = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleBrandSelect = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerText}>Filters</Text>
        <TouchableOpacity>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <FilterOption
          title="Categories"
          options={["Eggs", "Noodles & Pasta", "Chips & Crisps", "Fast Food"]}
          selected={selectedCategories}
          onSelect={handleCategorySelect}
          type="checkbox"
        />
        <FilterOption
          title="Brand"
          options={["Organic", "Individual Collection", "Rad", "Rest Formats"]}
          selected={selectedBrands}
          onSelect={handleBrandSelect}
          type="checkbox"
        />
      </ScrollView>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply Filter</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.header,
    color: COLORS.light.text,
  },
  clearText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.medium,
    color: COLORS.light.text,
  },
  applyButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    margin: 15,
  },
  applyButtonText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.large,
    color: COLORS.light.background,
  },
});

export default FiltersScreen;
