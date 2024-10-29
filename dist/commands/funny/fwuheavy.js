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
const fwuheavy_json_1 = __importDefault(require("./json/fwuheavy.json"));
class IFwUHeavyCommand {
    constructor() {
        this.name = 'i-fw-u-heavy';
        this.description = 'I fw u heavy.';
        this.slashCommandConfig = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption((option) => option
            .setName('gif')
            .setDescription('The specific gif')
            .setRequired(true)
            .addChoices(fwuheavy_json_1.default.map(({ name, value }) => {
            return { name, value };
        })));
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const gifChoice = interaction.options.getString('gif');
            // console.log(gifChoice);
            const gifName = fwuheavy_json_1.default.find((element) => element.value === gifChoice);
            // console.log(gifName);
            yield interaction.reply(gifName.url);
        });
    }
}
exports.default = new IFwUHeavyCommand();
