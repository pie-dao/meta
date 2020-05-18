import run from '../utils/run';

export default async (branchName) => run([
  'cd tmp/repo',
  `if [ "\`git branch -r | grep 'origin/${branchName}'\`" ]`,
  `then git checkout ${branchName}`,
  `else git checkout -b ${branchName}`,
  'fi',
]);
