const fetch = require("node/fetch");

module.exports = function(controller) {
  controller.hears(
    ["moodtext"],
    "direct_message,direct_mention",
    (bot, message) => {
      bot.startConversation(message, function(err, convo) {
        convo
          .ask("Please paste in the text you'd like emojified", function(
            response,
            convo
          ) {
            fetch("https://calm-ravine-67145.herokuapp.com/api/tone/emoji", {
              method: "POST",
              body: response.text
            })
              .then(res => res.json())
              .then(body => {
                convo.say(body);
                convo.next();
              });
          })
          .catch(err);
      });
    }
  );
};
