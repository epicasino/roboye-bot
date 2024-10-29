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
class DivorcePapersCommand {
    constructor() {
        this.name = 'divorce-papers';
        this.description = 'Whenever someone wants to get a divorce';
        this.slashCommandConfig = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const divorceEmbed = new discord_js_1.EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle(`Divorce Papers`)
                .setURL(`https://www.dochub.com/fillable-form/32077-california-divorce-papers`)
                .setImage('https://i.imgur.com/MsS8EML.png');
            yield interaction.reply({ embeds: [divorceEmbed] });
        });
    }
}
exports.default = new DivorcePapersCommand();
