"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";

import ToursList from "./ToursList";

import { getAllTours } from "@/utils/actions";
import { TourProps } from "@/utils/types";

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
      <form className="mb-12 max-w-lg">
        <div className="join w-full">
          <input
            type="text"
            placeholder="enter city or country here..."
            className="input join-item input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button
            className="btn btn-primary join-item "
            type="button"
            disabled={isPending}
            onClick={(e) => setSearchTerm("")}
          >
            {isPending ? "Please wait..." : "Reset"}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className="loading"></span>
      ) : (
        <ToursList tours={(data as TourProps[]) || []} />
      )}
    </>
  );
}

export default ToursPage;
