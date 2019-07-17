import React from "react";
import Auth from "@aws-amplify/auth";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Alert
} from "react-native";
import Image from "react-native-scalable-image";
import MenuButton from "../MenuButton";
import {getOwnerByOwnerId} from "../../Api"

const INITIAL_STATE = {
  userExist: false,
  userID: "",
  email: "",
  phoneNumber: "",
  longDescription:
    "Whilst we sell fantastic modern & seasonal beers, wines & mixed drinks we also have loose leaf teas and locally sourced filtered coffee from Ancoats Coffee plus sandwiches, pastries, sweet & savory baked goods.",
  address: "Hanover St, Manchester M60 0AB, UK",
  venueName: "The Pilcrow Pub",
  shortDescription: "We are a contemporary pub situated at Sadlers Yard, Manchester.",
  photoUri:
    "https://static1.squarespace.com/static/5437909ee4b02d632f5b2d5d/58d93902e4fcb5ad94d1f2e4/58d976766b8f5b87ea1852f5/1490646748896/DSC_9391.JPG?format=500w",
  latitude: 53.4868458,
  longitude: -2.2401032,
  loading: false
};
export default class PromoScreen extends React.Component {
  state = { ...INITIAL_STATE };
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        getOwnerByOwnerId(user.username).then(ownerDetails => {
          
          this.setState({ownerDetails})

        })
       
      })
      .catch(err => console.log(err));
    //get owner profile from backend
  }
  render() {
    const {
      email,
      phoneNumber,
      longDescription,
      address,
      venueName,
      shortDescription,
      photoUri,
      latitude,
      longitude,
      loading
    } = this.state;
    return (
      <ScrollView style={{ backgroundColor: "#FDD96E" }}>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={styles.textStyle}>{venueName}</Text>
          <Text style={styles.title}>{shortDescription}</Text>
          <Text style={styles.phone}>Tel: {phoneNumber}</Text>
          <Image
            width={Dimensions.get("window").width - 32}
            source={{ uri: "https://static1.squarespace.com/static/5437909ee4b02d632f5b2d5d/58d93902e4fcb5ad94d1f2e4/58d976766b8f5b87ea1852f5/1490646748896/DSC_9391.JPG?format=500w" }}
          />
          <Text style={styles.title}>{longDescription}</Text>
          <MapView
            style={styles.map}
            provider="google"
            region={{
              latitude: 53.4808,
              longitude: -2.2426,
              latitudeDelta: 0.03,
              longitudeDelta: 0.02
            }}
          >
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude
              }}
              title={venueName}
              description={shortDescription}
            />
          </MapView>
          <Text style={styles.offer}>Previous offers</Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDD96E",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 16,
    marginRight: 16
  },
  map: { marginTop: 10, alignSelf: "stretch", height: 300 },

  textStyle: {
    marginTop: 50,
    fontSize: 17,
    fontWeight: "bold",
    color: "#0468d4"
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    color: "#0468d4"
  },
  phone: {
    marginBottom: 10,
    fontSize: 15,
    color: "#0468d4"
  },
  offer: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "bold",
    color: "#0468d4"
  }
});
