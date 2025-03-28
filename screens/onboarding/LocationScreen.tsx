import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { CustomButton, CustomPicker, Background } from "../../components";
import { router } from "expo-router";
import { BackButton } from "../../components";
import Location from "@/components/figma/Location";
import { FONTS } from "@/constants/Fonts";

const { width, height } = Dimensions.get("window");

export const LocationScreen = () => {
  const [selectedZone, setSelectedZone] = useState("Bangsree");
  const zones = ["Bangsree", "Sukhumvit", "Silom", "Sathorn"];

  const [selectedAreaType, setSelectedAreaType] = useState("Residential");

  const areaTypes = [
    "Residential",
    "Commercial",
    "Mixed-Use",
    "Industrial",
    "Central Business District",
    "Shopping District",
    "Entertainment Zone",
    "Educational Zone",
    "Tech Hub",
    "Creative District",
    "Heritage Area",
    "Waterfront",
    "Urban Core",
    "Suburban",
    "Business Park",
  ];

  const handleSubmit = () => {
    router.push("/(onboarding)/login");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ backgroundColor: "#fcfcfc" }}>
        <Background>
          <View>
            <BackButton />
            <View style={styles.content}>
              <View style={styles.locationContainer}>
                <Location width={225} height={171} fill="#55B277" />
              </View>
              <Text style={styles.title}>Select Your Location</Text>
              <Text style={styles.subtitle}>
                Switch on your location to stay in tune with what's happening in
                your area
              </Text>

              <Text style={styles.inputLabel}>Your Zone</Text>

              <View>
                <CustomPicker
                  value={selectedZone}
                  onValueChange={setSelectedZone}
                  options={zones}
                />
              </View>
              <Text style={styles.inputLabel}>Your Area</Text>
              <View>
                <CustomPicker
                  value={selectedAreaType}
                  onValueChange={setSelectedAreaType}
                  options={areaTypes}
                />
              </View>

              <CustomButton
                title="Submit"
                onPress={handleSubmit}
                style={styles.button}
              />
            </View>
          </View>
        </Background>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: 100,
    padding: 20,
    zIndex: 0,
    height: "100%",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    fontFamily: FONTS.GilroyMedium,
  },
  subtitle: {
    lineHeight: 24,
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 100,
    fontFamily: FONTS.Gilroy,
  },
  input: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  locationContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  countryCode: {
    borderRadius: 8,
    marginRight: 10,
    justifyContent: "center",
  },
  countryCodeText: {
    fontSize: 16,
    color: "#333",
    borderRightWidth: 1,
    borderLeftColor: "#7C7C7C",
    paddingRight: 10,
  },
  inputLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
    fontFamily: FONTS.GilroyMedium,
  },
});
