const slack = require("slack");
const { SLACK_TOKEN, SLACK_CHANNEL } = process.env;

function fetchSlackHistory() {
  return slack.channels.history({
    token: SLACK_TOKEN,
    channel: SLACK_CHANNEL
  });
}
function stringMessageText(string, cb) {
  cb(
    null,
    string.messages.reduce((acc, msg) => {
      acc += `${msg.text} `;
      return acc;
    }, "")
  );
}

module.exports = { fetchSlackHistory, stringMessageText };
