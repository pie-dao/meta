import run from '../utils/run';

export default () => run([
  'cd tmp/repo',
  'mkdir -p .github/workflows/',
  'cp -v ../../github/workflows/eslint.yml .github/workflows/',
]);
