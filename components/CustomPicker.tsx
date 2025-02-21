import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const ChevronIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9L12 15L18 9"
      stroke="#8E8E93"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Props {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
}

const CustomPicker = ({ value, onValueChange, options }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label text */}
      {/* <Text style={styles.label}>Your Zone</Text> */}

      {/* Main picker button */}
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedValue}>{value}</Text>
        <View style={styles.chevron}>
          <ChevronIcon />
        </View>
      </TouchableOpacity>

      {/* Bottom border line */}
      <View style={styles.bottomBorder} />

      {/* Modal for options */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    onValueChange(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 6,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#909090",
    marginBottom: 8,
    fontWeight: "500",
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    // paddingHorizontal: 4,
  },
  selectedValue: {
    fontSize: 19,
    color: "#828282",
    // fontWeight: "400",
    fontFamily: "GilroyMedium", // Using system font, adjust as needed
  },
  bottomBorder: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginTop: 8,
  },
  chevron: {
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: "80%",
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionText: {
    fontSize: 18,
    color: "#000000",
  },
});

// Usage example:
const App = () => {
  const [selectedZone, setSelectedZone] = useState("Bangsree");
  const zones = ["Bangsree", "Sukhumvit", "Silom", "Sathorn"];

  return (
    <View style={{ padding: 20 }}>
      <CustomPicker
        value={selectedZone}
        onValueChange={setSelectedZone}
        options={zones}
      />
    </View>
  );
};

export default CustomPicker;
