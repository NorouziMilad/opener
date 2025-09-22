import fs from "fs";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));

export async function Dap() {
	const rl = readline.createInterface({ input, output });
	if (
		!fs.existsSync(__dirname + "/projects.json") ||
		fs.statSync(__dirname + "/projects.json").size <= 3
	)
		return console.log(chalk.red("There are no projects.")), rl.close();

	const GetOk = await inquirer.prompt([
		{
			type: "confirm",
			name: "YN",
			message: chalk.white("Do you want to delete all projects ?"),
			default: false,
		},
	]);
	if (GetOk.YN) {
		fs.writeFileSync(__dirname + "/projects.json", "[]");
		console.log(chalk.green(`All projects were successfully deleted.`));
		process.exit(1);
	} else {
		process.exit(1);
	}
}
