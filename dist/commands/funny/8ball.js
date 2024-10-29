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
const discord_js_1 = require("discord.js");
const _8ball_json_1 = __importDefault(require("./json/8ball.json"));
class EightBallCommand {
    constructor() {
        this.name = '8-ball';
        this.description = 'Shake the 8 ball to decide your fate.';
        this.slashCommandConfig = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const question = interaction.options.getString('question');
            const eightball = _8ball_json_1.default[Math.floor(Math.random() * _8ball_json_1.default.length)];
            const eightBallEmbed = {
                title: 'The 8 Ball has Decided!',
                description: `"${question}"`,
                color: parseInt(eightball.color),
                fields: [
                    {
                        name: '\u200B',
                        value: `**Result: ${eightball.result}**`,
                    },
                ],
            };
            // console.log(eightBallEmbed);
            yield interaction.reply({ embeds: [eightBallEmbed] });
        });
    }
}
exports.default = new EightBallCommand();
