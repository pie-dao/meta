import { validateIsString } from '@pie-dao/utils';

import Github from './adapters/Github';

const repo = process.env.REPO;
const token = process.env.TOKEN;

validateIsString(repo, {
  message: 'Please set environment variable REPO. Ex: REPO="pie-dao/meta" yarn branchProtection"',
});

validateIsString(token, {
  message: 'Please set environment variable TOKEN. Ex: TOKEN="<token>" yarn branchProtection"',
});

const main = async () => {
  const github = new Github(repo, token);

  console.log(await github.protectBranch('development'));
  console.log(await github.protectBranch('master'));
};

main();
