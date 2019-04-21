let startTimestamp;

const getTimestamp = () => {
  if (!startTimestamp) {
    startTimestamp = new Date();
  }
  return startTimestamp;
};

getTimestamp();

const getTimeRun = () => {
  let nowTime = new Date();
  return (nowTime.getTime() - getTimestamp()) / 1000;
};

module.exports.getTimeRun = (req, res) => {
  let jsonObj = {
    started: getTimestamp(),
    upTime: `${getTimeRun()}sec.`
  };

  res.send(JSON.stringify(jsonObj, null, 4));
};
