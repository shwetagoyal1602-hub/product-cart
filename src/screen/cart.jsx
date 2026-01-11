import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { CartContext } from '../context/cartContext';

export default function Cart({ navigation }) {
  const { cart, removeFromCart } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <TouchableOpacity
        testID={`cart_item_delete_${item.id}`}
        onPress={() => removeFromCart(item.id)}
      >
        <Image
          style={{
            height: 30,
            width: 30,
          }}
          source={require('../assets/images/delete.png')}
        />{' '}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          testID="home_icon"
          onPress={() => navigation.goBack()}
        >
          <Image
            style={{
              height: 30,
              width: 30,
            }}
            source={require('../assets/images/goBack.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Cart</Text>
      </View>

      {cart.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>No items in cart</Text>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#eee',
  },
  title: { fontSize: 20, fontWeight: 'bold', marginLeft: 15 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
