import os from 'os';
import { parseArgs } from './cli/args.js';
import path from 'path';
import readline from 'readline';

function printCwd() {
  console.log(`You are currently in ${process.cwd()}`);
}

printCwd();

const parsedArgs = parseArgs();
const username = parsedArgs.username ? parsedArgs.username : 'Shadow Panda';

const homeDir = os.homedir();
process.chdir(homeDir);
console.log(`Welcome to the File Manager, ${username}!`);

printCwd();