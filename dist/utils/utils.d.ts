/// <reference types="node" />
import { RunCommandOptions } from '../types';
export declare const showLoading: (prefix?: string) => NodeJS.Timer;
export declare const runCommand: (command: string | RunCommandOptions) => Promise<unknown>;
export declare const readFile: (file: string) => Promise<string>;
