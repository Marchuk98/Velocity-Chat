import { SVGProps, memo } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={"currentColor"}
    height={20}
    width={20}
    xmlns={"http://www.w3.org/2000/svg"}
    {...props}
  >
    <g clipPath={"url(#a)"}>
      <path
        d={
          "m17.258 16.075-2.833-2.825a6.6 6.6 0 0 0 1.408-4.083 6.667 6.667 0 1 0-6.666 6.666 6.6 6.6 0 0 0 4.083-1.408l2.825 2.833a.833.833 0 0 0 1.183 0 .832.832 0 0 0 0-1.183ZM4.167 9.167a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
        }
        fill={"currentColor"}
      />
    </g>
    <defs>
      <clipPath id={"a"}>
        <path d={"M0 0h20v20H0z"} />
      </clipPath>
    </defs>
  </svg>
);

const Search = memo(SvgComponent);

export { Search };
