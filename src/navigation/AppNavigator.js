import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductsListScreen';
import ProductDetailScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import LoginScreen from '../screens/LoginScreen';
import { AppContext } from '../context/AppContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken } = useContext(AppContext);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen name="Products" component={ProductListScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Orders" component={OrderHistoryScreen} />
        {!userToken && <Stack.Screen name="Login" component={LoginScreen} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
