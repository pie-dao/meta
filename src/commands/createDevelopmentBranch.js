import run from '../utils/run';

export default () => run([
  'cd tmp/repo',
  'if [ "`git branch -r | grep \'origin/development\'`" ]',
  'then echo "nothing to do"',
  'else git checkout -b development',
  'git push -u origin development',
  'fi',
]);
