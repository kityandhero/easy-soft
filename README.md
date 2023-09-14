# Easy Soft Front Tools

This project is a repackaging of [Taro](https://taro-docs.jd.com/) to quickly build an interface for back-end management projects. Follow is the quick guide for how to use.

## Environment Prepare

setp 1: Install global tools:

```bash
npm: npm install -g husky rimraf pnpm
```

or

```bash
cnpm: cnpm install -g husky rimraf pnpm
```

or

```bash
yarn: yarn add -g husky rimraf pnpm
```

setp 2: Install dependencies `node_modules`:

```bash
pnpm install
```

## Provided Scripts

Taro Fast Framework provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Build Framework And Start The Weapp Sample Project

```bash
npm run start:weapp:build
```

### Start The Sample Project Only

```bash
npm run start:weapp:simple

(Ensure that the build is executed at least once)
```

Wait for execution to complete, you can open wechat development tool to view.

### Build Framework

```bash
npm run build:all
```

### Project template

Here repo is a template to quickly create a project.

<https://github.com/kityandhero/easy-soft-template>

The other way is use easy-soft-cli to initialize a project, it will download file from easy-soft-template repo.

```bash
npm install -g easy-soft-cli

easy-soft-cli init
```

If framework have a new version update, can use a script to upgrade project, the script in package.json, it running through easy-soft-cli.

```bash
npm run reinstall
```

The script content is "npm run clean && easy-soft-cli env && pnpm install".

If you need a agent to visit github, you can use this way.

```bash
npm run reinstall:agent
```

The script content is "npm run clean && easy-soft-cli env --agent <http://127.0.0.1:7890> && pnpm install".

## More

welcome any feedback in our [github](https://github.com/kityandhero/easy-soft-utility).

## Credits

Many thanks to the following individuals, organisations and projects whose work is so important to the success of Taro Fast Framework (in no particular order):

- Rollup
- Lodash
- ...

More dependencies are not listed, thanks all of them.
