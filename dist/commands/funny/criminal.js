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
class CriminalCommand {
    constructor() {
        this.name = 'i-heard-u-a-pdf-file';
        this.description = 'criminal activity';
        this.slashCommandConfig = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply('https://cdn.discordapp.com/attachments/902415144670351373/1294828974844678277/trim.9954CE6F-E86D-43E1-9980-511F4FD6A4D7.mov?ex=670c6ef4&is=670b1d74&hm=dea681d130b3f01c4f9f287469a7f38c99aa4de74416133c26a09f2727f80be7&');
        });
    }
}
exports.default = new CriminalCommand();
