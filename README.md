# Saber-cli

Saber-cli is a project scaffold management tool used to scaffold your project based on specific template sources. The default registry is [saber-cli-templates](https://github.com/saber-cli-templates). And you can switch to your personal template registry source.That's really awesome!

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

## Usage

```bash
Usage: saber [options] [command]

Options:
  -V, --version  output the version number
  -c, --clone    use git clone
  -p, --private  directly git clone from private repository, make sure you have access to the repository
  -h, --help     output usage information

Commands:
  init|i         generate a new project
  config|cfg     config .saberrc

Usage:
  - saber init templateName projectName
  - saber config set <k> <v>
  - saber config get <k>
  - saber config get
  - saber config reset
```
You can use `saber config set registry {registrySource}` to change templates' downloading source. Then it will get template from `${registrySource}/${templateName}`

## Download template from private gitlab

If you don't want to put your template on public git platform like github, you can set the private registry source first and then use `saber init -p ${templateName} ${projectName}`. It will directly clone the repository from the registry with. But make sure you have access to the private repository.


## Supported templates

comming soon...

### About templates
You can custom your template files with prompt result using [handlebarsjs](https://handlebarsjs.com/) syntax.

## Develop

```
yarn link 
```