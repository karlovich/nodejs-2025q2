export const parseArgs = () => {
    const args = process.argv.slice(2);
    const result = {};
    const argPrefix = '--';
    args.forEach(arg => {
        if (arg.startsWith(argPrefix)) {
            const [key, value] = arg.replace(argPrefix, '').split('=');
            result[key] = value;
        }
    });
    return result;
};

parseArgs();