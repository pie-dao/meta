import fetch from 'node-fetch';

export default class Github {
  constructor(repo, token) {
    this.baseUrl = 'https://api.github.com';
    this.repo = repo;
    this.token = token;
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
