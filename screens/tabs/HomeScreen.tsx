// app/(tab)/index.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  ViewToken,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
// import ProductCard from "../../components/cards/ProductCard";
import { COLORS } from "../../constants/Colors";
import { FONTS } from "../../constants/Fonts";
import Carrot from "@/components/figma/Carrot";
import { Ionicons } from "@expo/vector-icons";
import LocationPin from "@/components/figma/LocationPin";
// import { Paginator } from "@/components/Paginator";
// import BannerSlide from "@/components/BannerSlide";
import {
  products1,
  products2,
  products3,
  bannerProduct,
} from "@/types/contentArrays/homeScreenProducts";
import { bannerSlides } from "@/types/contentArrays/bannerSlides";
import SectionCarousel from "@/components/ui/SectionCarousel";
import BannerSlider from "@/components/ui/BannerSlider";
import { RootStackParamList } from "@/types/navigation";
import { NavigationProp } from "@react-navigation/native";

type HomeScreenNavigationProp = NavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.carrotContainer}>
            <Carrot width={24} height={28} fill="#55B277" />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <LocationPin width={16} height={19} fill="#55B277" />
            <Text style={styles.headerText}>Dhaka, Banassre</Text>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={18}
              color="#181B19"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Search Store"
              placeholderTextColor="#777"
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
          <BannerSlider data={bannerSlides} />
        </View>

        <SectionCarousel
          title="Exclusive Offer"
          data={products1}
          section="exclusive"
          // navigation = {navigation}
        />

        <SectionCarousel
          title="Best Selling"
          data={products2}
          section="bestselling"
          // navigation = {navigation}
        />

        <SectionCarousel
          title="Groceries"
          data={products3}
          section="groceries"
          secondaryData={bannerProduct}
        />

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Groceries</Text>
          <FlatList
            data={[
              {
                id: "1",
                image: "@/assets/images/pulses.png",
                name: "Pulses",
              },
              {
                id: "2",
                image: "@/assets/images/rice.png",
                name: "Rice",
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  scrollViewContent: {
    paddingBottom: 50, // Add padding to prevent content from being hidden behind tab bar
  },
  bannerContainer: {
    marginVertical: 15,
  },
  paginator: {
    marginTop: 10,
    marginBottom: 0,
  },
  section: {
    marginVertical: 20,
    paddingLeft: 15,
  },
  header: {
    alignItems: "center",
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  headerText: {
    marginLeft: 10,
    fontFamily: FONTS.medium,
    fontSize: FONTS.size.large,
    color: "#4C4F4D",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    // marginBottom: 15,
    height: 51,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: "#7C7C7C",
    // fontWeight: "400",
  },
  banner: {
    backgroundColor: "#e0e0e0",
    padding: 20,
    margin: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  bannerText: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.header,
    color: COLORS.light.text,
  },
  bannerSubText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.medium,
    color: COLORS.light.text,
    marginVertical: 5,
  },
  continueButton: {
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
  },
  sectionTitle: {
    fontFamily: FONTS.semi,
    fontSize: FONTS.size.header,
    color: "#181725",
  },
  categoryCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    margin: 5,
    alignItems: "center",
    width: 150,
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  categoryText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.medium,
    color: COLORS.light.text,
    marginTop: 5,
  },
  carrotContainer: {
    marginBottom: 7,
    alignItems: "center",
  },
});

export default HomeScreen;

{
  /* <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="location-on" size={24} color={COLORS.light.text} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Dhaka, Banassre</Text>
        <TouchableOpacity onPress={() => navigation.navigate("search")}>
          <Icon name="search" size={24} color={COLORS.light.text} />
        </TouchableOpacity>
      </View> */
}

{
  /* <View style={styles.bannerContainer}>
          <FlatList
            data={banners}
            renderItem={({ item }) => <BannerSlide item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id.toString()}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: bannerScrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={bannerRef}
          />
          <Paginator
            currentSlide={currentBanner}
            data={banners}
            scrollX={bannerScrollX}
            containerStyle={styles.paginator}
          />
        </View>




      
      

 */
}
