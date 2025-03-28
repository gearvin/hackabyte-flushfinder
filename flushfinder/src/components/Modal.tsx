import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5300/api';

const Modal = ({ id, isOpen, onClose }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      if (!id) {
        throw new Error("id is undefined");
      }
      const response = await axios.post(
        `${API_URL}/toilets/${id}/reviews`,
        data,
        {
          headers: {
            "x-api-key": "toilet-finder-api-key-hackathon-2025",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      onClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      onClose();
    }
  };

  const onSubmit = (data: any) => {
    const formattedData = {
      title: data.title,
      reviewer_nickname: data.reviewer_nickname || "Anonymous",
      cleanliness_rating: parseInt(data.cleanliness_rating),
      accessibility_rating: parseInt(data.accessibility_rating),
      overall_rating: parseInt(data.overall_rating),
      comment: data.comment,
      type: parseInt(data.type),
    };

    console.log("Form Submitted:", formattedData);

    mutate(formattedData); // Trigger the mutation when the form is submitted
  };

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="py-8 px-10 rounded-lg shadow-lg bg-white w-[90%] max-w-2xl fixed inset-0 m-auto z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Write a Review</h2>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ✖
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Title*"
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Nickname (optional)"
            {...register("reviewer_nickname")}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Cleanliness Rating (0-5)*"
            {...register("cleanliness_rating", {
              required: "Cleanliness rating is required",
              min: 0,
              max: 5,
            })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.cleanliness_rating && (
            <p className="text-red-500 text-sm">{errors.cleanliness_rating.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Accessibility Rating (0-5)*"
            {...register("accessibility_rating", {
              required: "Accessibility rating is required",
              min: 0,
              max: 5,
            })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.accessibility_rating && (
            <p className="text-red-500 text-sm">{errors.accessibility_rating.message}</p>
          )}
        </div>

        <div>
          <input
            type="number"
            placeholder="Overall Rating (0-5)*"
            {...register("overall_rating", {
              required: "Overall rating is required",
              min: 0,
              max: 5,
            })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.overall_rating && (
            <p className="text-red-500 text-sm">{errors.overall_rating.message}</p>
          )}
        </div>

        <div>
          <select
            {...register("type", {
              required: "Type is required",
              min: 1,
              max: 3,
            })}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="" disabled>Select Gender</option>
            <option value={1}>Disabled</option>
            <option value={2}>Female</option>
            <option value={3}>Male</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Comment*"
            {...register("comment", { required: "Comment is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">{errors.comment.message}</p>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-amber-800 text-white rounded-xl hover:bg-amber-900"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Modal;
