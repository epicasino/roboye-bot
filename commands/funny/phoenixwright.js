const { SlashCommandBuilder } = require('discord.js');

const phoenixGifs = [
  'https://cdn.discordapp.com/attachments/1293115691112726528/1293115749837176902/phoenix_wright_papers.gif?ex=67063363&is=6704e1e3&hm=99307844cb32fba0fc891bf98351b63686a1490df9e2123d7aa08ab67470d8c8&',
  'https://cdn.discordapp.com/attachments/1293115691112726528/1293115764731154432/phoenix_wright_papers_2.gif?ex=67063367&is=6704e1e7&hm=0145c112de5d7b2d2f1b7a1d42bfe45ee0c4ed9992c7da46abe6fbb862a2b1be&',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('phoenix-wright')
    .setDescription('Phoenix wright showing you papers.'),
  async execute(interaction) {
    await interaction.reply(
      phoenixGifs[Math.floor(Math.random() * phoenixGifs.length)]
    );
  },
};
