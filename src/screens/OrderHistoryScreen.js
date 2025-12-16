import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import Toast from 'react-native-toast-message';

const OrderHistoryScreen = () => {
  const { orders, clearOrders } = useContext(AppContext);

const handleClearHistory = () => {
  clearOrders();
  Toast.show({
    type: 'success',
    text1: 'Order history cleared',
    text2: 'Undo available for 5 seconds',
    position: 'bottom',
    bottomOffset: 60,
    visibilityTime: 5000,
  });
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Order History</Text>
        {orders.length > 0 && (
          <TouchableOpacity onPress={handleClearHistory}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.orderId}>Order ID: {item.id}</Text>
            <Text style={styles.date}>
              Date: {new Date(item.date).toLocaleString()}
            </Text>
            <Text style={styles.total}>Total:  ₹{item.totalPrice}</Text>

            {/* Products in the order */}
            {item.items && item.items.length > 0 && (
              <View style={styles.itemsList}>
                {item.items.map((product, index) => (
                  <View key={index} style={styles.productRow}>
                    {product.image && (
                      <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                      />
                    )}
                    <Text style={styles.itemText}>
                      {product.title} -  ₹{product.price.toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found</Text>
        }
        contentContainerStyle={orders.length === 0 && { flex: 1, justifyContent: 'center' }}
      />
    </View>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#FF5722' },
  clearText: { color: '#C62828', fontWeight: 'bold', fontSize: 16 },

  card: {
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
  orderId: { fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: '#333' },
  date: { color: '#555', marginBottom: 5 },
  total: { fontSize: 16, fontWeight: 'bold', color: '#FF5722' },

  itemsList: { marginTop: 10 },
  productRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  productImage: { width: 40, height: 40, borderRadius: 6, marginRight: 10, resizeMode: 'contain' },
  itemText: { fontSize: 14, color: '#666', flexShrink: 1 },

  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#999' },
});
