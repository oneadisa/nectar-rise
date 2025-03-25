// app/product-details.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { FONTS } from "@/constants/Fonts";
import BackSvg from "@/components/figma/Back";
import Share from "@/components/figma/Share";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

export default function ProductDetails() {
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log("ProductDetails screen mounted");
    console.log(params);
  }, [params]);

  const productName = params.name as string;
  const imagePath = params.imagePath as string; // e.g., '@/assets/images/chicken.png'
  console.log("Product name:", productName);
  console.log("Image path:", imagePath);

  // Image mapping - this is the only reliable way to handle images in React Native
  const imageMap: Record<string, any> = {
    "@/assets/images/banana.png": require("@/assets/images/banana.png"),
    "@/assets/images/apple.png": require("@/assets/images/apple.png"),
    "@/assets/images/pepper.png": require("@/assets/images/pepper.png"),
    "@/assets/images/ginger.png": require("@/assets/images/ginger.png"),
    "@/assets/images/meat.png": require("@/assets/images/meat.png"),
    "@/assets/images/chicken.png": require("@/assets/images/chicken.png"),
    "@/assets/images/pulses.png": require("@/assets/images/pulses.png"),
    "@/assets/images/rice.png": require("@/assets/images/rice.png"),
  };

  // Default fallback image
  const defaultImage = require("@/assets/images/banana.png");

  // Get the appropriate image source
  const imageSource =
    imagePath && imageMap[imagePath] ? imageMap[imagePath] : defaultImage;

  const product = {
    id: (params.id as string) || "unknown",
    name: productName || "Unnamed Product",
    price: (params.price as string) || "$0.00",
    quantity: (params.quantity as string) || "1kg",
  };

  const [quantity, setQuantity] = useState(1);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const isProductFavorite = isFavorite(product.id);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const toggleFavorite = () => {
    if (isProductFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        image: imageSource,
        price: product.price,
        quantity: product.quantity,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <BackSvg width={20} height={20} fill="#181725" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()}>
            <Share width={20} height={20} fill="#181725" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={imageSource} // Use pre-resolved image source
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <View style={styles.productHeader}>
            <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.weight}>{product.quantity}, Price</Text>
            </View>
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons
                name={isProductFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isProductFavorite ? "#FF5A5F" : "#7C7C7C"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.quantityContainer}>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                onPress={handleDecrease}
                style={styles.quantityButton}
              >
                <Icon name="remove" size={20} color="#53B175" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={handleIncrease}
                style={styles.quantityButton}
              >
                <Icon name="add" size={20} color="#53B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>{product.price}</Text>
          </View>
          <TouchableOpacity style={styles.accordionItem}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <Icon name="keyboard-arrow-down" size={24} color="#181725" />
          </TouchableOpacity>
          <Text style={styles.description}>
            {product.name} Are Nutritious. {product.name} May Be Good For Weight
            Loss. {product.name}
            May Be Good For Your Heart. As Part Of A Healtful And Varied Diet.
          </Text>
          <TouchableOpacity style={styles.accordionItem}>
            <Text style={styles.sectionTitle}>Nutritions</Text>
            <View style={styles.nutritionBadge}>
              <Text style={styles.nutritionText}>100gr</Text>
              <Icon name="keyboard-arrow-right" size={24} color="#181725" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accordionItem}>
            <Text style={styles.sectionTitle}>Review</Text>
            <View style={styles.reviewStars}>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon
                    key={star}
                    name="star"
                    size={18}
                    color={star <= 4 ? "#F3603F" : "#E2E2E2"}
                  />
                ))}
              </View>
              <Icon name="keyboard-arrow-right" size={24} color="#181725" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => {
              addToCart({
                id: product.id,
                name: product.name,
                image: imageSource,
                price: product.price,
                quantity: product.quantity,
              }, quantity);
              // Provide visual feedback that item was added
              console.log(`Added ${quantity} ${product.name} to cart`);
            }}
          >
            <Text style={styles.addButtonText}>Add To Basket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F3F2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: 329,
    height: 200,
    resizeMode: "contain",
    // backgroundColor: "#FAFAFA",
  },
  imageContainer: {
    alignItems: "center",
    // marginBottom: 20,
    width: "100%",
    height: 220,
    backgroundColor: "#F2F3F2",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    overflow: "hidden",
    zIndex: 2,
  },
  details: {
    paddingTop: 40,
    padding: 20,
    backgroundColor: "#FFFFFF",
    marginTop: -15,
    // height: 800,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    fontFamily: FONTS.semi,
    fontSize: 24,
    color: "#181725",
    marginBottom: 5,
  },
  weight: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: "#7C7C7C",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    color: "#181725",
    marginHorizontal: 15,
  },
  price: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: "#181725",
  },
  accordionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  sectionTitle: {
    fontFamily: FONTS.semi,
    fontSize: 16,
    color: "#181725",
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: "#7C7C7C",
    lineHeight: 20,
    marginVertical: 10,
  },
  nutritionBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  nutritionText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: "#7C7C7C",
    backgroundColor: "#EBEBEB",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginRight: 10,
  },
  reviewStars: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#53B175",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 30,
  },
  addButtonText: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    color: "#FFFFFF",
  },
});
