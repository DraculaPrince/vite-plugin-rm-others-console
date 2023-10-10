import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts', // 入口文件路径
  output: [
    {
      format: "esm",
      file: "dist/esm/index.mjs",
      sourcemap: true,
    },
    {
      format: "cjs",
      file: "dist/cjs/index.cjs",
      sourcemap: true,
      exports: "default",
    },
  ],
  plugins: [
    typescript()
  ],
  external: ['child_process', 'os']
};