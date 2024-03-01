import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback, memo } from 'react';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 50.076,
  lng: 14.436,
};

const GoogleMaps = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY || '',
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map: any) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
    ></GoogleMap>
  ) : (
    <></>
  );
};

export default memo(GoogleMaps);
