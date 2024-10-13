const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('salt-in-a-pretzel-bag')
    .setDescription('eating the salt in a pretzel bag'),
  async execute(interaction) {
    // gif
    await interaction.reply(
      'blob:https://imgur.com/cfbe9450-0a82-4928-ad03-f58896fff7c8'
    );
  },
};
