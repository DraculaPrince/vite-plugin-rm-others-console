import childProcess from 'child_process';
import { type } from 'os';
import type { Plugin } from "vite";

// 判断平台，win平台不支持grep
const isWin = type() === 'Windows_NT';
const findStr = isWin ? 'findstr' : 'grep';

// const userName = childProcess.execSync(
//   `git config user.name`,
//   { encoding: 'utf-8' }
// )

const VitePluginRmOthersConsole = () => {
	return {
		name: 'vite-plugin-rm-others-console',
		enforce: 'pre',
		transform: (code, id) => {
			try {
				const userName = childProcess.execSync(`git config user.name`, { encoding: 'utf-8' });

				if (!id.includes('node_modules') && code.includes(`console.log(`)) {
					const rows = code.split('\n');

					const includesLines = rows.map((row, idx) => (row.includes(`console.log(`) ? idx : undefined)).filter(n => n);

					const removeLine = includesLines.filter((line = 0) => {
						const authorInfo = childProcess.execSync(
							`git blame -L ${line + 1},${line + 1} --porcelain ${id} | ${findStr} "^author "`,
							{ encoding: 'utf-8' }
						);
						const author = authorInfo.slice(authorInfo.indexOf(`author `) + 7);
						// return ![userName, `Not Committed Yet`].includes(author);
						return !(author.includes(userName) || author.includes('Not Committed Yet'));
					});

					return rows
						.map((row, idx) => {
							if (removeLine.includes(idx)) {
								return row.replace(/console\.log\((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*\)[;\n]?/g, `{}`);
							}
							return row;
						})
						.join('\n');
				}
			} catch {
				return code;
			}
			return code;
		},
	} as Plugin;
};

export default VitePluginRmOthersConsole;
