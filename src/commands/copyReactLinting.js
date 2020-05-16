import run from '../utils/run';

export default () => run([
  'cd tmp/repo',
  'yarn add -D eslint@6.8.0 eslint-config-airbnb@18.1.0 eslint-plugin-import@2.20.2',
  'yarn add -D eslint-plugin-jsx-a11y@6.2.3 eslint-plugin-react@7.19.0 ',
  'yarn add -D eslint-plugin-react-hooks@2.5.1',
  'rm -v .eslintrc .eslintrc.js',
  'cp -v ../../config/eslint/react.eslint.js .eslintrc.js',
  'mkdir -p .github/workflows/',
  'cp -v ../../github/workflows/eslint.yml .github/workflows/',
  'sed -i "s/\\"scripts\\": {/\\"scripts\\": {\\n'
    + '    \\"lint\\": \\"npx eslint src\\/*.js src\\/**\\/*.js\\",\\n'
    + '    \\"prerelease\\": \\"yarn lint\\",\\n'
    + '    \\"release\\": \\"npm publish --access=public\\",\\n'
    + '/" package.json',
]);
