export type SqlOptions = Partial<{
  formatter: "sql-formatter" | "node-sql-parser"; // default `sql-formatter`

  // sql-formatter
  language:
    | "sql"
    | "bigquery"
    | "db2"
    | "db2i" // (experimental)
    | "hive"
    | "mariadb"
    | "mysql"
    | "n1ql"
    | "postgresql"
    | "plsql"
    | "redshift"
    | "singlestoredb"
    | "snowflake"
    | "spark"
    | "sqlite"
    | "transactsql"
    | "tsql"
    | "trino";
  // default `sql`
  dialect: string; // `JSOX` **stringified**, please refer https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/dialect.md for more details
  keywordCase: "preserve" | "upper" | "lower"; // default `preserve`
  dataTypeCase: "preserve" | "upper" | "lower"; // default `preserve`
  functionCase: "preserve" | "upper" | "lower"; // default `preserve`
  identifierCase: "preserve" | "upper" | "lower"; // default `preserve`, experimental
  indentStyle: "standard" | "tabularLeft" | "tabularRight"; // default `standard`
  logicalOperatorNewline: "before" | "after"; // default `before`
  expressionWidth: number; // default `50`
  linesBetweenQueries: number; // default `1`
  denseOperators: boolean; // default `false`
  newlineBeforeSemicolon: boolean; // default `false`
  params: string; // `JSOX` **stringified**, please refer https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/params.md for more details
  paramTypes: string; // `JSOX` **stringified**, please refer https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/paramTypes.md for more details

  // node-sql-parser
  type: "table" | "column"; // default `table`
  database:
    | "bigquery"
    | "db2"
    | "hive"
    | "mariadb"
    | "mysql"
    | "postgresql"
    | "transactsql"
    | "flinksql"
    | "snowflake"; // (alpha)
  // default `mysql`
}>;
