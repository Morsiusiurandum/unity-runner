const {execute_unity} = require("./run");
const {args} = require("./cli_args")

async function run() {
    let stdout = await execute_unity(args);
}

run().then(() => {
});