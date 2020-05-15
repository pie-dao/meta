import fetch from 'node-fetch';

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
  const url1 = `https://api.github.com/repos/${repo}/branches/master/protection`;
  const url2 = `https://api.github.com/repos/${repo}/branches/development/protection`;
  const headers = {
    Accept: 'application/vnd.github.luke-cage-preview+json',
    Authorization: `token ${token}`,
  };
  const method = 'PUT';
  const body = JSON.stringify({
    allow_deletions: false,
    allow_force_pushes: false,
    enforce_admins: true,
    required_linear_history: true,
    required_pull_request_reviews: {
      dismiss_stale_reviews: true,
      required_approving_review_count: 1,
      require_code_owner_reviews: false,
    },
    required_status_checks: {
      contexts: [],
      strict: true,
    },
    restrictions: {
      apps: [],
      teams: [],
      users: [],
    },
  });

  const response1 = await fetch(url1, { body, headers, method });
  console.log(url1, await response1.json());
  const response2 = await fetch(url2, { body, headers, method });
  console.log(url2, await response2.json());
};

main();
