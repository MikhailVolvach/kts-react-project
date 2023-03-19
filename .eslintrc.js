// module.exports = {
//     // parser: "@typescript-eslint/parser",
//     // extends: ["eslint:recommended",
//     //     "plugin:react/recommended",
//     //     "plugin:@typescript-eslint/recommended",
//     //     "plugin:prettier/recommended",
//     //     "plugin:import/recommended"
//     // ],
//     extends: [
//         "plugin:prettier/recommended",
//         "plugin:react/recommended"
//     ],
//     plugins: [
//         "prettier"
//     ],
//     rules: {
//         "no-console": "error",
//         "prettier/prettier": "error",
//         "import/order": [
//             "error",
//             {
//                 "groups": [
//                     "builtin",
//                     "external",
//                     "internal"
//                 ],
//                 "pathGroups": [
//
//                 ]
//             }
//         ]
//     }
//     parserOptions: {
//         ecmaVersion: "latest",
//         sourceType: "module",
//         ecmaFeatures: {
//             jsx: true,
//         },
//     },
//     // rules: {
//     //     "no-console": "error",
//     //     "prettier/prettier": "error",
//     //     "import/order": [
//     //         "error",
//     //         {
//     //             groups: ["builtin", "external", "internal"],
//     //             pathGroups: [
//     //                 {
//     //                     pattern: "react",
//     //                     group: "external",
//     //                     position: "before",
//     //                 },
//     //             ],
//     //             pathGroupsExcludedImportTypes: ["react"],
//     //             "newlines-between": "always",
//     //             alphabetize: {
//     //                 order: "asc",
//     //                 caseInsensitive: true,
//     //             },
//     //         },
//     //     ],
//     //     "no-empty-function": 0,
//     // },
//     settings: {
//         react: {
//             version: "detect",
//         },
//         "import/resolver": {
//             "node": {
//                 "extensions": [".js", ".jsx", ".ts", ".tsx"]
//             }
//         }
//     },
//     ignorePatterns: [".eslintrc.js", ".stylelintrc.js", "webpack.config.js"]
// };

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
