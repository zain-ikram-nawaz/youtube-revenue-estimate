"use client"

export default function Loader() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-background flex-col gap-8">
        {/* Main Spinner */}
        <div className="relative w-20 h-20">
          {/* Outer Ring */}
          <div className="absolute w-full h-full border-4 border-primary border-t-transparent rounded-lg animate-spin"></div>

          {/* Middle Ring */}
          <div className="absolute w-3/5 h-3/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-primary-hover border-b-transparent rounded-lg animate-spin-reverse"></div>

          {/* Inner Dot */}
          <div className="absolute w-1/5 h-1/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary rounded-lg animate-pulse"></div>

          {/* Income Chart Bars */}
          <div className="absolute w-full h-full flex justify-center items-end pb-1">
            {[1,2,3,4].map((bar) => (
              <div
                key={bar}
                className={`w-1.5 bg-primary mx-0.5 rounded-t-sm animate-grow-${bar}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="text-center font-sans">
          <h3 className="text-primary text-xl font-semibold mb-2">
            Channel Income
          </h3>
          <p className="text-muted text-sm">
            Loading Guide...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-secondary rounded-lg overflow-hidden">
          <div className="w-full h-full bg-primary animate-progress origin-left"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-reverse {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }

        @keyframes grow-1 {
          0%, 100% { height: 10px; }
          50% { height: 25px; }
        }

        @keyframes grow-2 {
          0%, 100% { height: 15px; }
          50% { height: 30px; }
        }

        @keyframes grow-3 {
          0%, 100% { height: 20px; }
          50% { height: 35px; }
        }

        @keyframes grow-4 {
          0%, 100% { height: 12px; }
          50% { height: 28px; }
        }

        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }

        .animate-spin-reverse {
          animation: spin-reverse 0.8s linear infinite;
        }

        .animate-grow-1 {
          animation: grow-1 1.5s ease-in-out infinite;
          animation-delay: 0.1s;
        }

        .animate-grow-2 {
          animation: grow-2 1.5s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .animate-grow-3 {
          animation: grow-3 1.5s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        .animate-grow-4 {
          animation: grow-4 1.5s ease-in-out infinite;
          animation-delay: 0.4s;
        }

        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
