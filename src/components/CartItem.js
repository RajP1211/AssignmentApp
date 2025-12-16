import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CartItem = ({ product }) => (
  <View style={styles.item}>
    <Image source={{ uri: product.image }} style={styles.image} />
    <View style={{ flex: 1, marginLeft: 10 }}>
      <Text style={styles.title}>{product.title}</Text>
      <Text>₹ {product.price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  item: { flexDirection: 'row', marginBottom: 10, borderWidth: 1, padding: 10, borderRadius: 5, borderColor: '#ddd' },
  image: { width: 80, height: 80, resizeMode: 'contain' },
  title: { fontWeight: 'bold' },
});

export default CartItem;
