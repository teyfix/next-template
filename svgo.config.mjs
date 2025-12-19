/**
 * `svgo` config to be used by `@svgr/webpack`.
 *
 * @type {import('svgo').Config}
 */
const svgoConfig = {
  multipass: true, // Keep running optimisations until doesn't optimise anymore.
  plugins: [
    {
      // Include default optimisations
      name: "preset-default",
      params: {
        overrides: {
          // Disable "remove 'viewBox'" plugin.
          removeViewBox: false, // https://github.com/svg/svgo/blob/master/plugins/removeViewBox.js
        },
      },
    },

    // Remove width/height attributes and add the viewBox attribute if it's missing. Highly recommended so the <svg> scales!
    "removeDimensions", // https://github.com/svg/svgo/blob/master/plugins/removeDimensions.js

    // Sort attributes - helps with readability/compression.
    "sortAttrs", // https://github.com/svg/svgo/blob/master/plugins/sortAttrs.js

    // Keep styles consistent
    "convertStyleToAttrs", // https://github.com/svg/svgo/blob/master/plugins/convertStyleToAttrs.js

    // Remove <style> if present in svg
    "removeStyleElement", // https://github.com/svg/svgo/blob/master/plugins/removeStyleElement.js

    // Remove <script> if present in svg
    "removeScriptElement", // https://github.com/svg/svgo/blob/master/plugins/removeScriptElement.js
  ],
};

export default svgoConfig;
