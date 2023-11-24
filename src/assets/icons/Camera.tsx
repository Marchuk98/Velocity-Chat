import { SVGProps, memo } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className={"bi bi-camera-video-fill"}
    fill={"#4c4c4c"}
    height={24}
    viewBox={"0 0 16 16"}
    width={24}
    xmlns={"http://www.w3.org/2000/svg"}
    {...props}
  >
    <path
      d={
        "M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"
      }
      fillRule={"evenodd"}
    />
  </svg>
);
const Memo = memo(SvgComponent);

export default Memo;
