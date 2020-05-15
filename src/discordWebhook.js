import fetch from 'node-fetch';

import { validateIsString } from '@pie-dao/utils';

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
  let url = `https://api.github.com/repos/${repo}/hooks`;
  const headers = { Authorization: `token ${token}` };

  const response1 = await fetch(url, { headers });
  const hooks = await response1.json();

  let method = 'POST';

  hooks.forEach((hook) => {
    if (hook.config.url === webhook) {
      method = 'PATCH';
      url = `${url}/${hook.id}`;
    }
  });

  const body = JSON.stringify({
    active: true,
    config: { url: webhook, content_type: 'json' },
    events: ['*'],
    name: 'web',
  });

  console.log(method, url);
  const response2 = await fetch(url, { body, headers, method });
  console.log(await response2.json());
};

main();
