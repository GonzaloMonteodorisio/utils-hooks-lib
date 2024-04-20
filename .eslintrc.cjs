module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "simple-import-sort"
    ],
    "ignorePatterns": [".eslintrc.cjs", "vite.config.ts", "tests/*"],
    "rules": {
        "simple-import-sort/imports": "error",
        "@typescript-eslint/no-explicit-any": "error",
        // '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', "ignoreSiblings": false }],
        "no-console": "warn",
    },
}
