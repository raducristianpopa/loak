/** @type {import("prettier").Config} */
module.exports = {
    printWidth: 80,
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    quoteProps: "consistent",
    jsxSingleQuote: false,
    trailingComma: "all",
    pluginSearchDirs: false,
    plugins: [require("prettier-plugin-tailwindcss")],
    tailwindConfig: "./packages/config/tailwind.js",

    // Custom options for different file types
    overrides: [
        {
            files: ["**/*.yml", "**/*.yaml", "**/*.tsx"],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
