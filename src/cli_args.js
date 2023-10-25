const core = require('@actions/core');
const path = require("path");
const fs = require("fs");
module.exports = {args};

function args() {
    let cli = '';

    const username = core.getInput('unity-username');
    if (username) cli += ` -username "${username}"`;

    const password = core.getInput('unity-password');
    if (password) cli += ` -password "${password}"`

    const serial = core.getInput('unity-serial');
    if (serial) cli += ` -serial ${serial}`;

    const ulf_str = core.getInput('unity-ulf');
    if (ulf_str) {
        let ulf = path.resolve(__dirname, './act.ulf')
        fs.writeFile(ulf, ulf_str, {encoding: 'utf8'}, () => {
        })
        cli += ` -manualLicenseFile "${ulf}"`;
    }

    const returnlicense = core.getInput('return-license');
    if (returnlicense === 'true') cli += ' -returnlicense';

    const projectPath = core.getInput('project-path');
    if (projectPath) cli += ` -projectPath "${projectPath}"`;

    const executeMethod = core.getInput('execute-method');
    if (executeMethod) cli += ` -executeMethod "${executeMethod}"`;

    const createManualActivationFile = core.getInput('create-manual-activation-file');
    if (createManualActivationFile === 'true') cli += ` -createManualActivationFile -logfile`;
        
        return cli;
}