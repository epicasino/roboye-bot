import { iCommand } from '../types/types';
import path from 'path';
import fs from 'fs';

const commandsArr: iCommand[] = [];

// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => {
    return file.endsWith('.ts') || file.endsWith('.js');
  });
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const classImport = require(filePath);
    const command: iCommand = classImport.default;
    // console.log(command);
    commandsArr.push(command);
  }
}

export default commandsArr;
