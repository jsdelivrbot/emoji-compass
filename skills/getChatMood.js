const { getSlackEmojis } = require("../chatdatacontrol/slack.js");

module.exports = function(controller) {
  controller.hears(
    ["mood"],
    "direct_message,direct_mention",
    (bot, message) => {
      bot.startConversation(message, (err, convo) => {
        convo.say(`Hello`);
        convo.next();
      });
    }
  );
};
