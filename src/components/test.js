// Obter spent time
function f1() {
  let currentTime = {
    hour: 0,
    minute: 1,
    second: 0
  };

  let time = {
    hour: 1,
    minute: 2,
    second: 11
  };

  let diffTime = { hour: 0, minute: 0, second: 0 };
  diffTime.hour = time.hour - currentTime.hour;
  diffTime.minute = time.minute - currentTime.minute;
  diffTime.second = time.second - currentTime.second;

  console.log(diffTime);
  let timeInSecond = 1;
  if (diffTime.hour !== 0) timeInSecond = timeInSecond * diffTime.hour * 3600;
  if (diffTime.minute !== 0) timeInSecond = timeInSecond + diffTime.minute * 60;
  if (diffTime.second !== 0) timeInSecond = timeInSecond + diffTime.second;

  console.log(timeInSecond);

  let tts = { hour: 0, minute: 0, second: 0 };
  if (timeInSecond !== 1) {
    tts.minute = Math.floor(timeInSecond / 60);
    tts.second = timeInSecond - tts.minute * 60;
    tts.hour = Math.floor(timeInSecond / 3600);
  }

  let spentTime = `${tts.hour}h ${tts.minute}m ${tts.second}s`;
  console.log(spentTime);
}


// Estrair time_spent
const time = '1h 1m 25s'

let stime = time.split(' ')
let ftime = {}
stime.forEach(ut=>{
    const unit = ut[ut.length-1]
    ftime[unit] = Number.parseInt(ut.replace(unit, ''))
})

console.log(ftime)
