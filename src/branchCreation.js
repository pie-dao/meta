import { validateIsString } from '@pie-dao/utils';

import cloneRepo from './commands/cloneRepo';
import createDevelopmentBranch from './commands/createDevelopmentBranch';
import deleteRepo from './commands/deleteRepo';
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
  await cloneRepo(repo);
  await createDevelopmentBranch();
  await deleteRepo();

  const github = new Github(repo, token);

  console.log(await github.setDefaultBranch('development'));
};

main();
