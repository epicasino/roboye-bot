const { SlashCommandBuilder } = require("discord.js");
const { useMasterPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Leave VC & Clear Queue"),
  async execute(interaction) {
    const player = useMasterPlayer();
    const queue = player.nodes.get(interaction.guild.members.me);
    const tracks = queue.tracks.toArray();
    const currentTrack = queue.currentTrack;

    await interaction.deferReply();

    try {
      queue.delete();
      return interaction.followUp("Left VC & Cleared Queue!");
    } catch (e) {
      return interaction.followUp(`Error: ${e}`);
    }
  },
};

