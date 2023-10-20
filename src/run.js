const exec = require('@actions/exec');

module.exports = {execute_unity};

async function execute(command, ignoreReturnCode) {
    let stdout = '';
    await exec.exec(command, [], {
        ignoreReturnCode: ignoreReturnCode, listeners: {stdout: buffer => stdout += buffer.toString()}
    });
    return stdout;
}

async function execute_unity(unityPath, args) {
    let linux = '';
    let default_cli = '-batchmode -nographics -quit';
    if (process.platform === 'linux') linux = 'xvfb-run --auto-servernum';
    return await execute(`${linux} "${unityPath}" ${default_cli} ${args}`, true);
}