import { validateIsString } from '@pie-dao/utils';

import checkoutBranch from './commands/checkoutBranch';
import cloneRepo from './commands/cloneRepo';
import commit from './commands/commit';
import copyES6Linting from './commands/copyES6Linting';
import copyLintingWorkflow from './commands/copyLintingWorkflow';
import copyReactLinting from './commands/copyReactLinting';
import copyTemplates from './commands/copyTemplates';
import createDevelopmentBranch from './commands/createDevelopmentBranch';
import deleteRepo from './commands/deleteRepo';
import Github from './adapters/Github';
import lintingMenu from './menus/lintingMenu';
import pushBranch from './commands/pushBranch';

const repo = process.env.REPO;
const token = process.env.TOKEN;
const webhook = process.env.WEBHOOK;

validateIsString(repo, {
  message: 'Please set environment variable REPO. Ex: REPO="pie-dao/meta" yarn branchProtection"',
});

validateIsString(token, {
  message: 'Please set environment variable TOKEN. Ex: TOKEN="<token>" yarn branchProtection"',
});

validateIsString(webhook, {
  message: 'Please set environment variable WEBHOOK. '
    + 'Ex: WEBHOOK="https://discordapp.com/api/webhooks/..." yarn discordWebhook"',
});

const main = async () => {
  const github = new Github(repo, token);

  const { selectedIndex } = await lintingMenu(repo);

  await cloneRepo(repo);
  await createDevelopmentBranch();

  console.log('Setting default branch to development');
  await github.setDefaultBranch('development');

  await checkoutBranch('development');
  const branch = `setup-${Date.now()}`;
  await checkoutBranch(branch);

  await copyTemplates();
  await commit('update Github templates');

  console.log('Protecting development branch');
  await github.protectBranch('development');

  console.log('Protecting master branch');
  await github.protectBranch('master');

  console.log('Creating Discord webhook');
  await github.createOrUpdateHook(webhook);

  if (selectedIndex === 0) {
    await copyES6Linting();
    await commit('add ES6 linting configuration');
  }

  if (selectedIndex === 1) {
    await copyReactLinting();
    await commit('add React linting configuration');
  }

  await copyLintingWorkflow();
  await commit('add linting workflow');

  await pushBranch(branch);

  const bodyMessage = 'Creates all the setup stuff. PR generated by pie-dao/meta repo.';

  console.log(`Creating PR: ${bodyMessage}`);

  await github.createPullRequest({
    bodyMessage,
    branch,
    title: 'Repo setup by @pie-dao/meta',
  });

  await deleteRepo();

  process.exit(0);
};

main();