# Discord Auction Bot

A Discord bot for running multi-auction bidding contests, with bid rate limiting and logging.  
Ready for deployment on [Railway](https://railway.app).

## Features

- Create auction channels via Discord commands
- Run multiple auctions simultaneously
- Bid rate limiting (prevents spam)
- Logging of all major events to a log channel
- Easy setup for Railway

## Railway Deployment

1. **Clone the repository**
2. **Set environment variables**
   On Railway, set these in the dashboard or in `.env` for local testing:
   ```
   BOT_TOKEN=your_discord_bot_token
   GUILD_ID=your_guild_id
   LOG_CHANNEL_ID=your_log_channel_id
   BIDDERS_ROLE=Bidders
   ```
3. **Deploy**
   Railway uses the provided `Dockerfile` and `railway.json` for build and deploy.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` file from `.env.example` and fill in your values.
3. Start the bot:
   ```bash
   npm start
   ```

## Main Entry

Bot entry point: `src/bot.js`

## Extending

- Add commands in `src/commands/`
- Add event handlers in `src/events/`
- Update logic in `src/utils/`
