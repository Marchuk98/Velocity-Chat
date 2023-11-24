import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className={"icon flat-color"}
    data-name={"Flat Color"}
    height={24}
    viewBox={"0 0 24 24"}
    width={24}
    xmlns={"http://www.w3.org/2000/svg"}
    {...props}
  >
    <path
      d={
        "M13.5 12a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5Zm4.5-1.5a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5Zm-12 0A1.5 1.5 0 1 0 7.5 12 1.5 1.5 0 0 0 6 10.5Z"
      }
      style={{
        fill: "#4c4c4c",
      }}
    />
  </svg>
);
const Memo = memo(SvgComponent);

export default Memo;
