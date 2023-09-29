import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, SafeAreaView, TextInput, RefreshControl } from 'react-native';

const CategoryScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [productsNotFound, setProductsNotFound] = useState(false);
  const { categoryName,categoryImage } = route.params;

  //for the modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductDescription, setSelectedProductDescription] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    // Implement your logic here to fetch updated data from the API.
    // For simplicity, let's just simulate a refreshing delay using setTimeout.
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  //close a modal
  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Fetch products from the API based on the selected category
    // Replace 'YOUR_API_URL' with the actual API endpoint to fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://api-test-self-six.vercel.app/productlistcategory/${categoryName}`);
        const data = await response.json();
        if (data.length > 0) {
          setProducts(data);
          setProductsNotFound(false);
        } else {
          setProducts([]);
          setProductsNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, [categoryName]);

  const renderProductCard = ({ item }) => {
    return (
      <TouchableOpacity
        
      >
        <View style={styles.productCard}>

          <View>
            <Image source={{ uri: item.image }} style={styles.productImage} />
          </View>
          <View>
            <Text style={styles.productName}>Productname: {item.productname}</Text>
            <Text style={styles.productPrice}>Price: {item.price}</Text>
            <Text style={styles.productPrice}>Manufacturer: {item.sellername}</Text>
            <Text style={styles.productPrice}>Contact: {item.phone}</Text>
            <TouchableOpacity
            onPress={() => {
              setSelectedProductDescription([item.sellername, item.productname, item.brand, item.category, item.phone, item.image]); // Set the selected product's description
              setModalVisible(true); // Show the modal
            }}
            
            style={{backgroundColor:'orange',padding:12,borderRadius:9,alignItems:'center',width:'70%',marginTop:10,}}>
              <Text style={{color:'white',fontWeight:'bold',fontSize:15,}}>View details</Text>
            </TouchableOpacity>
          </View>
          {/* Add other product details here */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} refreshControl={
      <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.body}>
        <View style={{ flexDirection:'row',alignItems: 'center'}}>
        <Image source={categoryImage} style={{width:30,height:30,marginRight:10,borderRadius:50}}/>
        <Text style={{ color: 'orange', fontSize: 23, fontWeight: 'bold', marginBottom: 10, paddingVertical: 30, }}>{categoryName}</Text>
        </View>
        <TextInput style={styles.search} placeholder="search for products from " />
        <Text style={{ color: 'orange', fontSize: 18, }}>What are you looking for?</Text>
      </View>

      {productsNotFound ? (
        <Text style={styles.noProductsText}>No products found for this category.</Text>
      ) : (
        <FlatList
          style={{ paddingHorizontal: 30 }}
          data={products}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.productId}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {/* Lottie animation for loading */}
      {isRefreshing && (
        <View style={styles.loadingAnimation}>
          <LottieView
            source={require('../assets/anim.json')} // Replace with the actual path to your Lottie JSON file
            autoPlay
            loop
          />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Product Description</Text>
            <Image source={{ uri: selectedProductDescription[5] }} style={styles.productImage} />
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>ProductName: {selectedProductDescription[1]}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Brand: {selectedProductDescription[2]}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Manufacturer: {selectedProductDescription[0]}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Subcategory: {selectedProductDescription[3]}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Contact: {selectedProductDescription[4]}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  body: {
    paddingHorizontal: 30,
  },
  search: {
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 12,
    marginBottom: 23,
  },
  noProductsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  productCard: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginTop:10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingAnimation: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -50,
    marginTop: -50,
  },
});

export default CategoryScreen;
