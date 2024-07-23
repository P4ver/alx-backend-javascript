const fs = require('fs');

function countStudents(path) {
  try {
    let data_f = fs.readFileSync(path, 'utf8').toString().split('\n');
    data = data_f.slice(1, data_f.length - 1);
    console.log(`Number of students: ${data.length}`);
    const obj = {};
    data.forEach((el) => {
      const student = el.split(',');
      if (!obj[student[3]]) obj[student[3]] = [];
      obj[student[3]].push(student[0]);
    });
    for (const cls in obj) {
      if (cls) console.log(`Number of students in ${cls}: ${obj[cls].length}. List: ${obj[cls].join(', ')}`);
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
