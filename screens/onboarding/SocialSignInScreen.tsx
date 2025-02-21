import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { CustomButton } from "../../components/CustomButton";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import CountryFlag from "react-native-country-flag";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import BackSvg from "@/components/figma/Back";

export const SocialSignInScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneSignIn = () => {
    router.push("/(onboarding)/phone");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => router.back()} style={styles.goBack}>
          <BackSvg width={100} height={100} fill="#181725" />
        </TouchableOpacity>
        <View>
          <Image
            source={require("../../assets/images/veggies.png")}
            style={styles.imageContainer}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Get your groceries</Text>
            <Text style={styles.title}>with nectar</Text>
          </View>

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

          <View style={styles.textContainer}>
            <Text style={styles.text}>Or connect with social media</Text>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              title="Continue with Google"
              onPress={handlePhoneSignIn}
              variant="primary"
              style={styles.socialButton}
              textStyle={styles.socialButtonText}
              icon={
                <AntDesign
                  name="google"
                  size={24}
                  color="#fbfbfb"
                  style={styles.icon}
                />
                // <MaterialCommunityIcons
                //   name="google"
                //   size={24}
                //   color="white"
                //   style={styles.icon}
                // />
              }
            />

            <CustomButton
              title="Continue with Facebook"
              onPress={handlePhoneSignIn}
              variant="primary"
              style={styles.facebookButton}
              icon={
                <FontAwesome
                  name="facebook"
                  size={24}
                  color="#fbfbfb"
                  style={styles.icon}
                />
                // <MaterialCommunityIcons
                //   name="facebook"
                //   size={24}
                //   color="#fff"
                //   style={styles.icon}
                // />
              }
            />

            {/* <CustomButton
            title="Continue with Phone"
            onPress={handlePhoneSignIn}
            style={styles.phoneButton}
          /> */}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  goBack: { padding: 25, position: "absolute", top: 40, left: 10, zIndex: 2 },
  imageContainer: {
    zIndex: 0,
    width: "100%",
    height: 374,
    backgroundColor: "#FBFBFB",
  },
  content: {
    // marginTop: 20,
    // alignContent: "center",
    // justifyContent: "center",
    backgroundColor: "#FBFBFB",
    zIndex: 1,
    flex: 1,
    padding: 20,
  },

  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#333",
    lineHeight: 32,
    fontFamily: "GilroySemi",
  },

  textContainer: {
    margin: 20,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "GilroyMedium",
    color: "#828282",
  },
  buttonContainer: {
    width: "100%",
    // paddingHorizontal: 20,
  },
  socialButton: {
    marginBottom: 20,
    backgroundColor: "#4285F4",
    // borderWidth: 1,
    // borderColor: "#E2E2E2",
    flexDirection: "row",
    // alignItems: "",
    // justifyContent: "center",
  },
  socialButtonText: {
    color: "#FBFBFB",
  },
  facebookButton: {
    backgroundColor: "#3B5998",
    // borderColor: "#4267B2",
  },
  facebookButtonText: {
    color: "#FBFBFB",
  },
  phoneButton: {
    marginTop: 20,
  },
  icon: {
    // marginLeft: -30,
    marginRight: 25,
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
  input: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
});
