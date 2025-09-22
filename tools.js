import chalk from "chalk";
import { execSync, exec } from "child_process";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __pathFile = path.join(path.dirname(fileURLToPath(import.meta.url)));

const editors = [
	{ name: "VSCode", command: "code" },
	{ name: "Sublime Text", command: "subl" },
	{ name: "Atom", command: "atom" },
	{ name: "WebStorm", command: "webstorm" },
	{ name: "IntelliJ IDEA", command: "idea" },
	{ name: "Vim", command: "vim" },
];

function isInstalled(command) {
	try {
		const cmd = process.platform === "win32" ? `where ${command}` : `which ${command}`;
		execSync(cmd, { stdio: "ignore" });
		return true;
	} catch {
		return false;
	}
}

export async function selectEditor() {
	const availableEditors = editors.filter((e) => isInstalled(e.command));

	if (availableEditors.length === 0) {
		console.log("⚠️ No supported editors found on your system.");
		process.exit(1);
	}

	const { editor } = await inquirer.prompt([
		{
			type: "list",
			name: "editor",
			message: chalk.white("Select an editor:"),
			choices: availableEditors.map((e) => ({ name: e.name, value: e.command })),
		},
	]);

	return editor;
}

export function openProject(editorCommand, projectPath) {
	const getProjects = fs.readFileSync(__pathFile + "/projects.json", "utf-8");

	const convertTOJison = JSON.parse(getProjects);
	let a = convertTOJison.findIndex((e) => {
		return e.name === projectPath.split("/")[projectPath.split("/").length - 1];
	});

	convertTOJison[a].defaultEditor = editorCommand;

	fs.writeFileSync(__pathFile + "/projects.json", JSON.stringify(convertTOJison, null, 2));

	exec(`${editorCommand} ${projectPath}`, (err) => {
		if (err) console.error("❌ Failed to open project:", err);
		else console.log(`✅ Opened ${projectPath} with ${editorCommand}`);
	});
}
