"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TourInfo from "./TourInfo";
import {
  createNewTour,
  fetchUserTokensbyId,
  generateTourResponse,
  getExistingTour,
  subtractedTokens,
} from "@/utils/actions";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

interface Destination {
  city: string;
  country: string;
  userId: string;
}

function NewTour() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

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

      if (!userId) {
        return <div>Not signed in</div>;
      }

      const currentTokens = await fetchUserTokensbyId(userId);
      console.log("currentTokens", currentTokens);

      if (!currentTokens) {
        toast.error("Could not retrieve token balance.");
        return;
      }

      if (currentTokens.tokens < 300) {
        toast.error("Token balance is too low to create a new tour.");
        return;
      }

      const newTour = await generateTourResponse(destination);
      console.log("newTour", newTour);

      if (!newTour) {
        toast.error("No matching tours found");
        return null;
      }

      const response = await createNewTour({ ...newTour.tour, userId });
      console.log("response", response);

      queryClient.invalidateQueries({ queryKey: ["tours"] });
      const updatedTokens = await subtractedTokens(userId, newTour.tokens ?? 0);
      toast.success(`You have ${updatedTokens} tokens left.`);
      return newTour.tour;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const destination: Destination = {
      city: formData.get("city") as string,
      country: formData.get("country") as string,
      userId: userId as string,
    };
    console.log("destination", destination);
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
