import chalk from 'chalk';
import { exec } from 'child_process';
import fs from 'fs';
import { RunCommandOptions } from '../types';
export const showLoading = (prefix: string = ''): NodeJS.Timer => {
	const steps = ['\\', '|', '/', '-'];
	let x = 0;

	return setInterval(function () {
		process.stdout.write(chalk.white(`\r${prefix}${steps[x++]}`));
		x &= 3;
	}, 200);
};

const increaseIndent = (str: string, length: number): string => {
	let string = str.split('');
	for (let i = str.length; i < length; i++) {
		string.push(' ');
	}
	return string.join('');
};
export const runCommand = (command: string | RunCommandOptions) =>
	new Promise((resolve, reject) => {
		const defaults = {
			onSuccess: (result: string) => {
				console.log(chalk.dim(result));
			},
			onError: (err: Error) => {
				console.log(chalk.red(err.message));
			},
			onFinish: () => {},
		};
		if (typeof command === 'string') {
			const timer = showLoading(`running ${chalk.blue(command)} `);
			exec(command, (error, stdout, stderr) => {
				process.stdout.write(chalk.dim(`\rrunning ${chalk.blue(command)}   `));
				clearInterval(timer);
				defaults.onFinish();
				if (error) {
					defaults.onError(error);
					reject(error);
				}
				defaults.onSuccess(stdout);
				resolve(stdout);
			});
		} else {
			const {
				command: cmd,
				timerMessage = `running ${chalk.blue(cmd)} `,
				onFinishTimerMessage = '',
				onFinish = defaults.onFinish,
				onError = defaults.onError,
				onSuccess = defaults.onSuccess,
			} = command;
			const timer = showLoading(`${timerMessage}`);
			exec(cmd, (error, stdout, stderr) => {
				process.stdout.write(
					chalk.dim(
						`\r ${
							onFinishTimerMessage
								? increaseIndent(onFinishTimerMessage, timerMessage.length)
								: timerMessage
						}   `,
					),
				);
				clearInterval(timer);
				onFinish();
				if (error) {
					onError(error);
					reject(error);
				}
				onSuccess(stdout);
				resolve(stdout);
			});
		}
	});
export const readFile = (file: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
};
