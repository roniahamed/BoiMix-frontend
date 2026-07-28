"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { renderToString } from "react-dom/server";

// Default coordinate for Dhaka, Bangladesh
const DEFAULT_CENTER = { lat: 23.8103, lng: 90.4125 };

type LocationMapProps = {
  lat?: number;
  lng?: number;
  onChange?: (lat: number, lng: number) => void;
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

export default function LocationMap({ lat, lng, onChange }: LocationMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double initialization in React StrictMode

    const initialLat = lat !== undefined ? lat : DEFAULT_CENTER.lat;
    const initialLng = lng !== undefined ? lng : DEFAULT_CENTER.lng;

    const map = L.map(mapContainerRef.current).setView(
      [initialLat, initialLng],
      13,
    );
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const marker = L.marker([initialLat, initialLng], {
      icon: customMarkerIcon,
    }).addTo(map);
    markerRef.current = marker;

    map.on("click", (e: L.LeafletMouseEvent) => {
      const { lat: clickedLat, lng: clickedLng } = e.latlng;
      if (markerRef.current) {
        markerRef.current.setLatLng([clickedLat, clickedLng]);
      }
      if (onChange) {
        onChange(clickedLat, clickedLng);
      }
    });

    // Cleanup map on unmount to prevent container reuse errors & CPU spikes
    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, [isMounted]); // eslint-disable-line react-hooks/exhaustive-deps

  // Update marker position and map center when lat/lng props change from outside
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current) return;
    if (lat !== undefined && lng !== undefined) {
      const currentPos = markerRef.current.getLatLng();
      if (currentPos.lat !== lat || currentPos.lng !== lng) {
        markerRef.current.setLatLng([lat, lng]);
        mapInstanceRef.current.flyTo([lat, lng], 14);
      }
    }
  }, [lat, lng]);

  if (!isMounted) {
    return (
      <div className="bg-muted/20 h-full min-h-[300px] w-full animate-pulse overflow-hidden rounded-xl" />
    );
  }

  return (
    <div className="h-full min-h-[300px] w-full overflow-hidden rounded-xl">
      <div ref={mapContainerRef} className="z-0 h-full min-h-[300px] w-full" />
    </div>
  );
}
