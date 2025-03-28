import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Modal,
  ImageBackground,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import CartItemComponent from "../../components/cards/CartItem";
import { FONTS } from "../../constants/Fonts";
import { CartItem as CartItemType } from "@/context/CartContext";
import { updateQuantity, removeFromCart, selectCartTotal } from "@/store/slices/cartSlice";
import { RootState, AppDispatch } from "@/store/store";
import Success from "@/components/figma/Success";
import Failed from "@/components/figma/Failed";

// Using CartItem type from CartContext

const CartScreen = () => {
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [orderSuccessVisible, setOrderSuccessVisible] = useState(false);
  const [orderErrorVisible, setOrderErrorVisible] = useState(false);

  // Use Redux instead of cart context
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartLoading = useSelector((state: RootState) => state.cart.loading);

  const handleIncrease = (id: string, section?: string) => {
    const productId = parseInt(id);
    const item = cartItems.find((item) => {
      if (section) {
        return item.productId === productId && item.section === section;
      }
      return item.productId === productId;
    });
    if (item) {
      dispatch(updateQuantity({ 
        productId: productId, 
        quantity: item.quantity + 1, 
        section: item.section 
      }));
    }
  };

  const handleDecrease = (id: string, section?: string) => {
    const productId = parseInt(id);
    const item = cartItems.find((item) => {
      if (section) {
        return item.productId === productId && item.section === section;
      }
      return item.productId === productId;
    });
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ 
        productId: productId, 
        quantity: item.quantity - 1, 
        section: item.section 
      }));
    }
  };

  const handleRemove = (id: string, section?: string) => {
    const productId = parseInt(id);
    dispatch(removeFromCart({ productId, section }));
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total.toFixed(2);
  };

  // Convert Redux cart items to format expected by CartItemComponent
  const mapCartItemForDisplay = (item: any) => ({
    id: item.productId.toString(),
    name: item.title,
    image: { uri: item.image },
    price: item.formattedPrice || `$${item.price.toFixed(2)}`,
    quantity: item.formattedQuantity || '1kg',
    count: item.quantity,
    section: item.section
  });

  const renderCartItem = (item: any) => (
    <CartItemComponent
      key={`${item.productId}-${item.section || "default"}`}
      image={{ uri: item.image }}
      name={item.title}
      quantity={item.formattedQuantity || '1kg'}
      price={item.formattedPrice || `$${item.price.toFixed(2)}`}
      count={item.quantity}
      section={item.section}
      onIncrease={() => handleIncrease(item.productId.toString(), item.section)}
      onDecrease={() => handleDecrease(item.productId.toString(), item.section)}
      onRemove={() => handleRemove(item.productId.toString(), item.section)}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          cartItems.length === 0 ? styles.emptyCartContainer : undefined
        }
      >
        {cartItems.length > 0 ? (
          cartItems.map(renderCartItem)
        ) : (
          <View style={styles.emptyCartContent}>
            <Ionicons
              name="cart-outline"
              size={80}
              color="#53B175"
              style={styles.emptyCartIcon}
            />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubText}>
              Browse products and add items to your cart
            </Text>
          </View>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => setCheckoutVisible(true)}
        >
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalAmountContainer}>
            <Text style={styles.totalAmount}>${calculateTotal()}</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Checkout Modal */}
      <Modal visible={checkoutVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setCheckoutVisible(false)}>
                <Ionicons name="close" size={24} color="#181725" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Delivery</Text>
              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>Select Method</Text>
                <Ionicons name="chevron-forward" size={20} color="#181725" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Payment</Text>
              <TouchableOpacity style={styles.sectionButton}>
                <FontAwesome
                  name="credit-card"
                  size={20}
                  color="#53B175"
                  style={styles.cardIcon}
                />
                <Ionicons name="chevron-forward" size={20} color="#181725" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Promo Code</Text>
              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>Pick discount</Text>
                <Ionicons name="chevron-forward" size={20} color="#181725" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.sectionTitle}>Total Cost</Text>
              <TouchableOpacity style={styles.sectionButton}>
                <Text style={styles.totalCost}>${calculateTotal()}</Text>
                <Ionicons name="chevron-forward" size={20} color="#181725" />
              </TouchableOpacity>
            </View>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By placing an order you agree to our{" "}
                <Text style={styles.termsLink}>Terms</Text> and{" "}
                <Text style={styles.termsLink}>Conditions</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={() => {
                setCheckoutVisible(false);
                // Simulate successful order (in a real app, this would be an API call)
                // For demo purposes, randomly show success or error
                const isSuccess = Math.random() > 0.3; // 70% success rate
                if (isSuccess) {
                  setOrderSuccessVisible(true);
                } else {
                  setOrderErrorVisible(true);
                }
              }}
            >
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Order Success Modal */}
      <Modal
        visible={orderSuccessVisible}
        transparent={false}
        animationType="slide"
      >
        <ImageBackground
          source={require("@/assets/images/background.png")}
          style={styles.successModalBackground}
        >
          <View style={styles.successModalContainer}>
            <View style={styles.successModalContent}>
              <View style={styles.successCircleContainer}>
                <Success />
              </View>

              <View style={styles.successTextContainer}>
                <Text style={styles.successTitle}>
                  Your Order has been accepted
                </Text>

                <Text style={styles.successDescription}>
                  Your items has been placed and is on it's way to being
                  processed
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.trackOrderButton}
                  onPress={() => {
                    setOrderSuccessVisible(false);
                    // Handle track order functionality
                  }}
                >
                  <Text style={styles.trackOrderText}>Track Order</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setOrderSuccessVisible(false)}
                >
                  <Text style={styles.backButtonText}>Back to home</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Modal>

      {/* Order Error Modal */}
      <Modal
        visible={orderErrorVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.errorModalContainer}>
          <View style={styles.errorModalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOrderErrorVisible(false)}
            >
              <Ionicons name="close" size={24} color="#181725" />
            </TouchableOpacity>

            <View style={styles.errorImageContainer}>
              <Failed />
            </View>

            <Text style={styles.errorTitle}>Oops! Order Failed</Text>

            <Text style={styles.errorDescription}>
              Something went tembly wrong.
            </Text>

            <TouchableOpacity
              style={styles.tryAgainButton}
              onPress={() => {
                setOrderErrorVisible(false);
                setCheckoutVisible(true);
              }}
            >
              <Text style={styles.tryAgainText}>Please Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setOrderErrorVisible(false)}
            >
              <Text style={styles.backButtonText}>Back to home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  headerTitle: {
    fontFamily: FONTS.semi,
    fontSize: 20,
    color: "#181725",
  },
  scrollView: {
    flex: 1,
    marginBottom: 80, // Add space at the bottom for the checkout button
  },
  emptyCartContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emptyCartIcon: {
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 22,
    fontFamily: FONTS.semi,
    textAlign: "center",
    marginBottom: 10,
    color: "#181725",
  },
  emptyCartSubText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    textAlign: "center",
    color: "#7C7C7C",
    marginBottom: 30,
  },

  checkoutButton: {
    backgroundColor: "#53B175",
    borderRadius: 19,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    zIndex: 10,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkoutText: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  totalAmountContainer: {
    backgroundColor: "#489E67",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  totalAmount: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  modalTitle: {
    fontFamily: FONTS.semi,
    fontSize: 24,
    color: "#181725",
  },
  modalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  sectionTitle: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: "#7C7C7C",
  },
  sectionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: "#181725",
    marginRight: 10,
  },
  cardIcon: {
    marginRight: 10,
  },
  totalCost: {
    fontFamily: FONTS.semi,
    fontSize: 14,
    color: "#181725",
    marginRight: 10,
  },
  termsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  termsText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "#7C7C7C",
    textAlign: "center",
  },
  termsLink: {
    fontFamily: FONTS.medium,
    color: "#181725",
  },
  placeOrderButton: {
    backgroundColor: "#53B175",
    borderRadius: 19,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  placeOrderText: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    color: "#FFFFFF",
  },
  // Success Modal Styles
  successModalBackground: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  successModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successModalContent: {
    width: "100%",
    alignItems: "center",
    padding: 20,
    height: "100%",
    justifyContent: "space-between",
    paddingTop: 100,
    paddingBottom: 50,
  },
  successCircleContainer: {
    marginTop: 80,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  successTextContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  successTitle: {
    fontFamily: FONTS.semi,
    fontSize: 24,
    color: "#181725",
    textAlign: "center",
    marginBottom: 10,
  },
  successDescription: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: "#7C7C7C",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: "auto",
    paddingBottom: 50,
  },
  trackOrderButton: {
    backgroundColor: "#53B175",
    borderRadius: 19,
    paddingVertical: 18,
    width: "90%",
    alignItems: "center",
    marginBottom: 15,
  },
  trackOrderText: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    color: "#FFFFFF",
  },
  // Error Modal Styles
  errorModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  errorModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    width: "90%",
    maxWidth: 343,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 1,
  },
  errorImageContainer: {
    width: 180,
    height: 180,
    marginTop: 20,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2FBF6",
    borderRadius: 90,
  },
  errorTitle: {
    fontFamily: FONTS.semi,
    fontSize: 28,
    lineHeight: 29,
    color: "#181725",
    textAlign: "center",
    marginBottom: 16,
  },
  errorDescription: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 21,
    color: "#7C7C7C",
    textAlign: "center",
    marginBottom: 48,
  },
  tryAgainButton: {
    backgroundColor: "#53B175",
    borderRadius: 19,
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  tryAgainText: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    lineHeight: 21,
    color: "#FFFFFF",
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    lineHeight: 19,
    color: "#181725",
    textDecorationLine: "none",
  },
});
export default CartScreen;
