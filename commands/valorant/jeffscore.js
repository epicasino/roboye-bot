const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jeffscore')
    .setDescription("Returns Jeff's latest Valorant score."),
  async execute(interaction) {
    interaction.deferReply();
    try {
      const latestMatch = await fetch(
        `https://api.henrikdev.xyz/valorant/v4/matches/na/pc/JeffTheFri/Crisp?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            return data.data[0];
          } else throw `Error code ${data.status}`;
        });

      // console.log(latestMatch);

      const jeff = latestMatch.players.find(
        (player) => player.puuid === '921d5e64-161a-5df5-9b59-b75c4408e8f4'
      );

      // console.log(jeff);

      const matchLength = latestMatch.rounds.length;
      const acs = Math.floor(jeff.stats.score / matchLength);

      const agentInfo = await fetch(
        `https://valorant-api.com/v1/agents/${jeff.agent.id}`
      ).then((res) => res.json());

      const mapInfo = await fetch(
        `https://valorant-api.com/v1/maps/${latestMatch.metadata.map.id}`
      ).then((res) => res.json());

      const gamemodeInfo = await fetch(`https://valorant-api.com/v1/gamemodes`)
        .then((res) => res.json())
        .then(
          (gamemodes) =>
            gamemodes.data.filter(
              (gamemode) =>
                gamemode.displayName === latestMatch.metadata.queue.mode_type
            )[0]
        );

      // console.log(gamemodeInfo);

      const matchEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
          `Jeff's Game on ${new Date(
            latestMatch.metadata.started_at
          ).toLocaleDateString()}`
        )
        .setURL(
          `https://tracker.gg/valorant/match/${latestMatch.metadata.match_id}`
        )
        .setThumbnail(agentInfo.data.displayIcon)
        .addFields(
          {
            name: 'Average Combat Score',
            value: `Jeff's ACS is **\`${acs}\`**`,
          },
          { name: 'Kills', value: `\`${jeff.stats.kills}\``, inline: true },
          {
            name: 'Deaths',
            value: `**\`${jeff.stats.deaths}\`**`,
            inline: true,
          },
          { name: 'Assists', value: `\`${jeff.stats.assists}\``, inline: true },
          {
            name: '\u200B',
            value: '**Abilities Used**',
          },
          {
            name: `${agentInfo.data.abilities[2].displayName}`,
            value: `\`${jeff.ability_casts.grenade}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[0].displayName}`,
            value: `\`${jeff.ability_casts.ability1}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[1].displayName}`,
            value: `\`${jeff.ability_casts.ability2}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[3].displayName}`,
            value: `\`${jeff.ability_casts.ultimate}\``,
            inline: true,
          }
        )
        .setImage(`${mapInfo.data.listViewIcon}`)
        .setFooter({
          text: `Gamemode: ${latestMatch.metadata.queue.name}`,
          iconURL: `${gamemodeInfo.displayIcon}`,
        });

      return interaction.followUp({ embeds: [matchEmbed] });
    } catch (e) {
      console.error(e);
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
