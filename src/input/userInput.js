import readline from 'readline';
export const handleUserInput = (username, printCwd) => {

    const lineReader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });

    lineReader.prompt();

    lineReader.on('line', (inputLine) => {
        const cmd = inputLine.trim();
        if(cmd === '.exit') {
            exitFromApp(username);
            return
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

