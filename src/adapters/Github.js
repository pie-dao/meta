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

  async getHooks() {
    const { baseUrl, repo, token } = this;

    const url = `${baseUrl}/repos/${repo}/hooks`;
    const headers = { Authorization: `token ${token}` };

    const response = await fetch(url, { headers });
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
