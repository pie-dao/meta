import fetch from 'node-fetch';

import { exec } from 'child_process';
import { validateIsString } from '@pie-dao/utils';

const repo = process.env.REPO;
const token = process.env.TOKEN;

validateIsString(repo, {
  message: 'Please set environment variable REPO. Ex: REPO="pie-dao/meta" yarn branchProtection"',
});

validateIsString(token, {
  message: 'Please set environment variable TOKEN. Ex: TOKEN="<token>" yarn branchProtection"',
});

const main = async () => {
  const commands = [
    'mkdir -p tmp',
    'cd tmp',
    `git clone git@github.com:${repo} repo`,
    'cd repo',
    'git checkout -b development',
    'git push -u origin development',
    'cd ../',
    'rm -rf repo',
  ];

  await new Promise((resolve, reject) => {
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

  const url = `https://api.github.com/repos/${repo}`;
  const headers = { 'Authorization': `token ${token}` };
  const method = 'PATCH';
  const body = JSON.stringify({ default_branch: 'development' });

  const response = await fetch(url, { body, headers, method });
  console.log(url, await response.json());
};

main();