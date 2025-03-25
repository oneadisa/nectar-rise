// screens/tabs/stack/ProductDetailsScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from "@react-navigation/native";
import { COLORS } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import { BackButton } from "@/components/BackButton";
import { RootStackParamList } from "@/types/navigation";

type ProductDetailParams = {
  product: {
    id: string;
    image: string;
    name: string;
    price: string;
    quantity?: string; // Optional to handle BannerItem default
  };
};

const ProductDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { product } = route.params as ProductDetailParams;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <BackButton />
          <TouchableOpacity onPress={() => {}}>
            <Icon name="share" size={24} color="#181725" />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.details}>
          <View style={styles.productHeader}>
            <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.weight}>
                {product.quantity || "1kg"}, Price
              </Text>
            </View>
            <TouchableOpacity>
              <Icon name="favorite-border" size={24} color="#7C7C7C" />
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
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Product Detail</Text>
            <TouchableOpacity>
              <Icon name="chevron-down" size={20} color="#181725" />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>
            Apples are nutritious. Apples may be good for weight loss. Apples
            may be good for your heart. As part of a healthful and varied diet.
          </Text>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Nutritions</Text>
            <View style={styles.nutritionBadge}>
              <Text style={styles.nutritionText}>100gr</Text>
            </View>
          </View>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Review</Text>
            <TouchableOpacity>
              <Icon name="chevron-right" size={20} color="#181725" />
            </TouchableOpacity>
          </View>
          <View style={styles.reviews}>
            <Icon name="star" size={20} color="#F3603F" />
            <Icon name="star" size={20} color="#F3603F" />
            <Icon name="star" size={20} color="#F3603F" />
            <Icon name="star" size={20} color="#F3603F" />
            <Icon name="star" size={20} color="#E2E2E2" />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() =>
              navigation.navigate("cart", {
                product: { ...product, quantity: quantity.toString() },
              })
            }
          >
            <Text style={styles.addButtonText}>Add To Basket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  details: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: "#181725",
  },
  weight: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "#7C7C7C",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 8,
    padding: 5,
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: "#181725",
    marginHorizontal: 15,
  },
  price: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: "#181725",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: "#181725",
  },
  nutritionBadge: {
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  nutritionText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: "#7C7C7C",
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "#7C7C7C",
    lineHeight: 20,
    marginBottom: 15,
  },
  reviews: {
    flexDirection: "row",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#53B175",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: "#fff",
  },
});

export default ProductDetailScreen;
