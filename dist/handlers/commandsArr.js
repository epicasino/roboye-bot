"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const commandsArr = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path_1.default.join(__dirname, '../commands');
const commandFolders = fs_1.default.readdirSync(foldersPath);
for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path_1.default.join(foldersPath, folder);
    const commandFiles = fs_1.default.readdirSync(commandsPath).filter((file) => {
        return file.endsWith('.ts') || file.endsWith('.js');
    });
    for (const file of commandFiles) {
        const filePath = path_1.default.join(commandsPath, file);
        const classImport = require(filePath);
        const command = classImport.default;
        // console.log(command);
        commandsArr.push(command);
    }
}
exports.default = commandsArr;
