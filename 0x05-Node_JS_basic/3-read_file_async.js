const fs = require('fs');

function countStudents(path) {
  const prmise = (res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) rej(Error('Cannot load the database'));
      if (data) {
        let nw_Data = data.toString().split('\n');
        nw_Data = nw_Data.slice(1, nw_Data.length - 1);
        console.log(`Number of students: ${nw_Data.length}`);
        const obj = {};
        newData.forEach((el) => {
          const student = el.split(',');
          if (!obj[student[3]]) obj[student[3]] = [];
          obj[student[3]].push(student[0]);
        });
        for (const cls in obj) {
          if (cls) console.log(`Number of students in ${cls}: ${obj[cls].length}. List: ${obj[cls].join(', ')}`);
        }
      }
      res();
    });
  };
  return new Promise(prmise);
}

module.exports = countStudents;
