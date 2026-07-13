"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { renderToString } from "react-dom/server";

// Default coordinate for Dhaka, Bangladesh
const DEFAULT_CENTER = { lat: 23.8103, lng: 90.4125 };

type LocationMapProps = {
  lat?: number;
  lng?: number;
  onChange: (lat: number, lng: number) => void;
};

// Create a custom icon using Lucide MapPin to avoid Leaflet default icon issues in Next.js
const customMarkerIcon = L.divIcon({
  html: renderToString(
    <MapPin className="text-primary fill-primary/20 h-8 w-8" />,
  ),
  className: "bg-transparent border-none",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function LocationMarker({
  position,
  setPosition,
  onChange,
}: {
  position: L.LatLng | null;
  setPosition: (p: L.LatLng) => void;
  onChange?: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      if (onChange) onChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customMarkerIcon} />
  );
}

function MapUpdater({ position }: { position: L.LatLng | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14);
    }
  }, [position, map]);
  return null;
}

export default function LocationMap({ lat, lng, onChange }: LocationMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState<L.LatLng>(
    lat !== undefined && lng !== undefined
      ? new L.LatLng(lat, lng)
      : new L.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
  );

  const [mapId] = useState(() => Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (
      lat !== undefined &&
      lng !== undefined &&
      (position.lat !== lat || position.lng !== lng)
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosition(new L.LatLng(lat, lng));
    }
  }, [lat, lng]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isMounted)
    return (
      <div className="bg-muted/20 h-full min-h-[300px] w-full animate-pulse overflow-hidden rounded-xl" />
    );

  return (
    <div className="h-full min-h-[300px] w-full overflow-hidden">
      <MapContainer
        key={mapId}
        center={position || DEFAULT_CENTER}
        zoom={13}
        scrollWheelZoom={true}
        className="z-0 h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          position={position}
          setPosition={setPosition}
          onChange={onChange}
        />
        <MapUpdater position={position} />
      </MapContainer>
    </div>
  );
}
