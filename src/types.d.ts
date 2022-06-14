export interface RunCommandOptions {
	command: string;
	timerMessage?: string;
	onFinishTimerMessage?: string;
	onFinish?: () => void;
	onError?: (err: Error) => void;
	onSuccess?: (result: string) => void;
}
export interface ConfigFile {
	steps: Array<CommandStep | ConfirmStep | CommitStep>;
	onSuccess?: (result: string) => any;
	onError?: (err: Error) => any;
}
export interface CommandStep {
	type: 'command';
	command: string;
	message?: string;
	errorMessage?: string;
	showCommand?: boolean;
	askConfirmation?: boolean;
	confirmMessage?: string;
	default?: boolean;
}
export interface ConfirmStep {
	type: 'confirm';
	question: string;
	default?: boolean;
	errorMessage?: string;
}
export interface CommitStep {
	type: 'commit';
}
