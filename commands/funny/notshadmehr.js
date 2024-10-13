const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('not-shadmehr')
    .setDescription(`How I sleep at night knowing I'm not shadmehr`),
  async execute(interaction) {
    // gif
    await interaction.reply('https://i.imgur.com/SEFYqSO.png');
  },
};
