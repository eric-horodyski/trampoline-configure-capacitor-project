import { MobileProject, Orientation } from "@capacitor/trampoline";

// Path inputs
const projectRoot = "../";

// Project configuration
const capacitorProjectConfig = {
  ios: { path: "ios/App" },
  android: { path: "android" },
};
const project = new MobileProject(projectRoot, capacitorProjectConfig);

// iOS configuration
async function setIosOrientation(project: MobileProject, orientation: Orientation) {
  const keys = ["UISupportedInterfaceOrientations", "UISupportedInterfaceOrientations~ipad"];
  const portrait = ["UIInterfaceOrientationPortrait", "UIInterfaceOrientationPortraitUpsideDown"];
  const landscape = ["UIInterfaceOrientationLandscapeLeft", "UIInterfaceOrientationLandscapeRight"];

  const orientationMap = {
    [Orientation.Portrait]: portrait,
    [Orientation.Landscape]: landscape,
    [Orientation.Default]: [...portrait, ...landscape],
  };

  if (await project.iosExists()) {
    const selection = orientationMap[orientation] || orientation[Orientation.Default];
    const entries = Object.fromEntries(keys.map((key) => [key, selection]));
    await project.ios!.updateInfoPlist(null, null, entries, { replace: true });
  }
}

// Android configuration
async function setAndroidOrientation(project: MobileProject, orientation: Orientation) {
  const target = "manifest/application/activity";
  const attr = "android:screenOrientation";

  if (await project.androidExists()) {
    const manifest = project.android!.getAndroidManifest();
    switch (orientation) {
      case Orientation.Landscape:
        return manifest.setAttrs(target, { [attr]: "sensorLandscape" });
      case Orientation.Portrait:
        return manifest.setAttrs(target, { [attr]: "sensorPortrait" });
      default:
        return manifest.deleteAttributes(target, [attr]);
    }
  }
}

async function setOrientation(project: MobileProject, orientation: Orientation) {
  try {
    await project.load();
    await setIosOrientation(project, orientation);
    await setAndroidOrientation(project, orientation);
    await project.commit();
  } catch (error) {
    console.log(error);
  }
}
await setOrientation(project, Orientation.Default);
