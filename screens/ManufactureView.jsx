import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet,Modal, SafeAreaView, TextInput,RefreshControl } from 'react-native';

const ManufacturerView = ({ route }) => {
  const [brandData, setBrandData] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsNotFound, setProductsNotFound] = useState(false);
  const { mancat1, manName } = route.params;


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
    // Fetch the data from the API (you can use Axios, Fetch API, or any other method)
    // and set the response to the brandData state.
    // For simplicity, let's assume you have already fetched the data.
    const fetchedData = {
      "_id": "64be261bd5fae142a202ab43",
      "brandname": manName,
      "brandimage": "https://images.pexels.com/photos/13748756/pexels-photo-13748756.jpeg?auto=compress&cs=tinysrgb&w=600",
      "categories": "Electronics",
      "category": mancat1,
      "__v": 0
    };

    // Process the subcategories string into an array of subcategory names
    if (fetchedData && fetchedData.category && fetchedData.category.length > 0) {
      const subcategoriesArray = fetchedData.category[0].split(',');
      setBrandData({ ...fetchedData, category: subcategoriesArray });

      setSelectedSubcategory(subcategoriesArray[0]);
    }
  }, []);

  useEffect(() => {
    // Fetch products from the API based on the selected category
    // Replace 'YOUR_API_URL' with the actual API endpoint to fetch products
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://192.168.2.107:3000/productlistcategoryandseller/${manName}/${selectedSubcategory}`);
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

    // Call the fetchProducts function when the selectedSubcategory changes
    if (selectedSubcategory) {
      fetchProducts();
    }
  }, [selectedSubcategory]);

  const renderProductCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedProductDescription([item.sellername,item.productname,item.brand,item.category,item.phone,item.image,]); // Set the selected product's description
          setModalVisible(true); // Show the modal
        }}
      >
      <View style={styles.productCard}>
      
      <View>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
        <View style={{ justifyContent:'center',alignItems:'center' }}>
        <Text style={styles.productName}>Productname:{item.productname}</Text>
        <Text style={styles.productPrice}>Price:{item.price}</Text>
        
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
    
      {brandData && (
        <View style={styles.body} refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
          
          <Text style={{ color: 'orange', fontSize: 23, fontWeight: 'bold', marginBottom: 10, paddingVertical: 30, }}>{brandData.brandname}</Text>
          
          <Text style={{ color: 'orange', fontSize: 18, }}>We are dealers in..</Text>
          <FlatList
          refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
            data={brandData.category}
            renderItem={({ item }) => (
              <TouchableOpacity
              key={item._id}
                onPress={() => setSelectedSubcategory(item)}
                style={[
                  styles.subcategoryButton,
                  selectedSubcategory === item && styles.selectedSubcategoryButton
                ]}
              >
                <Text style={styles.subcategoryButtonText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      {productsNotFound ? (
        <Text style={styles.noProductsText}>No products found for this subcategory.</Text>
        
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
            <Text style={{ fontSize:16,fontWeight:'bold' }}>ProductName:{selectedProductDescription[1]}</Text>
            <Text style={{ fontSize:16,fontWeight:'bold' }}>Brand:{selectedProductDescription[2]}</Text>
            <Text style={{ fontSize:16,fontWeight:'bold' }}>Manufacturer:{selectedProductDescription[0]}</Text>
            <Text style={{ fontSize:16,fontWeight:'bold' }}>Subcategory:{selectedProductDescription[3]}</Text>
            <Text style={{ fontSize:16,fontWeight:'bold' }}>Contact:{selectedProductDescription[4]}</Text>
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
  subcategoryButton: {
    borderColor: 'orange',
    borderWidth: 1,
    padding: 3,
    borderRadius: 9,
    margin: 5,
  },
  selectedSubcategoryButton: {
    backgroundColor: 'orange',
  },
  subcategoryButtonText: {
    padding: 12,
    marginLeft: 10,
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
    marginBottom: 15,
    flexDirection:'row',
    justifyContent:'space-between',
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
});

export default ManufacturerView;