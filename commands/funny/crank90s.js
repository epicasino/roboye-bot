const { SlashCommandBuilder } = require('discord.js');

const crank90s = require('./json/crank90s.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crank-90s')
    .setDescription('Bot cranks 90s!')
    .addStringOption((option) =>
      option
        .setName('gif')
        .setDescription('The specific gif')
        .setRequired(true)
        .addChoices(
          crank90s.map(({ name, value }) => {
            return { name, value };
          })
        )
    ),
  async execute(interaction) {
    const gifChoice = interaction.options.getString('gif');
    // console.log(gifChoice);
    const gifName = crank90s.find((element) => element.value === gifChoice);
    // console.log(gifName);
    await interaction.reply(gifName.url);
  },
};
