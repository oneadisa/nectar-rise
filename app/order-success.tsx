import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS } from '@/constants/Fonts';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OrderSuccessScreen() {
  const handleTrackOrder = () => {
    // Navigate to order tracking screen (to be implemented)
    console.log('Navigate to order tracking');
  };

  const handleBackToHome = () => {
    // Navigate back to home screen
    router.push('/(tab)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successCircle}>
          <Ionicons name="checkmark" size={50} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>Your Order has been accepted</Text>
        
        <Text style={styles.description}>
          Your items has been placed and is on it's way to being processed
        </Text>

        <TouchableOpacity style={styles.trackOrderButton} onPress={handleTrackOrder}>
          <Text style={styles.trackOrderText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
          <Text style={styles.backButtonText}>Back to home</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#53B175',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  title: {
    fontFamily: FONTS.semi,
    fontSize: 28,
    color: '#181725',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  trackOrderButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  trackOrderText: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    color: '#FFFFFF',
  },
  backButton: {
    paddingVertical: 15,
  },
  backButtonText: {
    fontFamily: FONTS.semi,
    fontSize: 18,
    color: '#181725',
  },
});
