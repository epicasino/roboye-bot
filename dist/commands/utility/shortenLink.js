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
require("dotenv/config");
class ShortenLinkCommand {
    constructor() {
        this.name = 'shorten-link';
        this.description = 'Shorten Long Links';
        this.slashCommandConfig = new discord_js_1.SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption((option) => option.setName('query').setDescription('Input URL').setRequired(true));
    }
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply();
            try {
                const userURL = interaction.options.getString('query', true);
                // console.log(userURL);
                const apiCall = yield fetch(`https://api.t.ly/api/v1/link/shorten`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${process.env.TLY_TOKEN}`,
                    },
                    body: JSON.stringify({
                        long_url: userURL,
                    }),
                }).then((response) => response.json());
                // console.log(apiCall);
                const shortLinkEmbed = new discord_js_1.EmbedBuilder()
                    .setColor(0x0099ff)
                    .setTitle(`Here's your shortened link!`)
                    .addFields({
                    name: 'Shortened URL',
                    value: `${apiCall.short_url}`,
                }
                // { name: "\u200B", value: "\u200B" },
                )
                    .setTimestamp()
                    .setFooter({ text: `https://t.ly/` });
                return interaction.followUp({ embeds: [shortLinkEmbed] });
            }
            catch (error) {
                console.log(error);
                return interaction.followUp(`Oops! Something went wrong. ${error}`);
            }
        });
    }
}
exports.default = new ShortenLinkCommand();
