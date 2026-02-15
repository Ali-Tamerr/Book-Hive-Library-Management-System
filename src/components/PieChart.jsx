import React from "react";

const PieChart = ({ totalBorrowed, currentlyBorrowed, returnedBooks }) => {
  const size = 9999;
  const radius = size / 2 - 10;
  const center = size / 2;

  const totalForChart = totalBorrowed || 0;
  const borrowedPercentage =
    totalForChart > 0 ? currentlyBorrowed / totalForChart : 0;
  const returnedPercentage =
    totalForChart > 0 ? returnedBooks / totalForChart : 0;

  if (totalForChart === 0 || (currentlyBorrowed === 0 && returnedBooks === 0)) {
    return (
      <div className="flex h-full w-full items-center justify-center max-[1540px]:max-h-[300px] max-[1540px]:max-w-[300px]">
        <svg viewBox={`0 0 ${size} ${size}`} className="block h-full w-full">
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="fill-[#3D3E3E] dark:fill-[#292D32]"
          />
        </svg>
      </div>
    );
  }

  const borrowedDegrees = borrowedPercentage * 360;
  const returnedDegrees = returnedPercentage * 360;

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    if (endAngle - startAngle >= 359.99) {
      return null;
    }
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
      "M",
      x,
      y,
      "L",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "Z",
    ].join(" ");
    return d;
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const borrowedStart = 0;
  const borrowedEnd = borrowedDegrees;
  const returnedStart = borrowedEnd;
  const returnedEnd = returnedStart + returnedDegrees;

  const isBorrowedFullCircle = borrowedDegrees >= 359.99;
  const isReturnedFullCircle = returnedDegrees >= 359.99;

  return (
    <div className="flex h-full w-full items-center justify-center max-[1540px]:max-h-[300px] max-[1540px]:max-w-[300px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="block h-full w-full">
        {isBorrowedFullCircle ? (
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="fill-[#3D3E3E] dark:fill-[#D7D7D7]"
          />
        ) : (
          borrowedDegrees > 0 && (
            <path
              d={describeArc(
                center,
                center,
                radius,
                borrowedStart,
                borrowedEnd,
              )}
              className="fill-[#3D3E3E] dark:fill-[#D7D7D7]"
            />
          )
        )}
        {isReturnedFullCircle ? (
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="fill-[#000035] dark:fill-[#292D32]"
          />
        ) : (
          returnedDegrees > 0 && (
            <path
              d={describeArc(
                center,
                center,
                radius,
                returnedStart,
                returnedEnd,
              )}
              className="fill-[#000035] dark:fill-[#292D32]"
            />
          )
        )}
      </svg>
    </div>
  );
};

export default PieChart;
