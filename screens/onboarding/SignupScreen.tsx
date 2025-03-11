import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { router } from "expo-router";
import Carrot from "@/components/figma/Carrot";
import Svg, { Path } from "react-native-svg";
import { CustomButton, Background, BackButton } from "../../components";
import { Fonts } from "@/constants/Fonts";

interface EyeProps {
  color?: string;
  isOpen: boolean;
}

// Eye icon for password visibility
const EyeIcon = ({ color = "#8E8E93", isOpen }: EyeProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    {/* Base eye shape - always visible */}
    <Path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 15a3 3 0 100-6 3 3 0 000 6z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Diagonal line for crossed out state */}
    {!isOpen && (
      <Path
        d="M3 3l18 18"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </Svg>
);

const { width, height } = Dimensions.get("window");

export const SignupScreen = ({
  onBlur,
  onFocus,
  returnKeyType = "done",
}: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Implement login logic here
    console.log("Login attempted with:", email, password);
    router.push("/(tab)");
  };

  const goToLogin = () => {
    router.push("/(onboarding)/login");
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ backgroundColor: "#fcfcfc" }}>
        <Background>
          <View>
            <BackButton />
            <View style={styles.content}>
              <View style={styles.carrotContainer}>
                <Carrot width={48} height={56} fill="#55B277" />
              </View>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.subtitle}>
                Enter your credentials to continue
              </Text>
              {/* <View style={styles.innerContainer}> */}
              {/* Username Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Username </Text>
                <TextInput
                  style={styles.input}
                  value={userName}
                  onChangeText={setUserName}
                  placeholder="Afsar Hossen Shuvo"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#A0A0A0"
                />
              </View>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email </Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="imshuvo97@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#A0A0A0"
                />
              </View>
              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    value={password}
                    onChangeText={setPassword}
                    // placeholder="Password"
                    keyboardType="default"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#A0A0A0"
                    autoComplete="password"
                    textContentType="password"
                    returnKeyType={returnKeyType}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    importantForAutofill="yes"
                    accessibilityLabel={"Password input"}
                    accessibilityHint="Enter your password"
                    accessibilityRole="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <EyeIcon isOpen={showPassword} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.termsContainer}>
                <Text style={styles.signupText}>
                  By continuing you agree to our
                </Text>
                <TouchableOpacity onPress={goToLogin}>
                  <Text style={styles.signupLink}> Terms of Service</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.termsContainer}>
                <Text style={styles.signupText}>and</Text>
                <TouchableOpacity onPress={goToLogin}>
                  <Text style={styles.signupLink}> Privacy Policy</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <CustomButton
                title="Sign Up"
                onPress={handleLogin}
                style={styles.button}
              />

              {/* Sign Up Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Already have an account? </Text>
                <TouchableOpacity onPress={goToLogin}>
                  <Text style={styles.signupLink}>Login</Text>
                </TouchableOpacity>
              </View>
              {/* </View> */}
            </View>
          </View>
        </Background>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    // Remove justifyContent: "space-between"
  },
  passwordInput: {
    flex: 1, // Add this to make input take available space
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 8, // Add space between input and icon
  },
  input: {
    fontSize: 16,
    color: "#000000",
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontFamily: Fonts.Gilroy,
    minHeight: 40, // Add minimum height for better touch area
  },
  innerContainer: {
    padding: 20,
    // backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    marginBottom: 35,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    fontFamily: Fonts.Gilroy,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#666",
    fontSize: 14,
    fontFamily: Fonts.Gilroy,
  },
  termsContainer: {
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    textAlign: "left",
    // marginBottom: 24,
    paddingBottom: 10,
  },
  signupContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#666",
    fontSize: 14,
    fontFamily: Fonts.Gilroy,
  },
  signupLink: {
    color: "#81B29A", // Same green as login button
    fontSize: 14,
    fontWeight: "500",
    fontFamily: Fonts.Gilroy,
  },
  background: {
    width: width,
    height: height,
  },
  goBack: { padding: 25, position: "absolute", top: 40, left: 10, zIndex: 2 },

  content: {
    // backgroundColor: "#fcfcfc",

    marginTop: 80,
    padding: 20,
    zIndex: 0,
    // alignItems: "center",
    // height: "100%",
  },
  title: {
    fontSize: 24,
    // fontWeight: "bold",
    // textAlign: "center",
    marginBottom: 20,
    color: "#333",
    fontFamily: Fonts.GilroyMedium,
  },
  subtitle: {
    // textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
    fontFamily: Fonts.Gilroy,
  },

  button: {
    marginTop: 20,
  },

  carrotContainer: {
    // flexDirection: "row",
    marginBottom: 70,
    alignItems: "center",
  },
});
