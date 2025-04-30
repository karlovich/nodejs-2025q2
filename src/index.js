import os from 'os';
import { parseArgs } from './cli/args.js';
import { handleUserInput } from './input/userInput.js';

const printCwd = () => {
  console.log(`You are currently in ${process.cwd()}`);
}

const parsedArgs = parseArgs();
const username = parsedArgs.username ? parsedArgs.username : 'Shadow Panda';

const homeDir = os.homedir();
process.chdir(homeDir);
console.log(`Welcome to the File Manager, ${username}!`);

printCwd();

handleUserInput(username, printCwd);