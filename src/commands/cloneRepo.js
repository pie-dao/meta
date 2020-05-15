import run from '../utils/run';

export default (repo) => run([
  'mkdir -p tmp',
  'cd tmp',
  `git clone git@github.com:${repo} repo`,
]);
