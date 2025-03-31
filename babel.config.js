module.exports = {
  presets: ["module:@react-native/babel-preset", "nativewind/babel"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@assets": "./src/assets",
          },
        },
      ],
    ],
}
