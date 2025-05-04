import readline from 'readline';
import {up, cd} from '../fs/directory.js';
import {osApi} from '../os/os-api.js';
import {fileOperations, processFileOperation} from '../fs/file.js';

export const handleUserInput = (username) => {

    const lineReader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });

    const promptUserInput = () => {
        console.log(`You are currently in ${process.cwd()}`);
        lineReader.prompt();
    }

    promptUserInput();

    lineReader.on('line', async (inputLine) => {
        const input = inputLine.trim().toLowerCase();
        const [cmd, ...args] = input.split(' ');
        if(cmd === '.exit') {
            exitFromApp(username);
            return
        } else if (cmd === 'up') {
            await up();
        } else if (cmd === 'cd') {
            if (args.length === 0) {
                console.log('Invalid user input: cd command requires a path');
            } else {
                await cd(args[0]);
            }
        } else if (cmd === 'os') {
            if (args.length === 0) {
                console.log('Invalid user input: os command requires an option');
            } else {
                await osApi(args[0]);
            }
        } else if (fileOperations.indexOf(cmd) !== -1 ) {
            processFileOperation(cmd, promptUserInput, ...args);
        }
        else if (!cmd) {
            console.log('Invalid user input, please try again');
        } else {
            console.log('Cmd is unknown, awaiting implementation');
        }

        promptUserInput();
    });

    lineReader.on('SIGINT', () => {
        exitFromApp(username);
    });
}

const exitFromApp = (userName) => {
    const byeMessage = `Thank you for using File Manager, ${userName}, goodbye!`;
    console.log(byeMessage);
    process.exit(0);
}

