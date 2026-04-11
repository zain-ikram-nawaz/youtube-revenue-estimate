"use client";
import { useState, useEffect } from "react";
import { Loader2, Search, Database, LineChart, BrainCircuit, CheckCircle2 } from "lucide-react";

const steps = [
  { id: 1, label: "Connecting to YouTube API...", icon: <Search className="w-4 h-4" /> },
  { id: 2, label: "Fetching Channel Statistics...", icon: <Database className="w-4 h-4" /> },
  { id: 3, label: "Calculating RPM & Revenue...", icon: <LineChart className="w-4 h-4" /> },
  { id: 4, label: "AI Strategic Analysis...", icon: <BrainCircuit className="w-4 h-4" /> },
];

export default function StepLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000); // Har 2 second baad step badlega

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] w-full max-w-md mx-auto">
      {/* Main Spinning Icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-20"></div>
        <div className="relative bg-white p-4 rounded-full shadow-xl border border-red-50">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
        </div>
      </div>

      <h2 className="text-xl font-black text-gray-900 mb-6 tracking-tight">
        Analyzing Channel Data...
      </h2>

      {/* Steps List */}
      <div className="w-full space-y-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
                isActive
                  ? "bg-red-50 border-red-100 translate-x-2"
                  : isCompleted
                  ? "bg-white border-gray-100 opacity-60"
                  : "bg-white border-transparent opacity-30"
              }`}
            >
              <div className={`shrink-0 ${isActive ? "text-red-600" : isCompleted ? "text-green-500" : "text-gray-400"}`}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
              </div>

              <span className={`text-sm font-bold ${isActive ? "text-red-900" : "text-gray-500"}`}>
                {step.label}
              </span>

              {isActive && (
                <div className="ml-auto flex gap-1">
                  <span className="w-1 h-1 bg-red-400 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-red-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-red-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 animate-pulse">
        Powered by ChannelIncome AI
      </p>
    </div>
  );
}