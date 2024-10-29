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
class InYourFaceCommand {
    constructor() {
        this.name = 'in-your-face';
        this.description = 'In Your Face. In Your Face.';
        this.slashCommandConfig = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply('https://cdn.discordapp.com/attachments/902415144670351373/1293105069503418369/granddad_smack_the_s.MP4?ex=670c1831&is=670ac6b1&hm=a4c09fd2e44cbb100fa561bab1dbda1608c4787397c6d1896b202f8c2a22af4e&');
        });
    }
}
exports.default = new InYourFaceCommand();
