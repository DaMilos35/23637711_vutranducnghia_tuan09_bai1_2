import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import counterReducer from './components/counterSlice';
import cartReducer from './components/cartSlice';
import CounterScreen from './components/CounterScreen';
import CartScreen from './components/CartScreen';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

function MainNavigation() {
  const [activeTab, setActiveTab] = useState<'counter' | 'cart'>('counter');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navBtn, activeTab === 'counter' && styles.navBtnActive]}
          onPress={() => setActiveTab('counter')}
        >
          <Text
            style={[
              styles.navBtnText,
              activeTab === 'counter' && styles.navBtnTextActive,
            ]}
          >
            Bài 1: Counter
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navBtn, activeTab === 'cart' && styles.navBtnActive]}
          onPress={() => setActiveTab('cart')}
        >
          <Text
            style={[
              styles.navBtnText,
              activeTab === 'cart' && styles.navBtnTextActive,
            ]}
          >
            Bài 2: Shopping Cart
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.screenContainer}>
        {activeTab === 'counter' ? <CounterScreen /> : <CartScreen />}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f1f3f5',
    borderBottomWidth: 1,
    borderColor: '#dee2e6',
    gap: 8,
  },
  navBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#e9ecef',
  },
  navBtnActive: {
    backgroundColor: '#007bff',
  },
  navBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  navBtnTextActive: {
    color: '#fff',
  },
  screenContainer: {
    flex: 1,
  },
});