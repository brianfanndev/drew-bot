import 'dotenv/config';

import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

const guildId = process.env.DISCORD_TEST_GUILD_ID;
const clientId = process.env.DISCORD_BOT_CLIENT_ID;
const token = process.env.DISCORD_BOT_TOKEN;

const commands = [
    new SlashCommandBuilder()
        .setName('esper')
        .setDescription("Gets an esper's information.")
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription("Esper's name")
                .setRequired(true)
                .addChoices()
        ),
    new SlashCommandBuilder()
        .setName('build')
        .setDescription("Gets an esper's recommended build."),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
