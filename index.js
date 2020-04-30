import * as core from '@actions/core'
import { exec } from '@actions/exec'

const ANDROID_HOME = process.env.ANDROID_HOME

async function run() {
  // add android sdk tools to path
  core.addPath(`${ANDROID_HOME}/tools`);
  core.addPath(`${ANDROID_HOME}/tools/bin`)
  core.addPath(`${ANDROID_HOME}/platform-tools`)
  
  // create emulator
  const args = [
    `--force`,
    `--name 'test'`,
    // `--abi 'default/x86'`,
    `--package '${core.getInput('package')}'`
  ]
  await exec.exec(`sh -c \\"echo no | avdmanager create avd ${args.join(' ')}"`);
}

// run our async main function
run().catch(error => {
 core.setFailed(error.message); 
})
