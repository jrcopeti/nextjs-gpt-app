"use client";

import { getAllTours } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import ToursList, { ToursListProps } from "./ToursList";
import { useState } from "react";

function ToursPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending } = useQuery({
    queryKey: ["tours", searchTerm],
    queryFn: () => getAllTours(searchTerm),
  });
  console.log("data", data);
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
        <ToursList tours={(data as ToursListProps[]) || []} />
      )}
    </>
  );
}

export default ToursPage;
