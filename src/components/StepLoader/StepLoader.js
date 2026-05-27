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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px] w-full max-w-md mx-auto">
      {/* Main Spinning Icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-lg bg-primary/20 animate-ping opacity-20"></div>
        <div className="relative bg-background p-4 rounded-lg shadow-xl border border-border">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      </div>

      <h2 className="text-xl font-black text-foreground mb-6 tracking-tight">
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
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-500 ${
                isActive
                  ? "bg-secondary border-border translate-x-2"
                  : isCompleted
                  ? "bg-background border-border opacity-60"
                  : "bg-background border-transparent opacity-30"
              }`}
            >
              <div className={`shrink-0 ${isActive ? "text-primary" : isCompleted ? "text-accent" : "text-muted"}`}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
              </div>

              <span className={`text-sm font-bold ${isActive ? "text-foreground" : "text-muted"}`}>
                {step.label}
              </span>

              {isActive && (
                <div className="ml-auto flex gap-1">
                  <span className="w-1 h-1 bg-primary rounded-lg animate-bounce"></span>
                  <span className="w-1 h-1 bg-primary rounded-lg animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1 h-1 bg-primary rounded-lg animate-bounce [animation-delay:-0.3s]"></span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-muted animate-pulse">
        Powered by ChannelIncome AI
      </p>
    </div>
  );
}
