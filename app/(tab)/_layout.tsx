// app/(tab)/_layout.tsx
import { Tabs, router, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { Platform, Animated } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { isAuthenticated } from "@/utils/authUtils";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, StyleSheet } from "react-native";
import { FONTS } from "@/constants/Fonts";

const fadeAnim = (progress: Animated.AnimatedInterpolation<number>) => {
  return {
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
  };
};

const shopGreen = require("../../assets/images/tab-icons/png/shop-green.png");
const shopBlack = require("../../assets/images/tab-icons/png/shop-black.png");
const exploreGreen = require("../../assets/images/tab-icons/png/search-green.png");
const exploreBlack = require("../../assets/images/tab-icons/png/search-black.png");
const cartGreen = require("../../assets/images/tab-icons/png/cart-green.png");
const cartBlack = require("../../assets/images/tab-icons/png/cart-black.png");
const accountGreen = require("../../assets/images/tab-icons/png/account-green.png");
const accountBlack = require("../../assets/images/tab-icons/png/account-black.png");
const favoriteGreen = require("../../assets/images/tab-icons/png/favorite-green.png");
const favoriteBlack = require("../../assets/images/tab-icons/png/favorite-black.png");

// const walletBlue = require("../assets/images/wallet-blue.png");

const styles = StyleSheet.create({
  logo: { width: 25, height: 25, resizeMode: "contain" },
});
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const authState = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login screen if not authenticated
      router.replace('/(onboarding)/login');
    }
  }, [authState.isLoggedIn]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#53B175",
        tabBarInactiveTintColor: "#181725",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 85,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          shadowColor: "#E6EBF3",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.5,
          shadowRadius: 8,
          elevation: 10, // for Android shadow
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 20,
          paddingTop: 10,
          paddingLeft: 10,
          paddingRight: 10,
          zIndex: 10, // Ensure the tab bar appears above other elements
          backgroundColor: "#FFFFFF",
        },
        tabBarIconStyle: {
          marginBottom: 5,
        },
        tabBarLabelStyle: {
          fontFamily: FONTS.Gilroy, // Custom font (GilroyBold)
          fontSize: 12, // Adjust font size for readability
        },
        // sceneContainerStyle: { backgroundColor: Colors[colorScheme ?? "light"].background },
        // tabBarTransitionPreset: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? shopGreen : shopBlack}
              style={styles.logo}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? exploreGreen : exploreBlack}
              style={styles.logo}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? cartGreen : cartBlack}
              style={styles.logo}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? favoriteGreen : favoriteBlack}
              style={styles.logo}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? accountGreen : accountBlack}
              style={styles.logo}
            />
          ),
          tabBarActiveTintColor: "#53B175",
          tabBarInactiveTintColor: "#181725",
        }}
      />
    </Tabs>
  );
}
