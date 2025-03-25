// components/SectionCarousel.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import ProductCard from "../cards/ProductCard";
import { FONTS } from "../../constants/Fonts";
import { useRouter } from "expo-router";
import BannerCard from "../cards/BannerCard";
import { useCart } from "@/context/CartContext";

type SectionCarouselProps = {
  title: string;
  data: ProductItem[];
  secondaryData?: BannerItem[];
  seeAllText?: string;
  onSeeAllPress?: () => void;
  section?: string; // Section identifier
};

export interface BannerItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
  imagePath: string; // Add path to the image file
  color: string;
}

export interface ProductItem {
  id: string;
  image: ImageSourcePropType;
  imagePath: string; // Add path to the image file
  name: string;
  price: string;
  quantity: string;
}

const SectionCarousel: React.FC<SectionCarouselProps> = ({
  title,
  data,
  secondaryData,
  seeAllText = "See all",
  onSeeAllPress,
  section, // Section identifier
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const handleSeeAllPress = () => {
    if (onSeeAllPress) {
      onSeeAllPress();
    } else {
      // Use router.navigate for non-parameterized routes
      // This is a workaround for TypeScript errors with pathname strings
      try {
        // @ts-ignore - Ignoring TypeScript error for navigation
        router.navigate("beverages");
      } catch (error) {
        // Fallback to push with pathname if navigate doesn't work
        router.push({
          pathname: "/beverages" as any,
        });
      }
    }
  };

  const handleProductPress = (item: ProductItem | BannerItem) => {
    // Pass product details including the imagePath to the details page
    const productDetail = {
      id: item.id,
      name: item.name,
      price: "price" in item ? item.price : "$4.99", // Default price for BannerItem
      quantity: "quantity" in item ? item.quantity : "1kg", // Default quantity for BannerItem
      imagePath: item.imagePath, // Add the image path to be used in product details
    };

    // Include the imagePath in the query params
    const queryParams = `id=${encodeURIComponent(
      productDetail.id
    )}&name=${encodeURIComponent(
      productDetail.name
    )}&price=${encodeURIComponent(
      productDetail.price
    )}&quantity=${encodeURIComponent(
      productDetail.quantity
    )}&imagePath=${encodeURIComponent(
      productDetail.imagePath
    )}`;

    console.log(`Navigating to product details for: ${productDetail.name}`);
    console.log(`Image path: ${productDetail.imagePath}`);

    // Use direct string-based navigation
    router.push(`/product-details?${queryParams}`);
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.seeAllText}>{seeAllText}</Text>
        </TouchableOpacity>
      </View>
      {/* Conditionally render the second FlatList if secondaryData is provided */}
      {secondaryData && secondaryData.length > 0 && (
        <FlatList
          data={secondaryData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProductPress(item)}>
              <BannerCard
                image={item.image}
                name={item.name}
                color={item.color}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onPress={() => handleProductPress(item)}
            onAddToCart={() => {
              // Add the item to cart using CartContext with section information
              addToCart({
                id: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
              }, 1, section || title.toLowerCase().replace(' ', '-'));
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 20,
    paddingLeft: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
  },
  sectionTitle: {
    fontFamily: FONTS.semi,
    fontSize: FONTS.size.header,
    color: "#181725",
    marginBottom: 15,
  },
  seeAllText: {
    color: "#53B175",
    fontFamily: FONTS.medium,
    fontSize: FONTS.size.medium,
  },
});

export default SectionCarousel;
