import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import chalk from "chalk";
import { openProject, selectEditor } from "./tools.js";
import { fileURLToPath } from "url";
import { exec } from "child_process";
const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));
const __pathFile = __dirname + "/projects.json";
export async function Lap() {
	const rl = readline.createInterface({ input, output });
	if (!fs.existsSync(__pathFile) || fs.statSync(__dirname + "/projects.json").size <= 3)
		return console.error(chalk.red("There are no projects.")), rl.close();

	const AllProject = fs.readFileSync(__pathFile, "utf-8");
	const projects = JSON.parse(AllProject);
	const listAP = await inquirer.prompt([
		{
			type: "rawlist",
			name: "projects",
			message: chalk.white("selecte a project:"),
			choices: projects.map((p) => ({
				name: `${p.language} 👉 ${p.name}`,
				value: p.path,
			})),
		},
	]);
	const CheckEditor = projects.find((p) => {
		return p.name === listAP.projects.split("/")[listAP.projects.split("/").length - 1];
	});

	if (CheckEditor.defaultEditor) {
		exec(`${CheckEditor.defaultEditor} ${listAP.projects}`, (err) => {
			if (err) console.error("❌ Failed to open project:", err);
			else console.log(`✅ Opened ${CheckEditor.path} with ${CheckEditor.defaultEditor}`);
		});
	} else {
		const editor = await selectEditor();
		openProject(editor, listAP.projects);
	}
}
