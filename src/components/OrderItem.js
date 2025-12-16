import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderItem = ({ order }) => (
  <View style={styles.order}>
    <Text style={styles.date}>Date: {new Date(order.date).toLocaleString()}</Text>
    <Text>Total:  ₹{order.total.toFixed(2)}</Text>
    <Text>Items:</Text>
    {order.items.map((item, index) => (
      <Text key={index}>- {item.title}</Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  order: { borderWidth: 1, padding: 10, borderRadius: 5, borderColor: '#ddd', marginBottom: 10 },
  date: { fontWeight: 'bold', marginBottom: 5 },
});

export default OrderItem;
