const {
  getSlackEmojis,
  getSlackHistory
} = require("../chatdatacontrol/slack.js");
const { fetchSlackHistory, stringMessageText } = require("../chatdatamodel/slack.js");

module.exports = function(controller) {
  controller.hears(
    ["mood"],
    "direct_message,direct_mention",
    (bot, message) => {
      bot.startConversation(message, function(err, convo) {
        fetchSlackHistory().then(history => {
          convo.say(JSON.stringify(history));
        convo.next();
        }).catch(err);
      })
    }
  );
};
