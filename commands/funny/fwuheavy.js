const { SlashCommandBuilder } = require('discord.js');

const fwuheavy = require('./json/fwuheavy.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('i-fwu-heavy')
    .setDescription('I fw u heavy.')
    .addStringOption((option) =>
      option
        .setName('gif')
        .setDescription('The specific gif')
        .setRequired(true)
        .addChoices(
          fwuheavy.map(({ name, value }) => {
            return { name, value };
          })
        )
    ),
  async execute(interaction) {
    const gifChoice = interaction.options.getString('gif');
    // console.log(gifChoice);
    const gifName = fwuheavy.find((element) => element.value === gifChoice);
    // console.log(gifName);
    await interaction.reply(gifName.url);
  },
};
