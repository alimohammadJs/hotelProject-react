import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { styled } from "styled-components";
import useGeoLocation from "./useGeoLocation";
import { createSearchParams, useNavigate } from "react-router-dom";
import useGetParams from "../../hooks/useGetParams";

const GetLocationBtn = styled.button`
  padding: 0.3rem 0.5rem;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 0.5rem;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: var(--primary-600);
  box-shadow: 0 0 10px var(--primary-600);
  color: #fff;
  z-index: 1000;
`;

function Map({ markLocations }) {
  const [mapCenter, setMapCenter] = useState([45, 20]);
  const { location: geoLocation, getPosition, isLoading } = useGeoLocation();
  const [lat, lng] = useGetParams();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocation?.latitude && geoLocation?.longitude)
      setMapCenter([geoLocation.latitude, geoLocation.longitude]);
  }, [geoLocation]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={4}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      <GetLocationBtn onClick={() => getPosition()}>
        {isLoading ? "Loading..." : "Use Your Location"}
      </GetLocationBtn>
      <ChngeCenter position={mapCenter} />
      {markLocations.map((mark) => {
        return (
          <Marker key={mark.id} position={[mark.latitude, mark.longitude]}>
            <Popup>{mark.host_location}</Popup>
          </Marker>
        );
      })}
      <MapDetect />
    </MapContainer>
  );
}

export default Map;

function ChngeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function MapDetect() {
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      navigate({
        pathname: "/bookmark/add",
        search: createSearchParams({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }).toString(),
      });
    },
  });
  return null;
}
