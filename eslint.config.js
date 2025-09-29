const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "no-console": "warn", // alerta quando usar console.log
      "no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ], // alerta variáveis não usadas, ignora _args
      "no-trailing-spaces": "warn", // alerta espaços finais
      "no-duplicate-imports": "error", // erro em importações duplicadas
      "no-var": "error", // erro ao usar var
      "react/no-unescaped-entities": "off", // desativa o aviso de entidades não escapadas em JSX
      eqeqeq: "off",
    },
  },
]);
