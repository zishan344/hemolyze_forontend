import { CSSProperties } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
}

const Image = ({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  className,
  ...props
}: ImageProps) => {
  const imgStyle: CSSProperties = fill
    ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        inset: 0,
        objectFit: "cover",
      }
    : {};

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      style={imgStyle}
      {...props}
    />
  );
};

export default Image;
