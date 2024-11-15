import * as React from "react";
import { Html as HtmlImpl } from "@react-three/drei";
import { useContextBridge } from "its-fine";
import { HtmlProps } from "@react-three/drei/web/Html";

type CustomHTMLProps = HtmlProps & {
  children: React.ReactNode;
};

const CustomHTML = React.forwardRef<HTMLDivElement, CustomHTMLProps>(
  function Html({ children, ...props }, ref) {
    const Bridge = useContextBridge();
    return (
      <HtmlImpl {...props} ref={ref}>
        <Bridge>{children}</Bridge>
      </HtmlImpl>
    );
  }
);

export default CustomHTML;
