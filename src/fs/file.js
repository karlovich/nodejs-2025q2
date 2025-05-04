import {createReadStream, createWriteStream} from 'fs';
import { writeFile, mkdir, rename, access, unlink } from 'fs/promises';
import path from 'path';
export const fileOperations = ['cat', 'add', 'mkdir', 'rn', 'cp', 'mv', 'rm'];

export const printFileInConsole = async (filePath, onEndOperationCallback) => {
    const absPath = path.resolve(process.cwd(), filePath);
    const readStream = fs.createReadStream(absPath, { encoding: 'utf-8' });
    const onError = () => {
        console.log('Reading file is failed, please try again');
        onEndOperationCallback && onEndOperationCallback();
    }

    readStream.on('error', onError);
    readStream.on('end', () => {
        process.stdout.write('\n');
        onEndOperationCallback && onEndOperationCallback();
    });
    readStream.pipe(process.stdout);
};

export const createFile = async (fileName) => {
    const absPath = path.resolve(process.cwd(), fileName);
    await writeFile(absPath, '');
};

export const createDirectory = async (dirName) => {
    const absPath = path.resolve(process.cwd(), dirName);
    await mkdir(absPath);
};

export const rn = async (filePath, newFileName) => {
    const absPath = path.resolve(process.cwd(), filePath);
    const dir = path.dirname(absPath);
    const newPath = path.join(dir, newFileName);
    await rename(absPath, newPath);
};

export const copy = async (filePath, newDir, onEndOperationCallback) => {
    const absSrc = path.resolve(process.cwd(), filePath);
    const fileName = path.basename(absSrc);
    const absDest = path.resolve(process.cwd(), newDir, fileName);

    await access(absSrc);
    await access(path.resolve(process.cwd(), newDir));

    return new Promise((resolve, reject) => {
        const readStream = createReadStream(absSrc);
        const writeStream = createWriteStream(absDest);

        const onError = (err) => {
            console.log('File operation is failed, please try again');
            onEndOperationCallback && onEndOperationCallback();
            reject(err);
        };

        readStream.on('error', onError);
        writeStream.on('error', onError);

        writeStream.on('finish', () => {
            resolve();
        });

        readStream.pipe(writeStream);
    });
};

export const move = async (filePath, newDir) => {
    await copy(filePath, newDir);
    await remove(filePath);
}

export const remove = async (filePath) => {
    const absPath = path.resolve(process.cwd(), filePath);
    await unlink(absPath);
};

export const processFileOperation = (cmd, onEndOperationCallback, option1, option2) => {
    try {
        switch (cmd) {
            case 'cat':
                printFileInConsole(option1, onEndOperationCallback);
                break;
            case 'add':
                createFile(option1);
                break;
            case 'mkdir':
                createDirectory(option1);
                break;
            case 'rn':
                rename(option1, option2);
                break;
            case 'cp':
                copy(option1, option2);
                break;
            case 'mv':
                move(option1, option2);
                break;
            case 'rm':
                remove(option1);
                break;
            default:
                console.log('Unknown file operation, please fix cmd to cat/add/mkdir/rn/cp/mv/rm e.g. "cat text.txt" and try again');
        }
    } catch (err) {
        console.log(`File operation ${cmd} is failed, please check the params and try again`);
        onEndOperationCallback && onEndOperationCallback();
    }
}