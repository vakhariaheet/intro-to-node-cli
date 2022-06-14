#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import inquirer from 'inquirer';
import { exec, execSync, spawn, spawnSync } from 'child_process';
import { runCommand, showLoading } from './utils/utils';
import shell from 'shelljs';
import { readFile } from './utils/utils';

import { CommandStep, CommitStep, ConfigFile, ConfirmStep } from './types';
const program = new Command();

program.action(async () => {
	try {
		let configFile: ConfigFile = {
			steps: [],
		};
		console.log(
			execSync('cd ~/Desktop/personal/Verificator && yarn commit', {
				stdio: 'inherit',
			}).toString(),
		);
		console.log('adksjsdlfdjsd');
		try {
			configFile = JSON.parse(await readFile('./helloconfig.json'));
		} catch (e) {
			console.log(chalk.red('No config file found'));
		}
		if (configFile.steps.length === 0) {
			console.log(chalk.red('No steps found in config file'));
			return;
		}
		let currentStep = 0;
		const runNextStep = async (
			step: CommandStep | ConfirmStep | CommitStep,
		) => {
			if (step.type === 'command') {
				if (typeof step.showCommand === 'undefined') {
					step.showCommand = true;
				}
				if (step.askConfirmation) {
					const { confirm } = await inquirer.prompt([
						{
							type: 'confirm',
							name: 'confirm',
							message: step.confirmMessage,
							default: step.default,
						},
					]);
					if (!confirm) {
						return;
					}
				}
				await runCommand({
					command: step.command,
					timerMessage: `${step.message || ''} ${chalk.green('>')}  ${
						step.showCommand ? chalk.blue(step.command) : ''
					} `,
				});
			}
			if (step.type === 'confirm') {
				const { confirm } = await inquirer.prompt([
					{
						type: 'confirm',
						default: step.default,
						name: 'confirm',
						message: step.question,
					},
				]);
				if (!confirm) {
					throw new Error(step.errorMessage || 'Aborted');
				}
			}
			if (step.type === 'commit') {
			}
			currentStep++;
			if (currentStep < configFile.steps.length) {
				runNextStep(configFile.steps[currentStep]);
			}
		};
		runNextStep(configFile.steps[currentStep]);
	} catch (err) {
		console.log(err);
	}
});
program.parse(process.argv);
