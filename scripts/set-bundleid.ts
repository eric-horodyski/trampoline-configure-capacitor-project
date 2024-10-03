import { IosTarget, MobileProject } from "@capacitor/trampoline";

// Path inputs
const projectRoot = "../";

// Project configuration
const capacitorProjectConfig = {
  ios: { path: "ios/App" },
  android: { path: "android" },
};
const project = new MobileProject(projectRoot, capacitorProjectConfig);

async function setBundleId(bundleId: string, project: MobileProject) {
  await project.load();
  if (await project.iosExists()) {
    // Get the main app target in the iOS project
    const appTarget = project.ios!.getAppTarget()!;
    project.ios!.setBundleId(appTarget.name, null, bundleId);
  }
  if (await project.androidExists()) {
    project.android!.setPackageName(bundleId);
  }
  await project.commit();
}
await setBundleId("io.ionic.newBundleId", project);
