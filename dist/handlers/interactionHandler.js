"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionHandler = void 0;
const commandsArr_1 = __importDefault(require("./commandsArr"));
class InteractionHandler {
    constructor() {
        // we can find a better way of doing this.
        this.commands = commandsArr_1.default;
    }
    getSlashCommands() {
        return this.commands.map((command) => command.slashCommandConfig.toJSON());
    }
    handleInteraction(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandName = interaction.commandName;
            const matchedCommand = this.commands.find((command) => command.name === commandName);
            if (!matchedCommand) {
                return Promise.reject('Command not matched');
            }
            matchedCommand
                .execute(interaction)
                .then(() => {
                console.log(`Sucesfully executed command [/${interaction.commandName}]`, {
                    guild: { id: interaction.guildId, name: interaction.guild.name },
                    user: { name: interaction.user.globalName },
                });
            })
                .catch((err) => console.log(`Error executing command [/${interaction.commandName}]: ${err}`, {
                guild: { id: interaction.guildId, name: interaction.guild.name },
                user: { name: interaction.user.globalName },
            }));
        });
    }
}
exports.InteractionHandler = InteractionHandler;
