import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../context/cartContext';

export default function ProductCard({ product, uniqueId, visibleIndex }) {
  const { addToCart, isAdded } = useContext(CartContext);
  const added = isAdded(uniqueId);

  return (
    <View style={styles.card}>
      <Text>{product.name}</Text>
      <TouchableOpacity
        testID={`product_${visibleIndex}_add_button`}
        accessibilityLabel={`product_${visibleIndex}_add_button`}
        disabled={added}
        onPress={() =>
          addToCart({
            ...product,
            uniqueId,
          })
        }
        style={[styles.button, { backgroundColor: added ? '#aaa' : 'blue' }]}
      >
        <Text style={{ color: '#fff' }}>{added ? 'Added' : 'Add to Cart'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
