import fs from "fs";
import path from "path";
import os from "os";
import readline from "readline/promises";
import inquirer from "inquirer";
import { stdin as input, stdout as output } from "process";
import chalk from "chalk";
import { fileURLToPath } from "url";

const RootUser = path.join(os.homedir());
const GetRoot = RootUser.split("/")[RootUser.split("/").length - 1];

export async function Aap() {
	const rl = readline.createInterface({ input, output });
	try {
		const languages = ["Node.js", "React", "Python", "Java", "PHP", "C#", "Go", "Rust"];

		const answers = await inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: chalk.yellow(
					`Enter project name (existing folder in ${chalk.green("~/" + GetRoot)}):`
				),
			},
			{
				type: "rawlist",
				name: "language",
				message: chalk.yellow("Select project language:"),
				choices: languages,
			},
		]);

		async function findFolder(startPath, targetFolderName) {
			const __pathFile = path.join(path.dirname(fileURLToPath(import.meta.url)));

			try {
				const result = await searchRecursively(startPath, targetFolderName);

				if (result.found) {
					const isoString = new Date().toISOString();
					const GetOldData = [];

					if (
						fs.existsSync(__pathFile + "/projects.json") &&
						fs.statSync(__pathFile + "/projects.json").size > 3
					) {
						const getProjects = fs.readFileSync(__pathFile + "/projects.json", "utf-8");

						const convertTOJison = JSON.parse(getProjects).map((e) => {
							return e;
						});

						for (let item of convertTOJison) {
							GetOldData.push(item);
						}

						const newProject = {
							id: convertTOJison[convertTOJison.length - 1].id + 1,
							name: answers.name,
							path: result.path,
							language: answers.language,
							addedOn: isoString,
							defaultEditor: null,
						};
						GetOldData.push(newProject);
						fs.writeFile(
							__pathFile + "/projects.json",
							JSON.stringify(GetOldData, null, 2),
							(err) => {
								if (err) {
									console.error(`${chalk.red("Error saving your project:")}`, err);
								} else {
									console.log(
										chalk.green(`${chalk.yellow(answers.name)} project saved successfully!`)
									);
								}
								rl.close();
							}
						);
					} else {
						const newProject = {
							id: 1,
							name: answers.name,
							path: result.path,
							language: answers.language,
							addedOn: isoString,
							defaultEditor: null,
						};

						GetOldData.push(newProject);
						fs.writeFile(
							__pathFile + "/projects.json",
							JSON.stringify(GetOldData, null, 2),
							(err) => {
								if (err) {
									console.error(`${chalk.red("Error saving your project:")}`, err);
								} else {
									console.log(
										chalk.green(`${chalk.yellow(answers.name)} project saved successfully!`)
									);
								}
								rl.close();
							}
						);
					}
				} else {
					console.log(
						`❌ ${chalk.white(
							`Folder ${chalk.yellow(targetFolderName)} not found in ${chalk.red(startPath)}`
						)}`
					);
					return null;
				}
			} catch (error) {
				console.error(`${chalk.red("Error during search:")}`, error.message);
				return null;
			}
		}
		async function searchRecursively(currentPath, targetName) {
			try {
				const items = await fs.promises.readdir(currentPath, { withFileTypes: true });
				for (const item of items) {
					const fullPath = path.join(currentPath, item.name);
					if (item.isDirectory()) {
						if (item.name === targetName) {
							return { found: true, path: fullPath };
						}
						if (!item.name.startsWith(".") && item.name !== "node_modules") {
							const result = await searchRecursively(fullPath, targetName);
							if (result.found) {
								return result;
							}
						}
					}
				}
				return { found: false, path: null };
			} catch (error) {
				console.log(error);
			}
		}
		findFolder(RootUser, answers.name);
	} finally {
		rl.close();
	}
}
