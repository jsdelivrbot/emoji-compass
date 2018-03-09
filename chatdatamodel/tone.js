const ToneAnalyzer = require("watson-developer-cloud/tone-analyzer/v3");
const { TA_USERNAME, TA_PASSWORD } = process.env;
const ta = new ToneAnalyzer({
  username: TA_USERNAME,
  password: TA_PASSWORD,
  version_date: "2017-12-12"
});

function fetchToneData(data, cb) {
  const tone_input = data;
  ta.tone(
    { tone_input, content_type: "text/plain", sentences: false },
    (err, res) => {
      if (
        err => {
          console.log("HI THERE WORLD", err);
        }
      );
      cb(null, res);
    }
  );
}

function fetchToneEmojis(data, cb) {
  fetchToneData(data, (err, toneData) => {
    cb(
      null,
      toneData.document_tone.tones.reduce((acc, item) => {
        if (item.tone_id === "joy") {
          item.score > 0.75
            ? (acc.joy = "\uD83D\uDE02")
            : item.score > 0.65
              ? (acc.joy = "\uD83D\uDE01")
              : item.score > 0.55
                ? (acc.joy = "\uD83D\uDE00")
                : (acc.joy = "\uD83D\uDE42");
        }
        if (item.tone_id === "fear") {
          item.score > 0.75
            ? (acc.fear = "\uD83D\uDE31")
            : item.score > 0.65
              ? (acc.joy = "\uD83D\uDE30")
              : item.score > 0.55
                ? (acc.joy = "\uD83D\uDE28")
                : (acc.fear = "\uD83D\uDE33");
        }
        if (item.tone_id === "anger") {
          item.score > 0.75
            ? (acc.anger = "\uD83E\uDD2C")
            : item.score > 0.65
              ? (acc.anger = "\uD83D\uDE21")
              : item.score > 0.55
                ? (acc.anger = "\uD83D\uDE24")
                : (acc.anger = "\uD83D\uDE20");
        }
        if (item.tone_id === "sadness") {
          item.score > 0.75
            ? (acc.sadness = "\uD83D\uDE2D")
            : item.score > 0.65
              ? (acc.sadness = "\uD83D\uDE22")
              : item.score > 0.55
                ? (acc.sadness = "\uD83D\uDE29")
                : (acc.sadness = "\uD83D\uDE41");
        }
        if (item.tone_id === "analytical") {
          item.score > 0.75
            ? (acc.analytical = "\uD83E\uDD13")
            : item.score > 0.65
              ? (acc.analytical = "\uD83D\uDD14")
              : item.score > 0.55
                ? (acc.analytical = "\uD83D\uDE28")
                : (acc.analytical = "\uD83E\uDE2F");
        }
        if (item.tone_id === "confident") {
          item.score > 0.75
            ? (acc.confident = "\uDE3D\uDE0E")
            : item.score > 0.65
              ? (acc.confident = "\uD83D\uDE1C")
              : item.score > 0.55
                ? (acc.confient = "\uD83D\uDE09")
                : (acc.confident = "\uD83D\uDE0F");
        }
        if (item.tone_id === "tentative") {
          item.score > 0.75
            ? (acc.tentative = "\uD83D\uDE13")
            : item.score > 0.65
              ? (acc.tentative = "\uD83D\uDE2C")
              : item.score > 0.55
                ? (acc.tentative = "\uD83D\uDE26")
                : (acc.tentative = "\uD83D\uDE14");
        }
        return acc;
      }, {})
    );
  });
}

function fetchToneScores(data, cb) {
  fetchToneData(data, (err, toneData) => {
    cb(
      null,
      toneData.document_tone.tones.reduce((acc, msg) => {
        acc[`${msg.tone_id}`] = msg.score;
        return acc;
      }, {})
    );
  });
}

module.exports = { fetchToneData, fetchToneEmojis, fetchToneScores };
