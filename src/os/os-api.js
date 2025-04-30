import os from 'os';

const getEOL = () => {
    const result = os.EOL;
    console.log('EOL (default system End-Of-Line): ', JSON.stringify(result));
    return result;
};

const getCPUs = () => {
    const cpus = os.cpus();
    console.log('os.cpus();', os.cpus());
    console.log(`Total CPUs count: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
        const speed = (cpu.speed / 1000).toFixed(2);
        console.log(`${index + 1} Model: ${cpu.model} | Clock rate: ${speed} GHz`);
    });

    return cpus;
};

const getHomeDir = () => {
    const result = os.homedir();
    console.log('OS home directory: ', result);
    return result;
};

const getSystemUserName = () => {
    const result = os.userInfo().username;
    console.log('Current OS user name: ', result);
    return result;
};

const getArch = () => {
    const result = process.arch;
    console.log('CPU architecture for which Node.js binary has compiled: ', result);
    return result;
};

export const osApi = (cmd) => {
    cmd = cmd.trim().replace('--', '').toLowerCase();
    switch (cmd) {
        case 'eol':
            return getEOL();
        case 'cpus':
            return getCPUs();
        case 'homedir':
            return getHomeDir();
        case 'username':
            return getSystemUserName();
        case 'architecture':
            return getArch();
        default:
            console.log('Unknown os option, please fix a parameter to EOL/cpus/homedir/username/architecture e.g. "os --EOL" and try again');
    }
}