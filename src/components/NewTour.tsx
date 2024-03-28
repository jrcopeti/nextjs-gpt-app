"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewTour,
  fetchUserTokensbyId,
  generateTourResponse,
  getExistingTour,
  subtractedTokens,
} from "@/utils/actions";

import TourInfo from "./TourInfo";

import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

import { cityCountryInput } from "@/utils/types";
import { FaSuitcase } from "react-icons/fa6";

function NewTour() {
  const queryClient = useQueryClient();
  const { userId } = useAuth();

  const {
    mutate: createNewTourOnSubmit,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (cityCountry: cityCountryInput) => {
      const existingTour = await getExistingTour(cityCountry);

      if (existingTour) {
        return existingTour;
      }

      if (!userId) {
        return <div>Not signed in</div>;
      }

      const currentTokens = await fetchUserTokensbyId(userId);

      if (!currentTokens) {
        throw new Error("Could not load tokens.");
      }

      if (currentTokens.tokens < 300) {
        throw new Error("Token balance is too low to create a new tour.");
      }

      const newTour = await generateTourResponse(cityCountry);
      console.log("newTour", newTour);
      if (!newTour) {
        throw new Error("No matching tours. Please try again.");
      }

      const response = await createNewTour({ ...newTour.tour, userId });

      queryClient.invalidateQueries({ queryKey: ["tours"] });
      const updatedTokens = await subtractedTokens(userId, newTour.tokens ?? 0);

      toast.success(`You have ${updatedTokens} tokens left.`);

      return newTour.tour;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const city = formData.get("city");
    const country = formData.get("country");

    const cityCountryInput: cityCountryInput = {
      city: typeof city === "string" ? city.toLowerCase() : "",
      country: typeof country === "string" ? country.toLowerCase() : "",
      userId: userId as string,
    };
    console.log("cityCountryInput", cityCountryInput);

    createNewTourOnSubmit(cityCountryInput);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-2xl flex-col items-center"
      >
        <h2 className="mb-4 flex items-center gap-3 text-xl">
          {" "}
          <span>
            <FaSuitcase />
          </span>{" "}
          Select your destination
        </h2>
        <div className="join join-vertical w-10/12 lg:join-horizontal lg:w-full">
          <input
            type="text"
            className="input join-item input-bordered w-full"
            placeholder="City"
            name="city"
            required
            disabled={isPending}
          />
          <input
            type="text"
            className="input join-item input-bordered w-full"
            placeholder="Country"
            name="country"
            required
            disabled={isPending}
          />

          <button
            className="btn btn-secondary join-item bg-gradient-to-r from-primary to-secondary hover:text-base-content"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-md text-base-content">
                {" "}
              </span>
            ) : (
              "Generate Tour"
            )}
          </button>
        </div>
      </form>
      {tour && (
        <div className="mt-16 ">
          <TourInfo tour={tour} />
        </div>
      )}
    </>
  );
}

export default NewTour;
