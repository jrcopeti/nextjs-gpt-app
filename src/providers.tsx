"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BiMessageSquareError } from "react-icons/bi";
import { RiTokenSwapLine } from "react-icons/ri";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      }),
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 5000,
              icon: <RiTokenSwapLine size={26} color="#2b9348" />,
            },
            error: {
              duration: 5000,
              icon: <BiMessageSquareError size={26} color="#b42727" />,
            },

            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              borderRadius: "10px",
              backgroundColor: "#C8CAD0",
              color: "#2E2E2E",
            },
          }}
        />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default Providers;
