import { SVGProps, memo } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={"#7c7c7c"}
    height={24}
    style={{ cursor: "pointer" }}
    viewBox={"0 0 1024 1024"}
    width={24}
    xmlns={"http://www.w3.org/2000/svg"}
    {...props}
  >
    <path
      d={
        "M960 79.904H64c-35.184 0-64 28.816-64 64v736.192c0 35.184 28.816 64 64 64h896c35.184 0 64-28.816 64-64V143.904c0-35.184-28.816-64-64-64zm0 800.193-895.999-.001v-188.56l256.848-248.912L585.633 707.12c10.912 13.248 30.336 11.568 44.128 1.12l116.88-105.808 210.8 216.384c.8.8 1.695 1.391 2.56 2.08v59.2zm.001-150.305L771.97 537.376c-11.408-11.248-29.28-12.4-41.937-2.752l-120.56 105.024-264.943-262.08a32.09 32.09 0 0 0-22.688-11.6c-8.816-.32-17.505 2.56-23.969 8.624l-233.872 227.6V143.904h896v585.888zM736.002 400.128c35.28 0 63.84-28.608 63.84-63.84 0-35.217-28.56-63.825-63.84-63.825s-63.84 28.608-63.84 63.824c0 35.233 28.56 63.841 63.84 63.841z"
      }
    />
  </svg>
);
const Memo = memo(SvgComponent);

export default Memo;
