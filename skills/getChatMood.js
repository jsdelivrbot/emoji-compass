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
      if (bot) {
        bot.startConversation(message, function(err, convo) {
          fetchSlackHistory()
            .then(history => {
              convo.say(history);
              convo.next();
            })
            .catch(next);
        });
      }
    }
  );
};
