import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FONTS } from "@/constants/Fonts";
import Svg, { SvgProps, Circle, Rect } from "react-native-svg";

// Filter Icon SVG Component
const FilterIcon = ({
  width = 19,
  height = 19,
  ...props
}: SvgProps & { width?: number; height?: number }) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Circle cx={6.662} cy={4.458} r={3.3} stroke="#181725" strokeWidth={1.9} />
    <Rect
      width={3.308}
      height={2.083}
      x={0.892}
      y={3.416}
      fill="#181725"
      stroke="#181725"
      strokeWidth={0.3}
      rx={1.042}
    />
    <Circle
      cx={12.319}
      cy={13.807}
      r={3.3}
      stroke="#181725"
      strokeWidth={1.9}
      transform="rotate(-180 12.319 13.807)"
    />
    <Rect
      width={7.836}
      height={2.083}
      x={9.834}
      y={3.416}
      fill="#181725"
      stroke="#181725"
      strokeWidth={0.3}
      rx={1.042}
    />
    <Rect
      width={7.84}
      height={2.083}
      x={9.146}
      y={14.848}
      fill="#181725"
      stroke="#181725"
      strokeWidth={0.3}
      rx={1.042}
      transform="rotate(-180 9.146 14.848)"
    />
    <Rect
      width={2.841}
      height={2.083}
      x={17.995}
      y={14.848}
      fill="#181725"
      stroke="#181725"
      strokeWidth={0.3}
      rx={1.042}
      transform="rotate(-180 17.995 14.848)"
    />
  </Svg>
);

// Checkbox component
interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      {checked ? (
        <View style={styles.checkedBox}>
          <Ionicons name="checkmark" size={16} color="white" />
        </View>
      ) : (
        <View style={styles.uncheckedBox} />
      )}
    </TouchableOpacity>
  );
};

// Filter category item
interface FilterItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  label,
  checked,
  onToggle,
}) => {
  return (
    <View style={styles.filterItem}>
      <Checkbox checked={checked} onPress={onToggle} />
      <Text style={styles.filterItemLabel}>{label}</Text>
    </View>
  );
};

// Main Filter Component
const FilterComponent: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Category filters
  const [categoryFilters, setCategoryFilters] = useState({
    eggs: true,
    noodlesAndPasta: false,
    chipsAndCrisps: false,
    fastFood: false,
  });

  // Brand filters
  const [brandFilters, setBrandFilters] = useState({
    individualCollection: false,
    cocola: true,
    ifad: false,
    kaziFarmas: false,
  });

  // Toggle category filter
  const toggleCategoryFilter = (filter: keyof typeof categoryFilters) => {
    setCategoryFilters({
      ...categoryFilters,
      [filter]: !categoryFilters[filter],
    });
  };

  // Toggle brand filter
  const toggleBrandFilter = (filter: keyof typeof brandFilters) => {
    setBrandFilters({
      ...brandFilters,
      [filter]: !brandFilters[filter],
    });
  };

  // Apply filter and close modal
  const applyFilter = () => {
    // Here you would apply the filter logic
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <FilterIcon />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color="#181725" />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Filters</Text>
                  <View style={styles.placeholder} />
                </View>

                <ScrollView style={styles.filtersContainer}>
                  {/* Categories Section */}
                  <View style={styles.filterSection}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <View style={styles.filterItems}>
                      <FilterItem
                        label="Eggs"
                        checked={categoryFilters.eggs}
                        onToggle={() => toggleCategoryFilter("eggs")}
                      />
                      <FilterItem
                        label="Noodles & Pasta"
                        checked={categoryFilters.noodlesAndPasta}
                        onToggle={() => toggleCategoryFilter("noodlesAndPasta")}
                      />
                      <FilterItem
                        label="Chips & Crisps"
                        checked={categoryFilters.chipsAndCrisps}
                        onToggle={() => toggleCategoryFilter("chipsAndCrisps")}
                      />
                      <FilterItem
                        label="Fast Food"
                        checked={categoryFilters.fastFood}
                        onToggle={() => toggleCategoryFilter("fastFood")}
                      />
                    </View>
                  </View>

                  {/* Brand Section */}
                  <View style={styles.filterSection}>
                    <Text style={styles.sectionTitle}>Brand</Text>
                    <View style={styles.filterItems}>
                      <FilterItem
                        label="Individual Collection"
                        checked={brandFilters.individualCollection}
                        onToggle={() =>
                          toggleBrandFilter("individualCollection")
                        }
                      />
                      <FilterItem
                        label="Cocola"
                        checked={brandFilters.cocola}
                        onToggle={() => toggleBrandFilter("cocola")}
                      />
                      <FilterItem
                        label="Ifad"
                        checked={brandFilters.ifad}
                        onToggle={() => toggleBrandFilter("ifad")}
                      />
                      <FilterItem
                        label="Kazi Farmas"
                        checked={brandFilters.kaziFarmas}
                        onToggle={() => toggleBrandFilter("kaziFarmas")}
                      />
                    </View>
                  </View>
                </ScrollView>

                {/* Apply Button */}
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={applyFilter}
                >
                  <Text style={styles.applyButtonText}>Apply Filter</Text>
                </TouchableOpacity>

                {/* Bottom Indicator */}
                {/* <View style={styles.bottomIndicator} /> */}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 30,
    height: "80%",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: "#181725",
  },
  placeholder: {
    width: 24, // Same width as close button for balance
  },
  filtersContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  filterSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: "#181725",
    marginBottom: 20,
  },
  filterItems: {
    marginLeft: 10,
  },
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  filterItemLabel: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#181725",
    marginLeft: 15,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  uncheckedBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#B1B1B1",
    borderRadius: 5,
  },
  checkedBox: {
    width: 20,
    height: 20,
    backgroundColor: "#53B175",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButton: {
    backgroundColor: "#53B175",
    borderRadius: 19,
    paddingVertical: 15,
    width: "90%",
    alignItems: "center",
    marginTop: 20,
  },
  applyButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: "white",
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#E2E2E2",
    borderRadius: 2.5,
    marginTop: 20,
  },
});

export default FilterComponent;
