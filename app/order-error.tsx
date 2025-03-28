import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FONTS } from '@/constants/Fonts';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OrderErrorScreen() {
  const handleTryAgain = () => {
    // Navigate back to checkout
    router.push('/checkout');
  };

  const handleBackToHome = () => {
    // Navigate back to home screen
    router.push('/(tab)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#181725" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.errorImageContainer}>
          <Ionicons name="bag-outline" size={100} color="#53B175" />
        </View>

        <Text style={styles.title}>Oops! Order Failed</Text>
        
        <Text style={styles.description}>
          Something went terribly wrong.
        </Text>

        <TouchableOpacity style={styles.tryAgainButton} onPress={handleTryAgain}>
          <Text style={styles.tryAgainText}>Please Try Again</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  closeButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  errorImageContainer: {
    width: 200,
    height: 200,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FB',
    borderRadius: 100,
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
  },
  tryAgainButton: {
    backgroundColor: '#53B175',
    borderRadius: 19,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  tryAgainText: {
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
