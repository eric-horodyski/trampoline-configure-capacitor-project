import {
  AndroidAssetGenerator,
  AssetKind,
  InputAsset,
  IosAssetGenerator,
  MobileProject,
  Platform,
} from "@capacitor/trampoline";

// Path inputs
const projectRoot = "../";
const pathToLogo = "assets/logo.png";
const pathToLogoDark = "assets/logo-dark.png";

// Project configuration
const capacitorProjectConfig = {
  ios: { path: "ios/App" },
  android: { path: "android" },
};
const project = new MobileProject(projectRoot, capacitorProjectConfig);

// Asset generation options
const opts = {
  iconBackgroundColor: "#cccccc",
  iconBackgroundColorDark: "#282828",
};

async function generateIcons() {
  const assets = [
    new InputAsset(pathToLogo, AssetKind.Logo, Platform.Any),
    new InputAsset(pathToLogoDark, AssetKind.LogoDark, Platform.Any),
  ];
  const generators = [new IosAssetGenerator(opts), new AndroidAssetGenerator(opts)];

  try {
    for (const asset of assets) {
      await Promise.all(generators.map((g) => g.generate(asset, project)));
    }
    console.log("Icons generated");
  } catch (error) {
    console.error("Icon generation failed.");
  }
}
await generateIcons();
