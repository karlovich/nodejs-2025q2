import readline from 'readline';
import {up, cd} from '../fs/directory.js';
import {osApi} from '../os/os-api.js';
export const handleUserInput = (username, printCwd) => {

    const lineReader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });

    lineReader.prompt();

    lineReader.on('line', async (inputLine) => {
        const input = inputLine.trim();
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
        } else if (!cmd) {
            console.log('Invalid user input, please try again');
        } else {
            console.log('Cmd is unknown, awaiting implementation');
        }

        printCwd();
        lineReader.prompt();
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

