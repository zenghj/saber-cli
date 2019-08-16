# saber-cli

Saber-cli is a project scaffold tool used to scaffold your project based on [saber-cli-templates](https://github.com/saber-cli-templates).

## Install

```bash
# install saber-cli
yarn global add @zenghj/saber-cli
```

## Create a Project

```bash
# create a new project based on specific template
saber init templateName projectName
```

Usage: saber [options] [command]

## Other

```bash
Usage: saber [options] [command]

Options:
  -V, --version  output the version number
  -c, --clone    use git clone
  -h, --help     output usage information

Commands:
  init           generate a new project
  config|cfg     config .saberrc

Usage:
  - saber init templateName projectName
  - saber config set <k> <v> # set config
  - saber config get <k>
  - saber config get # show all config
  - saber config reset # reset config
```

You can use `saber config set registry {registrySource}` to change templates' downloading source.

## Supported templates

comming soon...
