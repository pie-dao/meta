import run from '../utils/run';

export default (branchName) => run([
  'cd tmp/repo',
  `git checkout -b ${branchName}`,
]);
