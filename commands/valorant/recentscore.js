const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('recentscore')
    .setDescription("Returns a player's latest Valorant score.")
    .addStringOption((option) =>
      option
        .setName('player_name')
        .setDescription('Input Player Name')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('player_tag')
        .setDescription('Input Player Tag')
        .setRequired(true)
    ),
  async execute(interaction) {
    interaction.deferReply();
    try {
      const playerName = interaction.options.getString('player_name', true);
      const playerTag = interaction.options.getString('player_tag', true);

      const playerMMR = await fetch(
        `https://api.henrikdev.xyz/valorant/v3/mmr/na/pc/${playerName}/${playerTag}?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          return data.data;
        });

      if (!playerMMR) {
        throw 'No Matching Player!';
      }

      // console.log(playerTag);

      const latestMatch = await fetch(
        `https://api.henrikdev.xyz/valorant/v4/matches/na/pc/${playerName
          .trim()
          .split(' ')
          .join('%20')}/${playerTag}?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            return data.data[0];
          } else throw `Error code ${data.status}`;
        });

      // console.log(latestMatch);

      const player = latestMatch.players.find(
        (player) => player.name === playerName && player.tag === playerTag
      );

      if (!player) {
        throw 'No Matching Player!';
      }

      // console.log(player);

      const matchLength = latestMatch.rounds.length;
      const acs = Math.floor(player.stats.score / matchLength);

      const teamInfo = latestMatch.teams.find(
        (team) => team.team_id === player.team_id
      );
      const agentInfo = await fetch(
        `https://valorant-api.com/v1/agents/${player.agent.id}`
      ).then((res) => res.json());

      const mapInfo = await fetch(
        `https://valorant-api.com/v1/maps/${latestMatch.metadata.map.id}`
      ).then((res) => res.json());

      const gamemodeInfo = await fetch(`https://valorant-api.com/v1/gamemodes`)
        .then((res) => res.json())
        .then((gamemodes) =>
          gamemodes.data.find(
            (gamemode) =>
              gamemode.displayName === latestMatch.metadata.queue.mode_type
          )
        );

      // console.log(gamemodeInfo);

      // gets the last rank episode in array, unsure if thats right or not butt we'll see about that
      const ranksInfo = await fetch(
        `https://valorant-api.com/v1/competitivetiers`
      )
        .then((res) => res.json())
        .then((data) => data.data.pop());

      // console.log(ranksInfo)

      const matchEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
          `${playerName}'s Game on ${new Date(
            latestMatch.metadata.started_at
          ).toLocaleDateString()}`
        )
        .setURL(
          `https://tracker.gg/valorant/match/${latestMatch.metadata.match_id}`
        )
        .setAuthor({
          name: `${player.name}#${player.tag} | ${playerMMR.current.tier.name}`,
          iconURL: ranksInfo.tiers.find(
            (rank) => rank.tier === playerMMR.current.tier.id
          ).largeIcon,
          url: `https://tracker.gg/valorant/profile/riot/${player.name
            .trim()
            .split(' ')
            .join('%20')}%23${player.tag}/overview`,
        })
        .setThumbnail(agentInfo.data.displayIcon)
        .addFields(
          {
            name: 'Average Combat Score',
            value: `${playerName}'s ACS is **\`${acs}\`**`,
          },
          { name: 'Kills', value: `\`${player.stats.kills}\``, inline: true },
          {
            name: 'Deaths',
            value: `**\`${player.stats.deaths}\`**`,
            inline: true,
          },
          {
            name: 'Assists',
            value: `\`${player.stats.assists}\``,
            inline: true,
          },
          {
            name: '\u200B',
            value: '**Abilities Used**',
          },
          {
            name: `${agentInfo.data.abilities[2].displayName}`,
            value: `\`${player.ability_casts.grenade}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[0].displayName}`,
            value: `\`${player.ability_casts.ability1}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[1].displayName}`,
            value: `\`${player.ability_casts.ability2}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[3].displayName}`,
            value: `\`${player.ability_casts.ultimate}\``,
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
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
