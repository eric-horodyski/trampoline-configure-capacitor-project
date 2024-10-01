import { IosAssetGenerator, MobileProject, InputAsset, AndroidAssetGenerator } from "@capacitor/trampoline";

const config = {
  ios: { path: "ios/App" },
  android: { path: "android" }
};
const project = new MobileProject("../", config);
const asset = new InputAsset("assets/logo.png", "logo", "any");

const generateIcons = async (asset, project) => {
  const generators = [new IosAssetGenerator(), new AndroidAssetGenerator()];
  for (const generator of generators)
    await generator.generate(asset, project);
};

await generateIcons(asset, project);

console.log('Icons generated.');