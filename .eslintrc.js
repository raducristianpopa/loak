/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        // Basic
        "no-var": "error",
        "no-eval": "error",

        // Typescript
        "@typescript-eslint/consistent-type-assertions": "warn",
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/no-redeclare": "error",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-use-before-define": [
            "warn",
            {
                functions: false,
                classes: false,
                variables: false,
                typedefs: false,
            },
        ],

        // React
        "react/react-in-jsx-scope": "off",
    },
    ignorePatterns: ["**/*.js", "**/*.json", "node_modules", "dist"],
    settings: {
        react: {
            version: "detect",
        },
    },
};
