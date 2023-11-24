import * as React from "react";
import { SVGProps, memo } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={"#4c4c4c"}
    height={24}
    viewBox={"0 0 512 512"}
    width={24}
    xmlSpace={"preserve"}
    xmlns={"http://www.w3.org/2000/svg"}
    {...props}
  >
    <path
      d={
        "M451.368 229.053v-60.632h-40.421v60.632h-60.631v40.421h60.631v60.631h40.421v-60.631H512v-40.421zm-211.453 47.671c33.652-18.238 56.506-53.864 56.506-94.829 0-59.531-48.259-107.789-107.789-107.789s-107.79 48.258-107.79 107.789c0 40.965 22.854 76.591 56.506 94.829C66.732 283.298 0 352.877 0 437.895h377.263c0-85.018-66.732-154.597-137.348-161.171z"
      }
    />
  </svg>
);
const Memo = memo(SvgComponent);

export default Memo;
