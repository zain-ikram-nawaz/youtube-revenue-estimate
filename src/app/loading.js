// components/ChannelIncomeLoader.jsx
"use client"
export default function ChannelIncomeLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      flexDirection: 'column',
      gap: '30px'
    }}>
      {/* Main Spinner */}
      <div style={{
        position: 'relative',
        width: '80px',
        height: '80px'
      }}>
        {/* Outer Ring - Red */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '3px solid #ff4444',
          borderTop: '3px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>

        {/* Middle Ring - Dark Red */}
        <div style={{
          position: 'absolute',
          width: '70%',
          height: '70%',
          top: '15%',
          left: '15%',
          border: '2px solid #cc0000',
          borderBottom: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spinReverse 0.8s linear infinite'
        }}></div>

        {/* Inner Dot - Red Gradient */}
        <div style={{
          position: 'absolute',
          width: '20%',
          height: '20%',
          top: '40%',
          left: '40%',
          background: 'linear-gradient(45deg, #ff4444, #cc0000)',
          borderRadius: '50%',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}></div>

        {/* Income Chart Bars */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: '5px'
        }}>
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              style={{
                width: '6px',
                background: 'linear-gradient(to top, #ff4444, #ff6666)',
                margin: '0 2px',
                borderRadius: '2px 2px 0 0',
                animation: `grow${bar} 1.5s ease-in-out infinite`,
                animationDelay: `${bar * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Text with Modern Typography */}
      <div style={{
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h3 style={{
          color: '#cc0000',
          margin: '0 0 8px 0',
          fontSize: '20px',
          fontWeight: '600',
          background: 'linear-gradient(45deg, #cc0000, #ff4444)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Channel Income
        </h3>
        <p style={{
          color: '#666',
          margin: '0',
          fontSize: '14px',
          fontWeight: '400'
        }}>
          Loading Guide...
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '200px',
        height: '4px',
        backgroundColor: '#f0f0f0',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #ff4444, #cc0000)',
          animation: 'progress 2s ease-in-out infinite',
          transformOrigin: 'left'
        }}></div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spinReverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        @keyframes grow1 {
          0%, 100% { height: 10px; }
          50% { height: 25px; }
        }

        @keyframes grow2 {
          0%, 100% { height: 15px; }
          50% { height: 30px; }
        }

        @keyframes grow3 {
          0%, 100% { height: 20px; }
          50% { height: 35px; }
        }

        @keyframes grow4 {
          0%, 100% { height: 12px; }
          50% { height: 28px; }
        }

        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}