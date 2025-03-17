import React, { useState } from "react";
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
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import { router } from "expo-router";

import CountryFlag from "react-native-country-flag";
import Next from "@/components/Next";

import { BackButton, Background } from "../../components";

const { width, height } = Dimensions.get("window");
export const PhoneVerificationScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleContinue = () => {
    // Add phone number validation logic here
    router.push("/(onboarding)/otp");
  };

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

    <View style={{ backgroundColor: "#fcfcfc" }}>
      <Background>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <BackButton />
              <View style={styles.content}>
                <Text style={styles.title}>Enter your mobile number</Text>
                <Text style={styles.subtitle}>Mobile number </Text>

                <View style={styles.inputContainer}>
                  <View style={styles.countryCode}>
                    <CountryFlag isoCode="bd" size={25} />
                  </View>
                  <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+880</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    // placeholder="Phone Number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <Next onPress={handleContinue} />
        </KeyboardAvoidingView>
      </Background>
    </View>

    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
  },
  goBack: { padding: 25, position: "absolute", top: 40, left: 10, zIndex: 2 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    // backgroundColor: "#fcfcfc",
    marginTop: 120,
    padding: 20,
    zIndex: 0,
    // height: '100%'
  },
  title: {
    fontSize: 24,
    // fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    fontFamily: "GilroyMedium",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
    fontFamily: "GilroyMedium",
  },
  input: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    padding: 15,
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
  countryCode: {
    // backgroundColor: "#f5f5f5",
    // padding: 15,
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
});
