const { SlashCommandBuilder } = require('discord.js');

const phoenixWright = require('./json/phoenixwright.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('phoenix-wright')
    .setDescription('Phoenix wright showing you papers.')
    .addStringOption((option) =>
      option
        .setName('gif')
        .setDescription('The specific gif')
        .setRequired(true)
        .addChoices(
          phoenixWright.map(({ name, value }) => {
            return { name, value };
          })
        )
    ),
  async execute(interaction) {
    const gifChoice = interaction.options.getString('gif');
    // console.log(gifChoice);
    const gifName = phoenixWright.find(
      (element) => element.value === gifChoice
    );
    // console.log(gifName);
    await interaction.reply(gifName.url);
  },
};
