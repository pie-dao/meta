import run from '../utils/run';

export default () => run([
  'cd tmp/repo',
  'mkdir -p .github',
  'cp -rfv ../../github/templates/* .github',
]);
