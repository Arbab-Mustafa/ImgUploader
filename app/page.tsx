"use client";
import { useState } from "react";
import PhotoGallery from "./_components/PhotoGallery";
import PhotoUpload from "./_components/PhotoUpload";

const HomePage = () => {
  interface Photo {
    id: number;
    url: string;
    title: string;
  }

  const [photos, setPhotos] = useState<Photo[]>([]);

  // Function to fetch photos
  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/photos");
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      } else {
        console.error("Failed to fetch photos");
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl font-semibold my-8">
        Photo Upload App
      </h1>
      <PhotoUpload refreshPhotos={fetchPhotos} />{" "}
      {/* Pass fetchPhotos to PhotoUpload */}
      <PhotoGallery photos={photos} fetchPhotos={fetchPhotos} />
    </div>
  );
};

export default HomePage;
