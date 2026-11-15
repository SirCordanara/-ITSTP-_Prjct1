import fs from 'node:fs/promises';
import path from 'node:path';

const files = path.resolve('./folder');

//создать файл
async function createF(filename, content = '') {
    const filePath = path.join(files, filename);
    try {
        await fs.writeFile(filePath, content, 'utf8');
    } catch (err) {
        console.error('Лшибка создания ', err.message);
    }
}

//прочитать файл
async function readF(filename) {
    const filePath = path.join(files, filename);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(`${filename}":`);
        console.log(data);
    } catch (err) {
        console.error(err.message);
    }
}

//добавить текст
async function appendToFilr(filename, content) {
    const filePath = path.join(files, filename);
    try {
        await fs.appendFile(filePath, content, 'utf8');
        console.log("добвлен");
    } catch (err) {
        console.error(err.message);
    }
}

//переименовать файл
async function renameF(oldName, newName) {
    const oldPath = path.join(files, oldName);
    const newPath = path.join(files, newName);
    try {
        await fs.rename(oldPath, newPath);
        console.log(`${oldName} переименован в ${newName}`);
    } catch (err) {
        console.error(err.message);
    }
}
//удалить файл
async function deleteF(filename) {
    const filePath = path.join(files, filename);
    try {
        await fs.unlink(filePath);
        console.log("он испарился...");
    } catch (err) {
        console.error(err.message);
    }
}
//вывести содержимое папки
async function listF() {
    try {
        const filesOut = await fs.readdir(files);
        console.log('файлы: ');
        if (filesOut.length === 0) {
            console.log('носинг');
        } else {
            filesOut.forEach((file, index) => {
                console.log(`${index +1} ${file}`);
            });
        }
    } catch (err) {
        console.error(err.message);
    }
}
//боооже скукота, где приколы в коментах?
 