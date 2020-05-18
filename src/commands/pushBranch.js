import run from '../utils/run';

export default (branchName) => run([
  'cd tmp/repo',
  `git push -u origin ${branchName}`,
]);
