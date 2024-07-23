process.stdout.write('Welcome to Holberton School, what is your name?\n');
process.stdin.on('readable', () => {
  const nm = process.stdin.read();
  if (nm !== null) {
    process.stdout.write(`Your name is: ${nm}`);
  }
});
process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});
