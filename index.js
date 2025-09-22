#!/usr/bin/env node
import path from "path";

import { Aap } from "./aap.js";
import { Dop } from "./dop.js";
import { Dap } from "./dap.js";
import { Lap } from "./lap.js";
import { Quick_Command } from "./quick.js";
import chalk from "chalk";
import { Un } from "./un.js";

console.clear();

const argv = path.basename(process.argv[1]);
if (argv === "opener") {
	const argv = path.basename(process.argv[2] || "");
	if (argv) {
		if (argv === "aap") {
			Aap();
		} else if (argv === "dop") {
			Dop();
		} else if (argv === "dap") {
			Dap();
		} else if (argv === "lap") {
			Lap();
		} else if (argv === "un") {
			Un();
		} else {
			console.log(`${chalk.red(argv)} isn't valid, please enter ${chalk.yellow("opener help")} `);
			process.exit(1);
		}
	} else {
		console.log(`please enter a valid sub-command or enter ${chalk.yellow("opener help")}}`);
		process.exit(1);
	}
}

if (argv === "o-") {
	const argv = path.basename(process.argv[2] || "");
	if (argv) {
		Quick_Command(argv);
	} else {
		console.log(`please enter a valid sub-command or enter ${chalk.yellow("opener help")}}`);
		process.exit(1);
	}
}
