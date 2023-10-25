const exec = require('@actions/exec');
const core = require("@actions/core");

module.exports = {execute_unity};

async function execute(command, ignoreReturnCode) {
    let stdout = '';
    await exec.exec(command, [], {
        ignoreReturnCode: ignoreReturnCode, listeners: {stdout: buffer => stdout += buffer.toString()}
    });
    return stdout;
}

async function execute_unity(args) {
    let linux = '';
    if (process.platform === 'linux') linux = 'xvfb-run --auto-servernum';

    const path = core.getInput('unity-path', {required: true});
    if (!path) throw new Error('Unity path not found');
    
    let default_cli = `"${path}" -batchmode -nographics -quit`;
    return await execute(`${linux} ${default_cli} ${args}`, true);
}
