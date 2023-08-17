import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'

const categories = [
  {
    id: 1,
    title: "All",
    color: "#FF6347",
    image: require("../assets/chair.png"),
    icon: "log-in",
  },
  {
    id: 2,
    title: "Furniture",
    color: "#FF6347",
    image: require("../assets/chair.png"),
    icon: "log-in",
  },
  {
    id: 3,
    title: "Jewellery",
    color: "#4169E1",
    image: require("../assets/jewel.png"),
    icon: "search",
  },
  {
    id: 4,
    title: "Electronics",
    color: "#32CD32",
    image: require("../assets/elec.png"),
  },
  
  {
    id: 6,
    title: "Kitchenware",
    color: "#FF8C00",
    image: require("../assets/kitchen.png"),
  },
  {
    id: 7,
    title: "Automobile",
    color: "#FF8C00",
    image: require("../assets/cars.png"),
  },
  {
    id: 8,
    title: "Kitchenware",
    color: "#FF8C00",
    image: require("../assets/kitchen.png"),
  },
  
];







const caticons = [
  {
    id: 1,
    name: "laptop",
    title: "Computer",
    color: "#FF8C00",
  },
  {
    id: 2,
    name: "car",
    title: "Automobile",
  },
];

export default function CartScreen({navigation,route}) {
  const { categoryName,username,categoryImage} = route.params;
  return (
    <ScrollView vertical={true} style={styles.container}>
      <View style={{alignItems:'center'}}>
      <View style={styles.cardContainer} horizontal={true}>
        {categories.map(item => (
          <TouchableOpacity
            
              onPress={() =>
                navigation.navigate("Category", {
                  categoryName: item.title,
                  categoryImage:item.image,
                  username,
                })
              }
              key={item.id}
            >
          <View style={styles.card} key={item.id}>
            <Text>{item.title}</Text>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          </TouchableOpacity>
        ))}
      </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingVertical:12,
    height:90,
    paddingHorizontal:20,
    
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'orange',
    padding: 5,
    margin: 5,
    minWidth: 80,
    borderRadius:12,
    alignItems:'center'
  },
  image:{
    width: 40,
    height: 40,
    resizeMode:'contain'
  }

})