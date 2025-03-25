import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { FONTS } from '@/constants/Fonts';
import { router } from 'expo-router';

export default function CheckoutScreen() {
  const handlePlaceOrder = () => {
    // Navigate to order success screen
    router.push('/order-success');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Delivery</Text>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Select Method</Text>
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Payment</Text>
            <TouchableOpacity style={styles.selectButton}>
              <FontAwesome name="credit-card" size={20} color="#53B175" style={styles.cardIcon} />
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Promo Code</Text>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Pick discount</Text>
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Total Cost</Text>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.totalCost}>$13.97</Text>
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By placing an order you agree to our{' '}
            <Text style={styles.termsLink}>Terms</Text> and{' '}
            <Text style={styles.termsLink}>Conditions</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: FONTS.semi,
    fontSize: 20,
    color: '#181725',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: '#7C7C7C',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectButtonText: {
    fontFamily: FONTS.semi,
    fontSize: 14,
    color: '#181725',
    marginRight: 10,
  },
  cardIcon: {
    marginRight: 10,
  },
  totalCost: {
    fontFamily: FONTS.semi,
    fontSize: 14,
    color: '#181725',
    marginRight: 10,
  },
  termsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  termsText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: '#7C7C7C',
    textAlign: 'center',
  },
  termsLink: {
    fontFamily: FONTS.medium,
    color: '#53B175',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
  },
  placeOrderButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderText: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    color: '#FFFFFF',
  },
});
