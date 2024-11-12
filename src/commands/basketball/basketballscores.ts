import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import { load } from 'cheerio';
import { iCommand } from '../../types/types';

class BasketballScoresCommand implements iCommand {
  name = 'basketball-scores';
  description = `Shows the current NBA games and the current score for each of them.`;
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const html = await fetch('https://www.espn.com/nba/scoreboard').then(
      (res) => res.text()
    );
    const $ = load(html);
    const gamesHTML = $(
      '.Scoreboard.bg-clr-white.flex.flex-auto.justify-between'
    ).toArray();
    // console.log(games.length);
    const gamesEmbed = gamesHTML.map((gameHTML) => {
      const scoreInfo = $(gameHTML)
        .find('.ScoreboardScoreCell__Competitors')
        .children()
        .toArray()
        .map((team) => {
          const teamName = $(team)
            .find('.ScoreCell__TeamName.ScoreCell__TeamName--shortDisplayName')
            .text();
          const teamScore = $(team)
            .find('.ScoreCell__Score.ScoreCell_Score--scoreboard')
            .text();
          console.log({ teamName, teamScore });
        });
      // console.log(scoreInfo.length);
    });
    await interaction.reply('Test');
  }
}

export default new BasketballScoresCommand();

// Scoreboard bg-clr-white flex flex-auto justify-between
// team name:
// ScoreCell__TeamName ScoreCell__TeamName--shortDisplayName db
// score:
// ScoreCell__Score ScoreCell_Score--scoreboard
