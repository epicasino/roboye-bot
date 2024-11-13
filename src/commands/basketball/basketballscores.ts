import 'dotenv/config';
import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from 'discord.js';
import { load } from 'cheerio';
import { iCommand } from '../../types/types';
import { iGame, iGamesAPI } from './types/types';

function generateEmbed(game: iGame) {
  const linkFields = game.gameLinks.map((gameLink) => {
    return {
      name: '\u200B',
      value: `**[${gameLink.linkName}](${gameLink.link})**`,
      inline: true,
    };
  });

  const playerFields = game.topPerformers.map((player) => {
    return {
      name: `${player.playerName}, ${player.playerDetails}`,
      value: `[${player.playerStats
        .map((stat) => {
          return `${stat.statValue} ${stat.statName}`;
        })
        .join(', ')}](${player.playerLink})`,
    };
  });

  return {
    color: 0x0099ff,
    title: `${game.awayTeam.teamName} (${game.awayTeam.teamRecord}) vs. ${game.homeTeam.teamName} (${game.homeTeam.teamRecord})`,
    url: game.gameLinks.find((link) => {
      return link.linkName === 'Gamecast';
    }).link,
    author: {
      name: `Current Games & Scores on ${new Date().toLocaleDateString()}`,
      icon_url:
        'https://a1.espncdn.com/combiner/i?img=%252Fi%252Fmobile%252Fwebsite%252Fimg%252Fespn_app_72@2x.png&w=60&h=60&scale=crop&cquality=80&location=origin',
      url: `https://www.espn.com/nba/scoreboard`,
    },
    fields: [
      {
        name: '\u200B',
        value: `**${game.awayTeam.teamScore}**`,
        inline: true,
      },
      { name: game.time, value: '**-**', inline: true },
      { name: '\u200B', value: `**${game.homeTeam.teamScore}**`, inline: true },
      { name: '\u200B', value: '**TOP PLAYERS**' },
    ]
      .concat(playerFields)
      .concat(linkFields),
  };
}

async function generateGameScores() {
  const gamesInfo = await generateGameInfo();
  const gameTimes = await generateGameTimes();
  const gameScores = gamesInfo.map((game) => {
    return {
      ...game,
      time: gameTimes.find((gameTime) => {
        return gameTime.visitor_team.name === game.awayTeam.teamName;
      }).time,
    };
  });

  return gameScores;
}

async function generateGameInfo() {
  const html = await fetch('https://www.espn.com/nba/scoreboard/').then((res) =>
    res.text()
  );
  const $ = load(html);
  const gamesHTML = $('.Scoreboard').toArray();
  // console.log(gamesHTML.length);
  const gamesInfo = gamesHTML.map((gameHTML) => {
    const scoreInfo = $(gameHTML)
      .find('.ScoreboardScoreCell__Competitors')
      .children()
      .toArray()
      .map((team) => {
        const teamName = $(team)
          .find('.ScoreCell__TeamName.ScoreCell__TeamName--shortDisplayName')
          .text();
        const teamRecord = $(team)
          .find('.ScoreboardScoreCell__Record')
          .toArray()
          .map((element) => {
            const text = $(element).text();
            if (/Home|Away/.test(text)) {
              return text.includes('Away')
                ? `${text.substring(0, text.indexOf('A'))} Away`
                : `${text.substring(0, text.indexOf('H'))} Home`;
            } else return text;
          })
          .join(', ');
        const teamScore = $(team)
          .find('.ScoreCell__Score.ScoreCell_Score--scoreboard')
          .text();
        // console.log({ teamName, teamRecord, teamScore });
        return { teamName, teamRecord, teamScore };
      });
    const topPerformers = $(gameHTML)
      .find('.Scoreboard__Performers')
      .children()
      .children()
      .toArray()
      .map((player) => {
        // console.log($(player).text());
        const playerLink = `https://www.espn.com${$(player)
          .find('a')
          .attr('href')}`;
        const playerEls = $(player).children().children();
        // console.log($(playerEls).text());
        const playerInfoEls = $(playerEls)
          .children('.Athlete__PlayerWrapper')
          .children('h3');
        // console.log(playerInfoEls);
        const playerName = $(playerInfoEls)
          .children('.Athlete__PlayerName')
          .text();
        const playerDetails = $(playerInfoEls)
          .children('.Athlete__NameDetails')
          .text();
        const playerStats = $(playerEls)
          .children('.Athlete__PlayerWrapper')
          .children('.Athlete__Stats')
          .children()
          .toArray()
          .map((stat) => {
            return {
              statName: $(stat).children('.Athlete__Stats--label').text(),
              statValue: $(stat).children('.Athlete__Stats--value').text(),
            };
          });
        // console.log(playerStats);
        return { playerLink, playerName, playerDetails, playerStats };
      });
    const gameLinks = $(gameHTML)
      .find('.Scoreboard__Callouts')
      .children()
      .toArray()
      .map((btn) => {
        return {
          linkName: $(btn).text(),
          link: `https://www.espn.com${$(btn).attr('href')}`,
        };
      });
    // console.log(topPerformers);
    return {
      awayTeam: scoreInfo[0],
      homeTeam: scoreInfo[1],
      topPerformers,
      gameLinks,
    };
  });
  return gamesInfo;
}

async function generateGameTimes() {
  // THERES GOTTA BE A BETTER WAY
  let date: string | string[] = new Date()
    .toLocaleDateString('en-US')
    .split('/');
  date = `${date[2]}-${date[0]}-${date[1]}`;
  // console.log(date);
  const gameTimes = await fetch(
    `https://api.balldontlie.io/v1/games?dates[]=${date}`,
    { headers: { Authorization: process.env.BDL_TOKEN } }
  )
    .then((res) => res.json())
    .then((data: iGamesAPI) => {
      return data.data;
    });

  // console.log(gameTimes);
  return gameTimes;
}

class BasketballScoresCommand implements iCommand {
  name = 'basketball-scores';
  description = `Shows the current NBA games and the current score for each of them.`;
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  async execute(interaction: ChatInputCommandInteraction): Promise<any> {
    interaction.deferReply();
    const gameScores = await generateGameScores();
    // console.log(gameScores);

    const gameEmbeds = gameScores.map((game) => {
      return generateEmbed(game);
    });

    const nextButton = new ButtonBuilder()
      .setCustomId('next')
      .setEmoji('➡️')
      .setStyle(ButtonStyle.Primary);

    const backButton = new ButtonBuilder()
      .setCustomId('back')
      .setEmoji('⬅️')
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      backButton,
      nextButton
    );
    const nextRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      nextButton
    );
    const backRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      backButton
    );

    let currentPage = 0;
    const response = await interaction.followUp({
      embeds: [gameEmbeds[currentPage]],
      components: [nextRow],
    });

    const collector = response.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      time: 60_000,
    });

    collector.on('collect', async (i) => {
      if (i.customId === 'next') {
        // console.log('next');
        currentPage++;
        await i.update({
          embeds: [gameEmbeds[currentPage]],
          components: [currentPage === gameEmbeds.length - 1 ? backRow : row],
        });
      }
      if (i.customId === 'back') {
        // console.log('back');
        currentPage--;
        await i.update({
          embeds: [gameEmbeds[currentPage]],
          components: [currentPage === 0 ? nextRow : row],
        });
      }
    });
  }
}

export default new BasketballScoresCommand();

// Scoreboard bg-clr-white flex flex-auto justify-between
// team name:
// ScoreCell__TeamName ScoreCell__TeamName--shortDisplayName db
// score:
// ScoreCell__Score ScoreCell_Score--scoreboard
// team record:
// ScoreboardScoreCell__Record
