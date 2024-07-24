const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reportParts = [];
        const lines = data.toString('utf-8').trim().split('\n');
        const groups = {};
        const headers = lines[0].split(',');
        const props = headers.slice(0, headers.length - 1);

        for (const line of lines.slice(1)) {
          const record = line.split(',');
          const values = record.slice(0, record.length - 1);
          const field = record[record.length - 1];
          if (!Object.keys(groups).includes(field)) {
            groups[field] = [];
          }
          const entries = props.map((prop, idx) => [prop, values[idx]]);
          groups[field].push(Object.fromEntries(entries));
        }

        const total = Object.values(groups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportParts.push(`Number of students: ${total}`);
        for (const [field, group] of Object.entries(groups)) {
          reportParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportParts.join('\n'));
      }
    });
  }
});

const ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const resText = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', resText.length);
      res.statusCode = 200;
      res.write(Buffer.from(resText));
    },
  },
  {
    route: '/students',
    handler(_, res) {
      const resParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          resParts.push(report);
          const resText = resParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', resText.length);
          res.statusCode = 200;
          res.write(Buffer.from(resText));
        })
        .catch((err) => {
          resParts.push(err instanceof Error ? err.message : err.toString());
          const resText = resParts.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', resText.length);
          res.statusCode = 200;
          res.write(Buffer.from(resText));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of ROUTE_HANDLERS) {
    if (routeHandler.route === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
