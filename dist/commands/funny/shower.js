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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class ShowerCommand {
    constructor() {
        this.name = 'shower';
        this.description = `take a shower`;
        this.slashCommandConfig = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply('https://tenor.com/view/league-of-legends-genshin-impact-oh-the-misery-shower-soap-gif-25193414');
        });
    }
}
exports.default = new ShowerCommand();
