type Locale = "en" | "fr";

type GraphQLError = {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
  extensions?: Record<string, unknown>;
};

export type { GraphQLError, Locale };
