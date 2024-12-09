import React from "react";

const Timeline = ({ steps }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col sm:flex-row items-center">
          {/* Circle with Text under */}
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 ${
                step.completed
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-gray-200 border-gray-300"
              }`}
            >
              {step.completed ? "✔" : index + 1}
            </div>
            <span className="text-xs sm:text-sm mt-2 text-center text-gray-600">
              {step.label}
            </span>
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-1 w-8 sm:w-12 ${
                steps[index + 1].completed ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
