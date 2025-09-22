import fs from "fs";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import chalk from "chalk";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));

export async function Dop() {
	const rl = readline.createInterface({ input, output });
	const argv = await rl.question(chalk.white("Enter you'r project name:"));
	if (
		!fs.existsSync(__dirname + "/projects.json") ||
		fs.statSync(__dirname + "/projects.json").size <= 3
	)
		return console.log(chalk.red("There are no projects.")), rl.close();

	const data = fs.readFileSync(__dirname + "/projects.json", "utf-8");
	const jsonData = JSON.parse(data);
	let FPTD = jsonData.find((item) => item.name === argv);
	if (!FPTD)
		return console.log(chalk.white(`the ${chalk.red(argv)} project is not found!`)), rl.close();

	const OtherProject = jsonData.filter((other) => other.id !== FPTD.id);
	fs.writeFileSync(__dirname + "/projects.json", JSON.stringify(OtherProject, null, 2), "utf-8");
	console.log(chalk.green(`Project ${chalk.yellow(argv)} deleted successfully`)), rl.close();
}
