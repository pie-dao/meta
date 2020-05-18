import { validateIsString } from '@pie-dao/utils';

import Github from './adapters/Github';

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
  console.log(await github.createOrUpdateHook(webhook));
};

main();
