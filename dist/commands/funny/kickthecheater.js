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
class KickTheCheaterCommand {
    constructor() {
        this.name = 'kick-the-cheater';
        this.description = 'KICK THE CHEATER MASTER YAMBO';
        this.slashCommandConfig = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply('https://cdn.discordapp.com/attachments/902415144670351373/1294831391430672435/TF2s_Calmest_Voice_Chat_We_need_to_kick_the_cheater.mp4?ex=670c7134&is=670b1fb4&hm=b05eb4afb5aaae176b8ea668e5c3a816a5a860ff546fff34855e71bd321338c2&');
        });
    }
}
exports.default = new KickTheCheaterCommand();
