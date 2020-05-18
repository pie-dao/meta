import { exec } from 'child_process';

const run = (commands) => new Promise((resolve) => {
  console.log('Running:\n----');
  commands.forEach((command) => {
    console.log(command);
  });

  console.log('----');

  exec(commands.join(';'), (error, stdout, stderr) => {
    if (error) {
      console.log(`ERROR\n----\n${error.message}`);
      resolve();
      return;
    }
    if (stderr) {
      console.log(`ERROR\n----\n${stderr}`);
      resolve();
      return;
    }
    console.log(`RESULT\n----\n${stdout}`);
    resolve();
  });
});

export default run;
