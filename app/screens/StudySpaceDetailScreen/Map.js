import React from "react";
import PropTypes from "prop-types";
import { Linking } from "react-native";
import { MapView } from "expo";
import MapStyle from "../../styles/Map";

const initialRegion = {
  latitude: 51.5246586,
  longitude: -0.1339784,
  latitudeDelta: 0.0012,
  longitudeDelta: 0.0071,
};

const Map = ({ lat, lng, address }) => {
  return (
    <MapView
      style={MapStyle.wideMap}
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
  );
};
Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  address: PropTypes.string,
};

Map.defaultProps = {
  lat: initialRegion.latitude,
  lng: initialRegion.longitude,
  address: "",
};

export default Map;
