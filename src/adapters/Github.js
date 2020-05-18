import fetch from 'node-fetch';

export default class Github {
  constructor(repo, token) {
    this.baseUrl = 'https://api.github.com';
    this.repo = repo;
    this.token = token;

    this.getHooks = this.getHooks.bind(this);
  }

  async createOrUpdateHook(webhook) {
    const {
      baseUrl,
      getHooks,
      repo,
      token,
    } = this;
    const headers = { Authorization: `token ${token}` };
    const hooks = await getHooks();

    let method = 'POST';
    let url = `${baseUrl}/repos/${repo}/hooks`;

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

    const response = await fetch(url, { body, headers, method });
    return response.json();
  }

  async createPullRequest({ branch, bodyMessage, title }) {
    const { baseUrl, repo, token } = this;

    const url = `${baseUrl}/repos/${repo}/pulls`;
    const headers = { Authorization: `token ${token}` };
    const method = 'POST';
    const body = JSON.stringify({
      title,
      base: 'development',
      body: bodyMessage,
      head: branch,
    });

    const response = await fetch(url, { body, headers, method });
    return response.json();
  }

  async getHooks() {
    const { baseUrl, repo, token } = this;

    const url = `${baseUrl}/repos/${repo}/hooks`;
    const headers = { Authorization: `token ${token}` };

    const response = await fetch(url, { headers });
    return response.json();
  }

  async protectBranch(branchName) {
    const { baseUrl, repo, token } = this;

    const url = `${baseUrl}/repos/${repo}/branches/${branchName}/protection`;
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

    const response = await fetch(url, { body, headers, method });
    return response.json();
  }

  async setDefaultBranch(branchName) {
    const { baseUrl, repo, token } = this;

    const url = `${baseUrl}/repos/${repo}`;
    const headers = { Authorization: `token ${token}` };
    const method = 'PATCH';
    const body = JSON.stringify({ default_branch: branchName });

    const response = await fetch(url, { body, headers, method });
    return response.json();
  }
}
