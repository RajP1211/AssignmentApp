import React, {
  useContext,
  useState,
  useLayoutEffect,
} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { AppContext } from '../context/AppContext';
import Toast from 'react-native-toast-message';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { userToken, addToCart, logout } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        userToken ? (
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => navigation.navigate('Cart')}
            >
              <Text style={styles.cartText}>Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : null,
    });
  }, [navigation, userToken]);

  const handleAddToCart = () => {
    if (!userToken) {
      setModalVisible(true);
    } else {
      addToCart(product);
Toast.show({
  type: 'success',                 
  text1: 'Success',               
  text2: 'Product added to cart',   
  position: 'bottom',              
  bottomOffset: 60,                
  visibilityTime: 3000,             
});    }
  };

  
const handleLogout = () => {
  Toast.show({
    type: 'info',
    text1: 'Tap to confirm logout',
    position: 'bottom',
    bottomOffset: 60,
    visibilityTime: 5000,
    onPress: logout, 
  });
};


  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}> ₹{product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* 🔐 Login Modal */}
   <Modal
  visible={modalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>You need to login to continue</Text>

      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={[styles.modalButton, styles.loginButton]}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('Login');
          }}
        >
          <Text style={styles.modalButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.modalButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* Header */
  headerButtons: {
    flexDirection: 'row',
    marginRight: 12,
    alignItems: 'center',
  },
  headerBtn: {
    marginRight: 15,
  },
  cartText: {
    color: '#FF5722',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },

  /* Product */
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },

  /* Button */
  button: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
