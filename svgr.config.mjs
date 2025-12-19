import { capitalCase } from "change-case";
import svgoConfig from "./svgo.config.mjs";

/**
 * Add a list of colors you want to map as `currentColor`
 */
const currentColor = ["#000", "#000000", "rgb(0,0,0)", "rgba(0,0,0,1)"];

/**
 * Prepends `<title/>` to imported `<svg/>`
 * elements based on the component name.
 *
 * @type {import('@svgr/core').Config['template']}
 */
const template = (variables, { tpl }) => {
  const defaultTitle = `${capitalCase(variables.componentName.replace(/^svg/i, ""))} Icon`;
  const internalComponentName = `Internal${variables.componentName}`;

  return tpl`
  ${variables.imports};

  ${variables.interfaces};

  function withTitle(Component) {
    return function SvgWithTitle(props) {
      return <Component {...props} title={props.title || '${defaultTitle}'} />;
    };
  }

  const ${internalComponentName} =  (${variables.props}) => (
    ${variables.jsx}
  );

  const ${variables.componentName} = withTitle(${internalComponentName});

  ${variables.exports};
  `;
};

/**
 * @type {import('@svgr/core').Config}
 */
const svgrOptions = {
  dimensions: false,
  replaceAttrValues: Object.fromEntries(
    currentColor.map((color) => [color, "currentColor"]),
  ),
  svgoConfig,
  template,
};

export default svgrOptions;
