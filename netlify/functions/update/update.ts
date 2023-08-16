import dotenv from 'dotenv';
dotenv.config();
import { Handler } from '@netlify/functions'
import { sequelize } from './db/connection';

import "./commands" // loads bot commands

import { bot } from './services/telegraf';

export const handler: Handler = async (event) => {

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  bot.handleUpdate(JSON.parse(event.body || "{}"));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello bot!`,
    }),
  }
}
