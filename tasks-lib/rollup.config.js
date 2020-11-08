import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import { dirname } from "path";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import visualizer from "rollup-plugin-visualizer";
import packageJson from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const config = {
  input: "./src/index.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      dir: dirname(packageJson.module),
      format: "esm",
      sourcemap: true,
      preserveModules: true,
    },
  ],
  plugins: [
    external(),
    postcss(),
    resolve({
      extensions,
    }),
    babel({
      babelHelpers: "runtime",
      extensions,
      include: ["src/**"],
    }),
    commonjs(),
    url(),
    svgr(),
    visualizer(),
  ],
};

export default config;
