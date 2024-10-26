import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface iCommand {
  name: string;
  description?: string;
  slashCommandConfig: SlashCommandBuilder;

  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
