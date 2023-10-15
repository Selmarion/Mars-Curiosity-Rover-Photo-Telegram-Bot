# Mars Curiosity Rover Photo Bot

This is a Telegram bot that allows you to retrieve photos taken by the Mars Curiosity Rover. The bot uses the NASA API to fetch photos from the rover's mission and sends them to your chat.

## Prerequisites

Before running this project, make sure you have the following:

- [Node.js](https://nodejs.org/) installed.
- A Telegram Bot Token. You can create a bot and obtain its token from [BotFather](https://core.telegram.org/bots#botfather).
- An API key from NASA. You can get one from the [NASA API website](https://api.nasa.gov/).

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Configure your Telegram Bot Token and NASA API key:
   
   Replace `'YOUR_TELEGRAM_BOT_TOKEN'` with your actual Telegram Bot Token and `'YOUR_NASA_API_KEY'` with your NASA API key in the following line of the `index.js` file:

   ```javascript
   const bot = new TelegramBot('YOUR_TELEGRAM_BOT_TOKEN', { polling: true });
   ```

4. Start the bot:

   ```bash
   node index.js
   ```

## Usage

- Start a chat with the bot on Telegram.
- Send the `/start` command to initiate a conversation with the bot.
- Use the `/help` command to get instructions on how to fetch Mars photos.
- Use the `/new` command to request photos for a specific date. Provide the date in the format `YYYY-MM-DD`.
- The bot will fetch photos taken by the Mars Curiosity Rover on the specified date and send them to your chat.

## Cleanup

The bot is set to delete the downloaded photo files from the 'data' directory after 60 seconds. It keeps a file named 'keep' in the directory to prevent it from being deleted.

## Credits

This project uses the [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) library to interact with the Telegram Bot API and the [axios](https://github.com/axios/axios) library to make HTTP requests to the NASA API.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
