const fetch = require("node-fetch");

module.exports = function(controller) {
  controller.hears(
    ["mood"],
    "direct_message,direct_mention",
    (bot, message) => {
      bot.startConversation(message, function(err, convo) {
        fetch("https://calm-ravine-67145.herokuapp.com/api/slack/emojis")
          .then(res => res.json())
          .then(history => {
            convo.say(JSON.stringify(history));
            convo.next();
          })
          .catch(err);
      });
    }
  );
};
