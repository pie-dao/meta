import { terminal } from 'terminal-kit';

export default async (repo) => {
  terminal.bold(`What type of project is ${repo}?`);

  return new Promise((resolve) => {
    terminal.singleColumnMenu([
      'ES6 Library',
      'React Component',
      'Eslint has already been configured',
    ], {}, (err, response) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }

      resolve(response);
    });
  });
};
