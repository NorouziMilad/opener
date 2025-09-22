#!/usr/bin/env node

import fs from "fs";
import os from "os";
import path from "path";
import { execSync } from "child_process";

const RootUser = path.join(os.homedir());
const GLOBAL_BIN = path.join(RootUser, ".local/bin");
const INSTALL_DIR = path.join(RootUser, ".local/opener");
const GLOBAL_MODULES = [
	"/usr/lib/node_modules/opener_cli",
	"/usr/local/lib/node_modules/opener_cli",
];
const GLOBAL_LINKS = ["opener", "o-"];

function safeExec(cmd) {
	try {
		execSync(cmd, { stdio: "ignore" });
	} catch {}
}

function safeRemove(target) {
	try {
		if (fs.existsSync(target)) {
			fs.rmSync(target, { recursive: true, force: true });
		}
	} catch {}
}

export async function Un() {
	console.log("🗑️  Uninstalling opener CLI...");

	safeExec("sudo npm unlink -g opener");
	safeExec("sudo npm unlink -g o-");

	GLOBAL_MODULES.forEach(safeRemove);

	safeRemove(INSTALL_DIR);

	GLOBAL_LINKS.forEach((cmd) => safeRemove(path.join(GLOBAL_BIN, cmd)));

	safeExec("hash -r");

	console.log("✅ Uninstallation completed!");
	process.exit(0);
}
