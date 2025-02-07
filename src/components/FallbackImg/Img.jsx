import React, { useState } from "react";

const Img = ({ src, alt, fallbackSrc, lazy, className, dataTestId}) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };
return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      loading={`${lazy ? `lazy` : ""}`}
      className={className}
      data-testid= {dataTestId ? dataTestId :  `img-fallback`}
    />
  );
};

export default Img;