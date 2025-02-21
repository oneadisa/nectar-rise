import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { CustomButton } from "../../components/CustomButton";
import { router } from "expo-router";
// import SvgUri from 'react-native-svg-uri';

const { width, height } = Dimensions.get("window");

export const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/welcome-background.png")}
        style={styles.imageContainer}
        resizeMode="cover"
      >
        <View style={styles.contentContainer}>
          <Image
            source={require("../../assets/images/white-carrot.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.title}>to our store</Text>
          <Text style={styles.subtitle}>
            Get your groceries in as fast as one hour
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Get Started"
            onPress={() => router.push("/(onboarding)/social-signin")}
            style={styles.button}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    width: width,
    height: height,
  },
  logo: {
    width: 48,
    height: 56,
  },

  contentContainer: {
    marginTop: 440,
    padding: 35,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    marginBottom: 10,
    color: "white",
    fontFamily: "GilroyBold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Gilroy",
    textAlign: "center",
    color: "#FCFCFCB2",
  },
  buttonContainer: {
    padding: 20,
    width: "100%",
  },
  button: {
    marginBottom: 20,
  },
});
