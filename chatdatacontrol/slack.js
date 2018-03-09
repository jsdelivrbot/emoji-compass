const {
  fetchSlackHistory,
  stringMessageText
} = require("../chatdatamodel/slack.js");
const {
  fetchToneData,
  fetchToneEmojis,
  fetchToneScores
} = require("../chatdatamodel/tone.js");

function getSlackHistory(req, res, next) {
  fetchSlackHistory()
    .then(history => {
      res.send(history);
    })
    .catch(next);
}

function getSlackToneData(req, res, next) {
  fetchSlackHistory()
    .then(history => {
      stringMessageText(history, (err, text) => {
        fetchToneData(text, (err, data) => {
          res.send(data);
        });
      });
    })
    .catch(next);
}

function getSlackEmojis(req, res, next) {
  fetchSlackHistory()
    .then(history => {
      stringMessageText(history, (err, text) => {
        fetchToneEmojis(text, (err, emojis) => {
          res.send(emojis);
        });
      });
    })
    .catch(next);
}

function getSlackScores(cb) {
  fetchSlackHistory()
    .then(history => {
      stringMessageText(history, (err, text) => {
        fetchToneScores(text, (err, scores) => {
          cb(null, scores);
        });
      });
    })
    .catch(next);
}

module.exports = {
  getSlackHistory,
  getSlackToneData,
  getSlackEmojis,
  getSlackScores
};
