"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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
    <MapPin className="text-primary fill-primary/20 h-8 w-8 -translate-x-1/2 -translate-y-full" />,
  ),
  className: "bg-transparent border-none",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function LocationMarker({
  position,
  setPosition,
}: {
  position: L.LatLng | null;
  setPosition: (p: L.LatLng) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customMarkerIcon} />
  );
}

export default function LocationMap({ lat, lng, onChange }: LocationMapProps) {
  const [position, setPosition] = useState<L.LatLng | null>(
    lat && lng ? new L.LatLng(lat, lng) : null,
  );

  useEffect(() => {
    if (position) {
      onChange(position.lat, position.lng);
    }
  }, [position, onChange]);

  return (
    <div className="h-[300px] w-full overflow-hidden rounded-xl border">
      <MapContainer
        center={position || DEFAULT_CENTER}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}
