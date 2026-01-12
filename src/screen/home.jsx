import React, { useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ProductCard from '../component/productCard';
import { CartContext } from '../context/cartContext';

const PRODUCTS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
}));

export default function Home({ navigation }) {
  const { cart } = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const paginatedData = useMemo(() => {
    return Array.from({ length: page }).flatMap((_, pageIndex) =>
      PRODUCTS.map((product, productIndex) => ({
        ...product,
        __page: pageIndex,
        __index: productIndex,
      })),
    );
  }, [page]);

  const loadMore = () => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoading(false);
    }, 800);
  };

  const renderItem = ({ item, index }) => {
    const uniqueId = `${item.id}_${item.__page}_${item.__index}`;
    const visibleIndex = index + 1;
    return (
      <ProductCard
        product={item}
        uniqueId={uniqueId}
        visibleIndex={visibleIndex}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.icons}>
          <TouchableOpacity
            testID="cart_icon"
            accessibilityLabel="cart_icon"
            onPress={() => navigation.navigate('Cart')}
            style={{ marginRight: 15 }}
          >
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../assets/images/shopping.png')}
            />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            testID="settings_icon"
            onPress={() => setModalVisible(true)}
          >
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../assets/images/setting.jpg')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        testID="product_list"
        data={paginatedData}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}_${item.__page}_${item.__index}`}
        numColumns={2}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        ListFooterComponent={
          loading ? (
            <View style={{ padding: 20 }}>
              <ActivityIndicator size="large" />
            </View>
          ) : null
        }
      />
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.languageOption}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.languageOption}>Arabic</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  icons: { flexDirection: 'row', alignItems: 'center' },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 30,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  languageOption: { fontSize: 16, paddingVertical: 10 },
});
