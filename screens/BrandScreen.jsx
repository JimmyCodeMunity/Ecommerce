import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'

const brands = [
    {
      id: 1,
      title: "Samsung",
      color: "#FF6347",
      image: require("../assets/samsung.png"),
      icon: "log-in",
    },
    {
      id: 2,
      title: "Apple",
      color: "#FF6347",
      image: require("../assets/apple.png"),
      icon: "log-in",
    },
    {
      id: 3,
      title: "Nike",
      color: "#4169E1",
      image: require("../assets/nike.png"),
      icon: "search",
    },
    {
      id: 4,
      title: "Cocacola",
      color: "#32CD32",
      image: require("../assets/cola.jpg"),
    },
    {
      id: 5,
      title: "Channel",
      color: "#FF8C00",
      image: require("../assets/chanel.jpg"),
    },
    {
      id: 6,
      title: "Louis Vuitton",
      color: "#FF8C00",
      image: require("../assets/lv.jpg"),
    },
    {
      id: 7,
      title: "Gucci",
      color: "#FF8C00",
      image: require("../assets/gucc.png"),
    },
    {
        id: 8,
        title: "Versace",
        color: "#FF8C00",
        image: require("../assets/vars.jpg"),
      },
      {
        id: 9,
        title: "Burberry",
        color: "#FF8C00",
        image: require("../assets/burb.png"),
      },
      {
        id: 10,
        title: "Bic",
        color: "#FF8C00",
        image: require("../assets/bic.png"),
      },
      {
        id: 11,
        title: "Givenchy",
        color: "#FF8C00",
        image: require("../assets/givenchy.png"),
      },
  ];

export default function BrandScreen({navigation,route}) {
  
  
  return (
    <ScrollView vertical={true} style={styles.container}>
    <View style={styles.header}>
        <Text style={{ fontSize:24,color:'orange',fontWeight:"bold", }}>All Brands</Text>
    </View>
      <View style={{alignItems:'center'}}>
      <View style={styles.cardContainer} horizontal={true}>
        {brands.map((brand) => (
          <TouchableOpacity
          onPress={() =>
            navigation.navigate("BrandView", {
              brandName: brand.brandname,
              brandImage: brand.image,
              brandcat1: brand.subcategories,
              brandcategories: brand.subcategories,

              
            })
          }
          key={brand._id}
        >
          <View style={styles.card} key={brand.id}>
            <Text>{brand.title}</Text>
            <Image
              source={brand.image}
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
  },
  header:{
    paddingVertical:30,
    paddingHorizontal:30,
  }

})