import run from '../utils/run';

export default () => run([
  'cd tmp/repo',
  'mkdir -p .github',
  'yarn add -D eslint@6.8.0 eslint-config-airbnb-base@14.1.0 eslint-plugin-import@2.20.2',
  'rm -v .eslintrc .eslintrc.js',
  'cp -v ../../config/eslint/es6.eslint.js .eslintrc.js',
  'mkdir -p .github/workflows/',
  'cp -v ../../github/workflows/eslint.yml .github/workflows/',
  'sed -i "s/\\"scripts\\": {/\\"scripts\\": {\\n'
    + '    \\"lint\\": \\"npx eslint src\\/*.js src\\/**\\/*.js\\",\\n'
    + '    \\"prerelease\\": \\"yarn lint\\",\\n'
    + '    \\"release\\": \\"npm publish --access=public\\",'
    + '/" package.json',
]);
