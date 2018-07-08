import React, { Component } from "react";
import PropTypes from "prop-types";
import { MapView, Permissions } from "expo";
import { Alert, Linking, View } from "react-native";
import Button, { RoundButton } from "../../components/Button";
import MapStyle from "../../styles/Map";
import { BodyText } from "../../components/Typography";
import Colors from "../../constants/Colors";

const initialRegion = {
  latitude: 51.5246586,
  longitude: -0.1339784,
  latitudeDelta: 0.0012,
  longitudeDelta: 0.0071,
};

class Map extends Component {
  static propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    address: PropTypes.string,
  };

  static defaultProps = {
    lat: initialRegion.latitude,
    lng: initialRegion.longitude,
    address: "",
  };

  state = {
    showLocation: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    console.log(`Permission status: ${status}`);
    if (status === "granted") {
      this.state.showLocation = true;
    } else if (status === "denied") {
      this.state.showLocation = false;
    } else {
      const { status: askStatus } = await Permissions.askAsync(
        Permissions.LOCATION,
      );
      this.state.showLocation = askStatus === "granted";
    }
  }

  async requestLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    return this.setState({ showLocation: status === "granted" });
  }

  locationAlert(mapsUrl) {
    Alert.alert(
      "Permission Required",
      "We need permission to access your location to show the map.",
      [
        {
          text: "Open in Maps",
          onPress: () => {
            Linking.openURL(mapsUrl);
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Enable",
          style: "destructive",
          onPress: () => {
            this.requestLocation();
          },
        },
      ],
    );
  }

  render() {
    const { lat, lng, address } = this.props;
    const { showLocation } = this.state;
    const mapsUrl = address
      ? `https://www.google.com/maps/search/?api=1&query=${address}`
      : "";

    if (!showLocation) {
      return (
        <View
          style={[
            MapStyle.wideMap,
            {
              height: 200,
              backgroundColor: Colors.textInputBackground,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginHorizontal: 20,
              marginTop: 0,
            },
          ]}
        >
          <BodyText style={{ position: "relative" }}>
            Location permission is required to view the map in-app.
          </BodyText>
          <Button
            onPress={() => this.locationAlert(mapsUrl)}
            style={{ justifyContent: "space-around" }}
          >
            Show Map
          </Button>
        </View>
      );
    }
    return (
      <View style={MapStyle.wideMap}>
        <MapView
          style={[
            MapStyle.wideMap,
            {
              marginTop: 0,
            },
          ]}
          showUserLocation
          showsMyLocationButton
          initialRegion={initialRegion}
          region={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: initialRegion.latitudeDelta,
            longitudeDelta: initialRegion.longitudeDelta,
          }}
        >
          <MapView.Marker coordinate={{ latitude: lat, longitude: lng }} />
        </MapView>
        <RoundButton
          wrapperStyle={{
            position: "absolute",
            right: 20,
            bottom: 10,
          }}
          icon="compass"
          onPress={() => Linking.openURL(mapsUrl)}
        />
      </View>
    );
  }
}

export default Map;
