const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('big-bastard')
    .setDescription('A Big Bastard'),
  async execute(interaction) {
    await interaction.reply('https://i.imgur.com/tpq5Lc2.gif');
  },
};
