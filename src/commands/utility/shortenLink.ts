import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import { iCommand } from '../../types/types';
import 'dotenv/config';

export default class ShortenLinkCommand implements iCommand {
  name = 'shorten-link';
  description = 'Shorten Long Links';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .addStringOption((option) =>
      option.setName('query').setDescription('Input URL').setRequired(true)
    );
  async execute(interaction: ChatInputCommandInteraction): Promise<any> {
    await interaction.deferReply();
    try {
      const userURL = interaction.options.getString('query', true);
      // console.log(userURL);

      const apiCall = await fetch(`https://api.t.ly/api/v1/link/shorten`, {
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

      const shortLinkEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`Here's your shortened link!`)
        .addFields(
          {
            name: 'Shortened URL',
            value: `${apiCall.short_url}`,
          }
          // { name: "\u200B", value: "\u200B" },
        )
        .setTimestamp()
        .setFooter({ text: `https://t.ly/` });

      return interaction.followUp({ embeds: [shortLinkEmbed] });
    } catch (error) {
      console.log(error);
      return interaction.followUp(`Oops! Something went wrong. ${error}`);
    }
  }
}
