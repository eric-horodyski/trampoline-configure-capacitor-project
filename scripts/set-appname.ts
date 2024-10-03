import { MobileProject } from "@capacitor/trampoline";
import { AndroidProject } from "@capacitor/trampoline/dist/project/android/project";

// Path inputs
const projectRoot = "../";

// Project configuration
const capacitorProjectConfig = {
  ios: { path: "ios/App" },
  android: { path: "android" },
};
const project = new MobileProject(projectRoot, capacitorProjectConfig);

async function setAppName(displayName: string, project: MobileProject) {
  await project.load();

  if (await project.androidExists()) {
    const androidProject = new AndroidProject(project);
    await androidProject.load();
    const stringsFile = androidProject.getResourceXmlFile("values/strings.xml");
    if (stringsFile) {
      await stringsFile.load();
      const attrs = ["app_name", "title_activity_main"];
      attrs.map((attr) =>
        stringsFile.replaceFragment(
          `resources/string[@name="${attr}"]`,
          `<string name="${attr}">${displayName}</string>`
        )
      );
    }
  }
  (await project.iosExists()) && (await project.ios!.setDisplayName(null, null, displayName));
  await project.commit();
}
await setAppName("Eric Fun Test", project);
