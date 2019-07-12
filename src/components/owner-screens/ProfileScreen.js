import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import MenuButton from "../MenuButton";

const INITIAL_STATE = {
  email: "",
  phone_number: "",
  description:
    "Whilst we sell fantastic modern & seasonal beers, wines & mixed drinks we also have loose leaf teas and locally sourced filtered coffee from Ancoats Coffee plus sandwiches, pastries, sweet & savory baked goods.",
  address: "Hanover St, Manchester M60 0AB, UK",
  name: "The Pilcrow Pub",
  title: "We are a contemporary pub situated at Sadlers Yard, Manchester.",
  photo_uri:
    "https://static1.squarespace.com/static/5437909ee4b02d632f5b2d5d/58d93902e4fcb5ad94d1f2e4/58d976766b8f5b87ea1852f5/1490646748896/DSC_9391.JPG?format=500w",
  lat: 53.4868458,
  lng: -2.2401032,
  loading: false
};
export default class PromoScreen extends React.Component {
  state = { ...INITIAL_STATE };
  componentDidMount() {
    //get owner profile from backend
  }
  render() {
    const {
      email,
      phone_number,
      description,
      address,
      name,
      title,
      photo_uri,
      lat,
      lng,
      loading
    } = this.state;
    return (
      <ScrollView style={{ backgroundColor: "#3a73b7" }}>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={styles.textStyle}>{name}</Text>
          <Text style={styles.title}>{title}</Text>
          <Image
            style={{ width: 300, height: 250, marginBottom: 10 }}
            source={{ uri: `${photo_uri}` }}
          />
          <MapView
            style={styles.map}
            provider="google"
            region={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.03,
              longitudeDelta: 0.02
            }}
          >
            <Marker
              coordinate={{
                latitude: lat,
                longitude: lng
              }}
              title={name}
              description={title}
            />
          </MapView>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3a73b7",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 10,
    marginRight: 10
  },
  map: { alignSelf: "stretch", height: 300 },

  textStyle: {
    marginTop: 50,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff"
  },
  title: {
    marginBottom: 10,
    fontSize: 15,
    color: "#fff"
  }
});