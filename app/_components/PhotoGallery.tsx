/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa"; // Import delete icon
import { toast } from "sonner";

interface PhotoGalleryProps {
  photos: {
    id: number;
    url: string;
    comments?: { id: number; content: string }[];
  }[]; // Pass photos as prop
  fetchPhotos: () => void; // Function to fetch photos
}

const PhotoGallery = ({ photos, fetchPhotos }: PhotoGalleryProps) => {
  const [comments, setComments] = useState<{ [key: number]: string }>({}); // Manage comments per photo

  // Handle adding a comment
  const handleComment = async (photoId: number) => {
    const content = comments[photoId];
    if (!content) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ content, photoId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        fetchPhotos(); // Re-fetch photos after comment is added
        toast.success("Comment added successfully!");
        setComments((prev) => ({ ...prev, [photoId]: "" })); // Clear comment after submission
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      toast.error("Error adding comment" + error.message);
    }
  };

  // Handle deleting a photo
  const handleDeletePhoto = async (photoId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this photo?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/photos?id=${photoId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchPhotos(); // Re-fetch photos after deletion
        toast.success("Photo deleted successfully!");
      } else {
        toast.error("Failed to delete photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Error deleting photo" + error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.length === 0 ? (
        <p className="text-xl text-center py-2 ">No photos available.</p>
      ) : (
        photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl relative"
          >
            {/* Delete Icon */}
            <button
              onClick={() => handleDeletePhoto(photo.id)}
              className="absolute top-2 right-2 p-2 bg-gray-800 text-white rounded-full hover:bg-red-600 focus:outline-none"
            >
              <FaTrashAlt className="w-5 h-5" />
            </button>
            <img
              src={photo.url}
              alt="Photo"
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <textarea
                value={comments[photo.id] || ""}
                onChange={(e) =>
                  setComments({ ...comments, [photo.id]: e.target.value })
                }
                placeholder="Add a comment"
                className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
              <button
                onClick={() => handleComment(photo.id)}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              >
                Add Comment
              </button>

              <div className="mt-4 h-16 overflow-y-scroll border border-dotted rounded-sm">
                {photo.comments?.map((comment: any, i: number) => (
                  <div key={comment.id} className="text-gray-700 text-sm mb-2">
                    <strong className="text-gray-900">{i + 1}. </strong>
                    {comment.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PhotoGallery;
