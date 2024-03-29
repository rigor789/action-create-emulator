import * as core from "@actions/core";
import { exec } from "@actions/exec";

const ANDROID_HOME = process.env.ANDROID_HOME;

async function run() {
  // add android sdk tools to path
  core.addPath(`${ANDROID_HOME}/tools`);
  core.addPath(`${ANDROID_HOME}/tools/bin`);
  core.addPath(`${ANDROID_HOME}/platform-tools`);
  core.addPath(`${ANDROID_HOME}/cmdline-tools/latest/bin`);

  // create emulator
  const args = [
    `--force`,
    `--name 'test'`,
    // `--abi 'default/x86'`,
    `--package '${core.getInput("package")}'`,
  ];
  const packages = [core.getInput("package")];
  console.log(`Installing packages: ${packages.join(", ")}`);
  await exec(
    `sh -c "echo y | sdkmanager --install ${packages
      .map((pkg) => `'${pkg}'`)
      .join(" ")}"`
  );

  console.log(`Creating emulator...`);
  await exec(`sh -c "echo no | avdmanager create avd ${args.join(" ")}"`);
}

// run our async main function
run().catch((error) => {
  core.setFailed(error.message);
});
