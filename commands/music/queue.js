const { SlashCommandBuilder } = require("discord.js");
const { useMasterPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Gets current player queue.'),
  async execute(interaction) {
    const player = useMasterPlayer();
    const queue = player.nodes.get(interaction.guild.members.me);
    const tracks = queue.tracks.toArray();
    const currentTrack = queue.currentTrack;

    await interaction.deferReply();

    try {
      const tracksMsg = tracks.map(track => `- ${track}`)
      return interaction.followUp(`**Current Track:** ${currentTrack}\n\n **Queue:**\n ${tracksMsg.join('\n')}`);
    } catch (e) {
      return interaction.followUp(`Error: ${e}`);
    }
    
  }
}
  // `Current Track: ${queue.currentTrack}`