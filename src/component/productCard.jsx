import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../context/cartContext';

export default function ProductCard({ product }) {
  const { cart, addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const isAdded = cart.some(item => item.id === product.id);
    setAdded(isAdded);
  }, [cart]);

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      <TouchableOpacity
        testID={`product_${product.id}_add_button`}
        style={[styles.button, added && styles.buttonAdded]}
        onPress={() => {
          if (!added) addToCart(product);
          setAdded(true);
        }}
      >
        <Text style={styles.buttonText}>{added ? 'Added' : 'Add to Cart'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
  },
  name: { marginBottom: 10, fontSize: 16 },
  button: { backgroundColor: '#007bff', padding: 10, borderRadius: 5 },
  buttonAdded: { backgroundColor: '#28a745' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
