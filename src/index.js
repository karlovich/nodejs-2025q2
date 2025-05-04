import os from 'os';
import { parseArgs } from './cli/args.js';
import { handleUserInput } from './input/userInput.js';


const parsedArgs = parseArgs();
const username = parsedArgs.username ? parsedArgs.username : 'Shadow Panda';

const homeDir = os.homedir();
process.chdir(homeDir);
console.log(`Welcome to the File Manager, ${username}!`);

handleUserInput(username);