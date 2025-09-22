import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)));
const __pathFile = __dirname + "/help.txt";

export async function _h() {
	const helpPath = path.join(__pathFile);
	if (fs.existsSync(helpPath)) {
		const content = fs.readFileSync(helpPath, "utf8");
		console.log(content);
	} else {
		console.log("Help file not found.");
	}
	process.exit(0);
}
