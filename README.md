# AssignmentApp
# AssignmentApp

![React Native](https://img.shields.io/badge/React_Native-0.71-blue) ![License](https://img.shields.io/badge/License-MIT-green)

A **React Native mini e-commerce app** demonstrating skills in authentication, navigation, state management, API usage, AsyncStorage, and UI development.

---

## **📌 Features**

### **1. Authentication**
- Login using mock users:
  - `email`: test@zignuts.com / practical@zignuts.com  
  - `password`: 123456
- Auto-login if a valid token exists.
- Login required when adding products to cart.

### **2. Product Features**
- **Product List**
  - Fetch products from: [Fake Store API](https://fakestoreapi.com/products)
  - Display image, title, and price.
- **Product Details**
  - Show full details: image, title, description, price.
  - Add to Cart functionality.
  - If user is not logged in, show a modal:
    ```
    You need to login to continue
    [Login] [Cancel]
    ```

### **3. Cart**
- Display list of added products.
- Show total price.
- "Place Order" button.

### **4. Place Order**
- Create order object:
  - ID
  - Date
  - Items
  - Total Price
- Save orders in AsyncStorage.
- Clear cart after placing order.
- Redirect to **Order History**.

### **5. Order History**
- Fetch and display saved orders from AsyncStorage.
- Show past orders with the latest first.
- Option to clear order history.

---

## **📌 Navigation Flow**


---

## **📌 Technical Stack**
- **React Native**
- **React Navigation**
- **Context API** for state management
- **AsyncStorage** for persistent data
- **Reusable components** for clean UI
- **Clean folder structure** for scalability

---


