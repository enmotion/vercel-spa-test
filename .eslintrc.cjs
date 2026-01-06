/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	root: true,
	extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-typescript"],
	overrides: [
		{
			files: ["cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}"],
			extends: ["plugin:cypress/recommended"],
		},
	],
	rules: {
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"vue/no-dupe-keys": "off",
		"no-extra-boolean-cast": "off",
		"vue/no-unused-components": "off",
		"indent": "off",
		"no-mixed-spaces-and-tabs": "error",
		"vue/no-unused-vars":"off",
		// Vue 模板格式化规则
		"vue/html-indent": ["error", "tab"],
		"vue/max-attributes-per-line": ["error", {
			"singleline": 1,
			"multiline": 1
		}],
		"vue/html-closing-bracket-newline": ["error", {
			"singleline": "never",
			"multiline": "always"
		}],
		"vue/multiline-html-element-content-newline": ["error", {
			"ignoreWhenEmpty": true,
			"allowEmptyLines": false
		}],
		"vue/singleline-html-element-content-newline": ["error", {
			"ignoreWhenEmpty": true
		}],
		"vue/html-self-closing": ["error", {
			"html": {
				"void": "always",
				"normal": "never",
				"component": "always"
			}
		}],
		"vue/script-indent": ["error", "tab", {
			"baseIndent": 0,
			"switchCase": 1
		}]
	},
	parserOptions: {
		ecmaVersion: "latest",
	},
};
