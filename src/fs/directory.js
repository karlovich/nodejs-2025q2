import fs from 'fs/promises';
import path from 'path';

export const up = async () => {
    const parent = path.dirname(process.cwd());
    const root = path.parse(parent).root;
    if (parent === root) {
        return;
    }

    process.chdir(path.dirname(process.cwd()));
}


export const cd = async (targetDirPath) => {
    if(!path.isAbsolute(targetDirPath)) {
        targetDirPath = path.resolve(process.cwd(), targetDirPath);
    }

    const root = path.parse(process.cwd()).root;
    if (targetDirPath === root) {
        return;
    }

    try {
        process.chdir(targetDirPath);
    } catch (err) {
        console.log('Comman run failed, please check directory path, details: ', err.message);
    }
}

