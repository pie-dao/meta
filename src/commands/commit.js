import run from '../utils/run';

export default (message) => run([
  'cd tmp/repo',
  'git add .',
  `git commit -m "${message}"`,
]);
