import run from '../utils/run';

export default () => run([
  'cd tmp/repo',
  'git checkout -b development',
  'git push -u origin development',
]);
