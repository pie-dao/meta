import { exec } from 'child_process';

const run = (commands) => new Promise((resolve) => {
  console.log('Running:\n');
  commands.forEach((command) => {
    console.log(command);
  });

  exec(commands.join(';'), (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      resolve();
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      resolve();
      return;
    }
    console.log(`stdout: ${stdout}`);
    resolve();
  });
});

export default run;
