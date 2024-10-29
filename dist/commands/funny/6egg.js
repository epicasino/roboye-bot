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
class SixEggCommand {
    constructor() {
        this.name = '6-bomboclatt-egg';
        this.description = '6 Bomboclatt Egg!';
        this.slashCommandConfig = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply('https://cdn.discordapp.com/attachments/902415144670351373/1298480118616035328/Crazy_Jamaican_Lady_Cursing_Son_6_EGGS.mp4?ex=6719b758&is=671865d8&hm=3da8a8fd3147f11e929b2335e01bc37280ec292dbb3fb213948ecc3b60aaf4e4&');
        });
    }
}
exports.default = new SixEggCommand();
