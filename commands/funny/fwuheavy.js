const { SlashCommandBuilder } = require('discord.js');

const slapGifs = [
  'https://cdn.discordapp.com/attachments/1293114615361966142/1293114641592881184/mitaka_slap.gif?ex=6706325b&is=6704e0db&hm=fd935412b9bd8df6dc1694cb73e0db08f097b77c2266fcd6dda20a7493d4f459&',
  'https://cdn.discordapp.com/attachments/1293114615361966142/1293114662124126228/i_fw_u_heavy.gif?ex=67063260&is=6704e0e0&hm=409f89fb562a72a325ba75805e1cdfa121f5c86c1dab90ea6554011eb0290add&',
  'https://cdn.discordapp.com/attachments/1293114615361966142/1293114682072105012/i_fw_u_heavy_origin.gif?ex=67063265&is=6704e0e5&hm=2113cbca4d9abbddac7f9ba75b306b9a36fa973eeba5c330601ead3d54a17d7f&',
  'https://cdn.discordapp.com/attachments/1293114615361966142/1293114706017652847/i_fw_u_heavy_no_text.gif?ex=6706326a&is=6704e0ea&hm=20cb58ca9ee5510c81207e86d7a7163295fce23cc2793afc9c5ddd3a625a8207&',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('i-fwu-heavy')
    .setDescription('I fw u heavy.'),
  async execute(interaction) {
    await interaction.reply(
      await interaction.reply(
        slapGifs[Math.floor(Math.random() * slapGifs.length)]
      )
    );
  },
};
