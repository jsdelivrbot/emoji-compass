const {
  getSlackEmojis,
  getSlackHistory
} = require("../chatdatacontrol/slack.js");
const { fetchSlackHistory } = require("../chatdatamodel/slack.js");

module.exports = function(controller) {
  controller.hears(
    ["mood"],
    "direct_message,direct_mention",
    (bot, message) => {
      console.log(bot);
      bot.startConversation(message, (err, convo) => {
        fetchSlackHistory()
          .then(history => {
            convo.say(history);
            convo.next();
          })
          .catch(next);
      });
    }
  );
};
