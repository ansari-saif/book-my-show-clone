import React from "react";

interface CastProps {
  image: string;
  castName: string;
  role: string;
}

const Cast: React.FC<CastProps> = ({ image, castName, role }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32">
        <img
          src={`https://image.tmdb.org/t/p/original${image}`}
          alt={`${castName} as ${role}`}
          className="w-full h-full rounded-full object-center object-cover"
        />
      </div>
      <h1 className="text-gray-500 text-xl">{castName}</h1>
      <h5 className="text-gray-500 text-sm">{role}</h5>
    </div>
  );
};

export default Cast;
