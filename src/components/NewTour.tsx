"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TourInfo from "./TourInfo";
import {
  createNewTour,
  generateTourResponse,
  getExistingTour,
} from "@/utils/actions";
import toast from "react-hot-toast";

interface Destination {
  city: string;
  country: string;
}

function NewTour() {
  const queryClient = useQueryClient();

  const {
    mutate: createNewTourOnSubmit,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination: Destination) => {
      const existingTour = await getExistingTour(destination);
      console.log("existingTour", existingTour);
      if (existingTour) {
        return existingTour;
      }

      const newTour = await generateTourResponse(destination);
      console.log("newTour", newTour)

      if (newTour) {
        const response = await createNewTour(newTour);
        console.log("response", response);
        queryClient.invalidateQueries({ queryKey: ["tours"] });
        return newTour
      }

      toast.error("No matching tours found");
      return null;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination: Destination = {
      city: formData.get("city") as string,
      country: formData.get("country") as string,
    };
    console.log(destination);
    createNewTourOnSubmit(destination);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
          <input
            type="text"
            className="input join-item input-bordered w-full"
            placeholder="City"
            name="city"
            required
          />
          <input
            type="text"
            className="input join-item input-bordered w-full"
            placeholder="Country"
            name="country"
            required
          />
          <button className="btn btn-primary join-item" type="submit">
            Generate tour
          </button>
        </div>
      </form>
      <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
    </>
  );
}

export default NewTour;
