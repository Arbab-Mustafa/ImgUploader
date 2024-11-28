"use client";
import { useState } from "react";
import { toast } from "sonner";

interface PhotoUploadProps {
  refreshPhotos: () => void; // Prop to trigger photo re-fetch
}

const PhotoUpload = ({ refreshPhotos }: PhotoUploadProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!url) {
      toast.error("Photo URL is required");
      return;
    }
    setIsLoading(true); // Start loading indicator
    try {
      const res = await fetch("/api/photos", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Photo uploaded successfully!");
        setUrl(""); // Clear input field
        refreshPhotos(); // Trigger re-fetch to update gallery
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to upload photo" + error.message);
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter photo URL"
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? "Uploading..." : "Upload Photo"}
      </button>
    </div>
  );
};

export default PhotoUpload;
