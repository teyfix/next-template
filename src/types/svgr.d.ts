declare module "*.svg" {
  import type React from "react";

  /**
   * @see https://react-svgr.com/docs/webpack
   */
  const ReactComponent: React.FC<React.SVGAttributes<SVGElement>>;

  export default ReactComponent;
}
