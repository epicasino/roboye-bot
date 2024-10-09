const { SlashCommandBuilder } = require('discord.js');

const cracked = require('./json/cracked.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dont-be-cracked')
    .setDescription('dont be cracked...')
    .addStringOption((option) =>
      option
        .setName('gif')
        .setDescription('The specific gif')
        .setRequired(true)
        .addChoices(
          cracked.map(({ name, value }) => {
            return { name, value };
          })
        )
    ),
  async execute(interaction) {
    const gifChoice = interaction.options.getString('gif');
    // console.log(gifChoice);
    const gifName = cracked.find((element) => element.value === gifChoice);
    // console.log(gifName);
    await interaction.reply(gifName.url);
  },
};
