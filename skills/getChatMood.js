const { getSlackEmojis } = require("../chatdatacontrol/slack.js");

module.exports = function(controller) {
  controller.hears(
    ["mood"],
    "direct_message,direct_mention",
    (bot, message) => {
      bot.startConversation(message, (err, convo) => {
        getSlackEmojis(err, data => {
          console.log(data);
          convo.say(data);
          convo.next();
        });
      });
    }
  );
};
