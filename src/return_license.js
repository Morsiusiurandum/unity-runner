const core = require('@actions/core');
const {executeUnity} = require("./run");

async function return_license() {
    const path = core.getInput('unity-path') || process.env.UNITY_PATH;
    if (!path) {
        throw new Error('unity path not found');
    }
    if (core.getInput('unity-serial')) {
        const username = core.getInput('unity-username', {required: true});
        const password = core.getInput('unity-password', {required: true});
        await executeUnity(path, `-returnlicense -username "${username}" -password "${password}"`);
    }
}

async function run() {
    try {
        await return_license();
    } catch (error) {
        core.setFailed(error.message);
    }
}

run().then(() => {
});