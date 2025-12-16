import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import Toast from 'react-native-toast-message';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart, saveOrder } = useContext(AppContext);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
     if (cartItems.length === 0) {
    Toast.show({
      type: 'error',
      text1: 'Cart is empty',
      text2: 'Please add items before placing an order',
      position: 'bottom',
      bottomOffset: 60,
      visibilityTime: 3000,
    });
    return;
  }


    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cartItems,
      totalPrice: totalPrice.toFixed(2),
    };

    await saveOrder(order);
    clearCart();


Toast.show({
  type: 'success',               
  text1: 'Order placed successfully!',
  position: 'bottom',               
  bottomOffset: 60,                 
  visibilityTime: 3000,             
});    navigation.navigate('Orders'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              {/* Small Product Image */}
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
              )}
              <View style={{ marginLeft: 10, flexShrink: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}> ₹{item.price.toFixed(2)}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(index)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty</Text>}
        contentContainerStyle={cartItems.length === 0 && { flex: 1, justifyContent: 'center' }}
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total:  ₹{totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 15, paddingTop: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#FF5722', marginBottom: 15 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  thumbnail: { width: 50, height: 50, borderRadius: 8, resizeMode: 'contain' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  price: { fontSize: 14, color: '#FF5722', fontWeight: '600', marginTop: 2 },
  deleteButton: {
    backgroundColor: '#FFCDD2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  deleteText: { color: '#C62828', fontWeight: 'bold' },
  footer: { marginTop: 'auto', paddingVertical: 20 },
  total: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginBottom: 10, color: '#333' },
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  empty: { textAlign: 'center', fontSize: 16, color: '#999' },
});
