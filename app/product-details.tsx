// app/product-details.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { FONTS } from "@/constants/Fonts";
import { COLORS } from "@/constants/Colors";
import BackSvg from "@/components/figma/Back";
import Share from "@/components/figma/Share";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { fetchProductById } from "@/store/slices/productSlice";
import { addItemToCart } from "@/store/slices/cartSlice";
import { RootState, AppDispatch } from "@/store/store";

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const { selectedProduct, loading } = useSelector(
    (state: RootState) => state.products
  );

  // State for accordion sections
  const [expandedSections, setExpandedSections] = useState({
    productDetail: false,
    nutritions: false,
    reviews: false,
  });

  useEffect(() => {
    // Fetch product details when component mounts
    if (params.id) {
      dispatch(fetchProductById(parseInt(params.id as string)));
    }
  }, [dispatch, params.id]);

  // Image mapping for local assets (fallback)
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

  // Determine image source based on available data
  const getImageSource = () => {
    if (loading || !selectedProduct) {
      return defaultImage;
    }

    // If the product has an image URL from the API
    if (selectedProduct.image && selectedProduct.image.startsWith("http")) {
      return { uri: selectedProduct.image };
    }

    // Check if we have a local image path
    const imagePath = params.imagePath as string;
    if (imagePath && imageMap[imagePath]) {
      return imageMap[imagePath];
    }

    return defaultImage;
  };

  // Get product data either from Redux or fallback to params
  const product = selectedProduct
    ? {
        id: selectedProduct.id.toString(),
        name: selectedProduct.title,
        price:
          selectedProduct.formattedPrice ||
          `$${selectedProduct.price.toFixed(2)}`,
        quantity: selectedProduct.quantity || "1kg",
        description: selectedProduct.description || "",
        category: selectedProduct.category || "",
        rating: selectedProduct.rating || { rate: 0, count: 0 },
      }
    : {
        id: (params.id as string) || "unknown",
        name: (params.name as string) || "Unnamed Product",
        price: (params.price as string) || "$0.00",
        quantity: (params.quantity as string) || "1kg",
        description: "",
        category: "",
        rating: { rate: 0, count: 0 },
      };

  const [quantity, setQuantity] = useState(1);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart: addToCartContext } = useCart();
  const isProductFavorite = isFavorite(product.id);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Toggle accordion sections
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
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
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <BackSvg width={20} height={20} fill="#181725" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()}>
              <Share width={20} height={20} fill="#181725" />
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.loadingText}>Loading product details...</Text>
            </View>
          ) : (
            <>
              <View style={styles.imageContainer}>
                <Image
                  source={getImageSource()}
                  style={styles.image}
                  resizeMode="contain"
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
                <TouchableOpacity
                  style={styles.accordionItem}
                  onPress={() => toggleSection("productDetail")}
                >
                  <Text style={styles.sectionTitle}>Product Detail</Text>
                  <Icon
                    name={
                      expandedSections.productDetail
                        ? "keyboard-arrow-up"
                        : "keyboard-arrow-down"
                    }
                    size={24}
                    color="#181725"
                  />
                </TouchableOpacity>
                {expandedSections.productDetail && (
                  <Text style={styles.description}>
                    {product.description ||
                      `${product.name} are nutritious. ${product.name} may be good for weight loss. ${product.name} may be good for your heart. As part of a healthful and varied diet.`}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.accordionItem}
                  onPress={() => toggleSection("nutritions")}
                >
                  <Text style={styles.sectionTitle}>Nutritions</Text>
                  <View style={styles.nutritionBadge}>
                    <Text style={styles.nutritionText}>100gr</Text>
                    <Icon
                      name={
                        expandedSections.nutritions
                          ? "keyboard-arrow-down"
                          : "keyboard-arrow-right"
                      }
                      size={24}
                      color="#181725"
                    />
                  </View>
                </TouchableOpacity>
                {expandedSections.nutritions && (
                  <View style={styles.accordionContent}>
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>Energy</Text>
                      <Text style={styles.nutritionValue}>85 kcal</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>Protein</Text>
                      <Text style={styles.nutritionValue}>1.1 g</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>Carbohydrates</Text>
                      <Text style={styles.nutritionValue}>22 g</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.nutritionItem}>
                      <Text style={styles.nutritionLabel}>Fat</Text>
                      <Text style={styles.nutritionValue}>0.3 g</Text>
                    </View>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.accordionItem}
                  onPress={() => toggleSection("reviews")}
                >
                  <Text style={styles.sectionTitle}>Review</Text>
                  <View style={styles.reviewStars}>
                    <View style={styles.stars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                          key={star}
                          name="star"
                          size={18}
                          color={
                            star <= Math.round(product.rating.rate)
                              ? "#F3603F"
                              : "#E2E2E2"
                          }
                        />
                      ))}
                    </View>
                    <Text style={styles.reviewCount}>
                      {product.rating.count} reviews
                    </Text>
                    <Icon
                      name={
                        expandedSections.reviews
                          ? "keyboard-arrow-down"
                          : "keyboard-arrow-right"
                      }
                      size={24}
                      color="#181725"
                    />
                  </View>
                </TouchableOpacity>
                {expandedSections.reviews && (
                  <View style={styles.accordionContent}>
                    {/* Sample reviews */}
                    <View style={styles.reviewItem}>
                      <View style={styles.reviewHeader}>
                        <Text style={styles.reviewerName}>John Doe</Text>
                        <View style={styles.reviewerStars}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                              key={star}
                              name="star"
                              size={14}
                              color={star <= 5 ? "#F3603F" : "#E2E2E2"}
                            />
                          ))}
                        </View>
                      </View>
                      <Text style={styles.reviewText}>
                        Great product! Exactly as described and arrived quickly.
                      </Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.reviewItem}>
                      <View style={styles.reviewHeader}>
                        <Text style={styles.reviewerName}>Jane Smith</Text>
                        <View style={styles.reviewerStars}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                              key={star}
                              name="star"
                              size={14}
                              color={star <= 4 ? "#F3603F" : "#E2E2E2"}
                            />
                          ))}
                        </View>
                      </View>
                      <Text style={styles.reviewText}>
                        Very satisfied with the quality. Would buy again.
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </>
          )}
        </ScrollView>

        {/* Fixed Add To Basket button at the bottom */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              // Add to Redux cart
              if (selectedProduct) {
                dispatch(
                  addItemToCart({
                    product: selectedProduct,
                    quantity: quantity,
                    section: "product-details",
                  })
                );
              }

              // Also add to context for backward compatibility
              addToCartContext(
                {
                  id: product.id,
                  name: product.name,
                  image: getImageSource(),
                  price: product.price,
                  quantity: product.quantity,
                },
                quantity
              );

              // Provide visual feedback that item was added
              console.log(`Added ${quantity} ${product.name} to cart`);
            }}
          >
            <Text style={styles.addButtonText}>Add To Basket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 80, // Space for the fixed button
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#E2E2E2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: 300,
  },
  loadingText: {
    marginTop: 10,
    fontFamily: FONTS.medium,
    fontSize: FONTS.size.medium,
    color: COLORS.primary,
  },
  reviewCount: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.small,
    color: "#7C7C7C",
    marginLeft: 10,
  },
  accordionContent: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  nutritionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  nutritionLabel: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.size.medium,
    color: "#7C7C7C",
  },
  nutritionValue: {
    fontFamily: FONTS.semi,
    fontSize: FONTS.size.medium,
    color: "#181725",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E2E2",
    marginVertical: 5,
  },
  reviewItem: {
    marginVertical: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  reviewerName: {
    fontFamily: FONTS.semi,
    fontSize: FONTS.size.medium,
    color: "#181725",
  },
  reviewerStars: {
    flexDirection: "row",
  },
  reviewText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.small,
    color: "#7C7C7C",
    lineHeight: 20,
  },
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
    width: "100%",
  },
  addButtonText: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    color: "#FFFFFF",
  },
});
