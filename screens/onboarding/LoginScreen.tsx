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
  ActivityIndicator,
  Alert,
} from "react-native";

import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/slices/authSlice";
import { RootState, AppDispatch } from "@/store/store";

import Carrot from "@/components/figma/Carrot";
import Svg, { Path } from "react-native-svg";
import { CustomButton, Background } from "../../components";
import { FONTS } from "@/constants/Fonts";
import { BackButton } from "../../components";

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

export const LoginScreen = ({
  onBlur,
  onFocus,
  returnKeyType = "done",
}: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    // Validate input
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const resultAction = await dispatch(
        loginUser({ username: email, password })
      );

      if (loginUser.fulfilled.match(resultAction)) {
        console.log("Login successful");
        router.push("/(tab)");
      } else if (loginUser.rejected.match(resultAction)) {
        setError((resultAction.payload as string) || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push("/(onboarding)/signup");
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
              <Text style={styles.title}>Login</Text>
              <Text style={styles.subtitle}>Enter your email and password</Text>
              {/* <View style={styles.innerContainer}> */}
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
                    // placeholder="*****"
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

              {/* Forgot Password Link */}
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Error Message */}
              {error && <Text style={styles.errorText}>{error}</Text>}

              {/* Login Button */}
              <CustomButton
                title={isLoading ? "Logging in..." : "Login"}
                onPress={handleLogin}
                style={styles.button}
                disabled={isLoading}
              />
              {isLoading && (
                <ActivityIndicator
                  style={{ marginTop: 10 }}
                  color="#55B277"
                  size="small"
                />
              )}

              {/* Sign Up Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(onboarding)/signup")}
                >
                  <Text style={styles.signupLink}>Signup</Text>
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
  errorText: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
    fontFamily: FONTS.medium,
  },
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
    fontFamily: FONTS.Gilroy,
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
    fontFamily: FONTS.Gilroy,
  },
  // input: {
  //   fontSize: 16,
  //   color: "#000000",
  //   paddingVertical: 8,
  //   paddingHorizontal: 0,
  //   fontFamily: FONTS.Gilroy",
  // },
  // passwordContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  // eyeIcon: {
  //   padding: 8,
  // },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#666",
    fontSize: 14,
    fontFamily: FONTS.Gilroy,
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
    fontFamily: FONTS.Gilroy,
  },
  signupLink: {
    color: "#81B29A", // Same green as login button
    fontSize: 14,
    fontWeight: "500",
    fontFamily: FONTS.Gilroy,
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
    fontFamily: FONTS.GilroyMedium,
  },
  subtitle: {
    // textAlign: "center",
    fontSize: 16,
    color: "#666ghsjsj",
    marginBottom: 25,
    fontFamily: FONTS.Gilroy,
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
