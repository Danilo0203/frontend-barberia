"use client";
import SectionLayout from "../SectionLayout";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useState } from "react";

export const Ubicacion = () => {
  const API_KEY = "AIzaSyC6_DsuQzGUqXHDhCPBeFFie2WDfnbSeuA";
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMarkerClick = () => {
    setShowInfoWindow(true);
  };

  const handleCloseInfoWindow = () => {
    setShowInfoWindow(true);
  };

  const location = { lat: 14.913991, lng: -92.056804 };
  const name = "Mi Ubicación";
  const description = "Aquí puedes encontrar nuestra Barberia.";

  return (
    <SectionLayout id="ubicacion" title="Ubicación">
      <article className="flex w-full flex-grow flex-col items-center justify-between">
        <div className="mt-20 flex w-full flex-1 justify-around">
          <APIProvider apiKey={API_KEY}>
            <Map
              style={{ width: "100vw", height: "60vh" }}
              defaultCenter={location}
              defaultZoom={18}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              <Marker position={location} onClick={handleMarkerClick} />
              {showInfoWindow && (
                <InfoWindow
                  position={location}
                  onCloseClick={handleCloseInfoWindow}
                >
                  <div className="p-2">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-sm text-gray-700">{description}</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-blue-500 hover:underline"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      </article>
    </SectionLayout>
  );
};
