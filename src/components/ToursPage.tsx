"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";

import ToursList from "./ToursList";

import { getAllTours } from "@/utils/actions";
import { TourProps } from "@/utils/types";
import { GrPowerReset } from "react-icons/gr";

function ToursPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { userId } = useAuth();

  const { data, isPending } = useQuery({
    queryKey: ["tours", searchTerm],
    queryFn: () =>
      userId ? getAllTours(userId, searchTerm) : Promise.resolve(null),
  });

  return (
    <>
      <form className="mb-12  max-w-lg">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Search for city or country"
            className="input join-item input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            className="btn btn-secondary join-item bg-gradient-to-r from-primary to-secondary hover:text-base-content "
            type="button"
            disabled={isPending}
            onClick={(e) => setSearchTerm("")}
          >
            {isPending ? (
              <div className="loading loading-spinner loading-md text-base-content"></div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  <GrPowerReset />
                </span>
                Reset
              </div>
            )}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className="loading loading-spinner loading-lg mx-4"></span>
      ) : (
        <ToursList tours={(data as TourProps[]) || []} />
      )}
    </>
  );
}

export default ToursPage;
