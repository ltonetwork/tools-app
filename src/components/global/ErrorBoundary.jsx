import React from "react";
import ltoLogo from "../../assets/lto-icon.png";
import Button from "@mui/material/Button";

const ErrorBoundary = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={ltoLogo}
          alt="Background 1"
          className="absolute top-10 left-10 w-20 h-20 sm:w-32 sm:h-32 object-cover blur-xl opacity-60"
        />
        <img
          src={ltoLogo}
          alt="Background 2"
          className="absolute bottom-10 right-10 w-24 h-24 sm:w-40 sm:h-40 object-cover blur-xl opacity-60"
        />
        <img
          src={ltoLogo}
          alt="Background 3"
          className="absolute top-1/2 left-1/3 w-32 h-32 sm:w-48 sm:h-48 object-cover blur-xl opacity-60 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-[#18054B] mb-4">
          Oops!
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6">
          The page you're looking for doesn't exist or something went wrong.
        </p>
        <Button
          variant="contained"
          color="primary"
          href="/"
          className="px-6 py-3 text-lg rounded-lg shadow"
          sx={{
            backgroundColor: "#18054B",
            "&:hover": { backgroundColor: "#1a0b5e" },
          }}
        >
          Return to safety
        </Button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
