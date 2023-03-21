const allExtensions = [".js", ".jsx", ".ts", ".tsx"];

module.exports = {
    extends: ["eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    settings: {
        "import/extensions": allExtensions,
        "import/external-module-folders": ["node-modules", "node-modules/@types"],
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
            "typescript": {
                "extensions": allExtensions,
            }
        }
    },
    rules: {
        "import/named": "off",
        "@typescript-eslint/no-empty-function": "warn",
        "react/prop-types": "off",
        "spaced-comment": ["error", "always"]
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    ignorePatterns: ["**/*.js"]
}
