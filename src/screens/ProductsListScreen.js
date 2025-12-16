import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { fetchProducts } from '../api/products';
import ProductCard from '../components/ProductsCard';
import { AppContext } from '../context/AppContext';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 30) / 2; 

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken, logout } = useContext(AppContext);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.log('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

 const handleLogout = () => {
  Toast.show({
    type: 'info',
    text1: 'Tap to confirm logout',
    position: 'bottom',
    bottomOffset: 60,
    visibilityTime: 5000,
    onPress: () => {
      logout();
      Toast.show({
        type: 'success',
        text1: 'Logged out successfully',
        position: 'bottom',
        bottomOffset: 60,
        visibilityTime: 3000,
      });
    },
  });
};

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF5722" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Our Products</Text>
        {userToken && (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} 
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            width={CARD_WIDTH} 
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
