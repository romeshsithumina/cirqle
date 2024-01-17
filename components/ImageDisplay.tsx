// ImageDisplay.tsx
"use client";
import Image from "next/image";
import React from "react";
import { TbPhoto } from "react-icons/tb";
import { RViewer, RViewerTrigger } from "react-viewerjs";

interface ImageDisplayProps {
  value: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ value }) => {
  const sourceUrl = "/assets/test.png";
  const options = {
    toolbar: {
      prev: false,
      next: false,
    },
  };

  return (
    <>
      <div
        className="
          relative
          flex
          w-96
          cursor-pointer
          flex-col
          items-center
          justify-center
          gap-4
          border-2
          border-dashed
          border-neutral-300
          p-16
          text-neutral-600
          transition
          hover:opacity-70
        "
      >
        <TbPhoto size={50} />
        <div className="text-lg font-semibold">No image</div>
        {value && (
          <div id="image" className="absolute inset-0 h-full w-full">
            <RViewer options={options} imageUrls={sourceUrl}>
              <RViewerTrigger>
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src="/assets/test.png"
                  alt="test"
                />
              </RViewerTrigger>
            </RViewer>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageDisplay;
