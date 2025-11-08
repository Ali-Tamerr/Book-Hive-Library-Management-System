import React from 'react'

const PieChart = ({totalBorrowed,currentlyBorrowed, returnedBooks}) => {
    // Use 100% width/height of parent; maintain minimum size for mobile
    // We'll use viewBox for scaling the SVG nicely
    const size = 9999;
    const radius = size / 2 - 10;
    const center = size / 2;

    // Calculate percentages - use totalBorrowed as the total (all reservations)
    const totalForChart = totalBorrowed || 1;
    const borrowedPercentage = totalForChart > 0 ? (currentlyBorrowed / totalForChart) : 0;
    const returnedPercentage = totalForChart > 0 ? (returnedBooks / totalForChart) : 0;

    // If no data, show full circle in gray
    if (totalForChart === 0 || (currentlyBorrowed === 0 && returnedBooks === 0)) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <svg  viewBox={`0 0 ${size} ${size}`} className="block w-full h-full">
            <circle cx={center} cy={center} r={radius} fill="#4b5563" />
          </svg>
        </div>
      );
    }

    // Convert percentage to degrees (starting from top, -90 offset)
    const borrowedDegrees = borrowedPercentage * 360;
    const returnedDegrees = returnedPercentage * 360;

    // Create path function
    const describeArc = (x, y, radius, startAngle, endAngle) => {
      const start = polarToCartesian(x, y, radius, endAngle);
      const end = polarToCartesian(x, y, radius, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      const d = [
        "M", x, y,
        "L", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
      ].join(" ");
      return d;
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
      };
    };

    // Start angle from top (0 degrees is at top)
    const borrowedStart = 0;
    const borrowedEnd = borrowedDegrees;
    const returnedStart = borrowedEnd;
    const returnedEnd = returnedStart + returnedDegrees;

    return (
      <div className="w-full h-full flex items-center justify-center">
        <svg  viewBox={`0 0 ${size} ${size}`} className="block w-full h-full">
          {/* Borrowed segment - dark gray (larger segment) */}
          {borrowedDegrees > 0 && (
            <path
              d={describeArc(center, center, radius, borrowedStart, borrowedEnd)}
              fill="#4b5563"
            />
          )}
          {/* Returned segment - dark blue (smaller segment) */}
          {returnedDegrees > 0 && (
            <path
              d={describeArc(center, center, radius, returnedStart, returnedEnd)}
              fill="#0a0f33"
            />
          )}
        </svg>
      </div>
    );
  };

export default PieChart