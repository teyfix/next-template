// @ts-check
/**
 * @type {import('./src/types/prettier.d.ts').SqlOptions}
 */
const prettierPluginSql = {
  formatter: "sql-formatter",
  language: "postgresql",
  // dialect: JSON.stringify(require("sql-formatter").postgresql),
  keywordCase: "upper",
  dataTypeCase: "upper",
  functionCase: "lower",
  identifierCase: "preserve",
  indentStyle: "standard",
  logicalOperatorNewline: "before",
  expressionWidth: 50,
  linesBetweenQueries: 1,
  denseOperators: false,
  newlineBeforeSemicolon: false,
  // params: JSON.stringify([]),
  // paramTypes: JSON.stringify([]),
  database: "postgresql",
};

/**
 * @type {import('prettier-plugin-sort-json').SortJsonOptions}
 */
const prettierPluginSortJson = {
  jsonRecursiveSort: true,
};

/**
 * @type {import('prettier').Options}
 */
const config = {
  ...prettierPluginSql,
  ...prettierPluginSortJson,
  overrides: [
    {
      files: "*.svg",
      options: {
        parser: "html",
      },
    },
    {
      files: "*.env",
      options: {
        parser: "sh",
      },
    },
  ],
  plugins: [
    "prettier-plugin-embed",
    "prettier-plugin-sh",
    "prettier-plugin-sql",
    "prettier-plugin-sort-json",
    "prettier-plugin-packagejson",
    "prettier-plugin-css-order",
    "prettier-plugin-tailwindcss",
  ],
  printWidth: 80,
  proseWrap: "always",
  tailwindFunctions: ["clsx", "cn", "cva", "classed"],
};

export default config;
