import fs from "fs";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { openProject, selectEditor } from "./tools.js";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));

export async function Quick_Command(GetArgv) {
	if (
		!fs.existsSync(__dirname + "/projects.json") ||
		fs.statSync(__dirname + "/projects.json").size <= 3
	)
		return console.log(chalk.red("There are no projects.")), process.exit(1);
	const Allp = fs.readFileSync(__dirname + "/projects.json", "utf-8");
	const jsonP = JSON.parse(Allp);
	let FPTD = jsonP.find((item) => item.name === GetArgv);

	if (!FPTD) {
		console.log(chalk.red(`project ${chalk.white(GetArgv)} not found, please add it first !`)),
			process.exit(1);
	} else if (FPTD.defaultEditor) {
		exec(`${FPTD.defaultEditor} ${FPTD.path}`, (err) => {
			if (err) console.error("❌ Failed to open project:", err);
			else console.log(`✅ Opened ${FPTD.path} with ${chalk.yellow(FPTD.defaultEditor)}`);
			process.exit(1);
		});
	} else {
		const editor = await selectEditor();
		openProject(editor, FPTD.path);
	}
}
