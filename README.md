[toc]

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

## Usage

```bash
Usage: saber [options] [command]
# saber-dev [options] [command] (print some logs for dev)

Options:
  -V, --version  output the version number
  -c, --clone    use git clone
  -p, --private  directly git clone from private repository, make sure you have access to the repository
  -h, --help     output usage information

Commands:
  init|i         generate a new project
  config|cfg     config .saberrc
  list|ls        list available templates
  version|v      current cli version

Usage:
  - saber init templateName projectName     create a project from a template
  - saber config set <k> <v>                set config
  - saber config set registry $registryUri  set a template registry
  - saber config get <k>                    get config[k]
  - saber config get                        get total config
  - saber config reset                      reset total config
  - saber config select-registry            select registry from config.registries
  - saber config sr                         abbreviation of "saber config select-registry"
  - saber list                              list available templates
  - saber ls                                abbreviation of "saber list"
  - saber version                           current cli version
  - saber v                                 abbreviation of "saber version"
```

You can use `saber config set registry {registrySource}` to change templates' downloading source. Then it will get template from `${registrySource}/${templateName}`

## Download template from private gitlab

If you don't want to put your template on public git platform like github, you can set the private registry source first and then use `saber init -p ${templateName} ${projectName}`. It will directly execute shell script to clone the repository from the private registry. But make sure you have access to the private repository.


## Supported templates

comming soon...

### Develop template 

The template repository should have files like below:
```
├── README.md // template description
├── meta.json // config custom field here
└── template // project template files
    └── anything you like!
```

#### meta.json

`meta.json` is where you define some magic things, which looks like this: 

```
{
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "label": "Project name"
    },
    "description": {
      "type": "string",
      "required": true,
      "label": "Project description",
      "default": "A demo project"
    },
    "author": {
      "type": "string",
      "label": "Author"
    },
    "license": {
      "type": "string",
      "label": "License",
      "default": "MIT",
      "validate": "function(answer) {var licenses = ['LGPL', 'MIT', 'GPL']; if (!licenses.includes(answer)) {return `License should be one of ${licenses}`} return true}"
    },
    "test_checkbox": {
      "type": "checkbox",
      "label": "test_checkbox",
      "choices": [
        {
          "value": "A",
          "name": "A"
        },
        {
          "checked": true,
          "value": "B",
          "name": "B"
        }
      ]
    },
    "include_filters_dir": {
      "type": "confirm",
      "label": "test_confirm"
    }
  },
  "skipInterpolation": [
    "skip/**"
  ],
  "filters": {
    "filters/**": "data.include_filters_dir === true"
  },
  "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev"
}
```
The meta option interface:

```ts
type MetaOption = {
  prompts?: MetaPrompts;// prompts to show when initializing the project
  filters?: MetaFilters; // include some files only when satisfy some condition
  skipInterpolation?: string|string[]; // files not render with meta data,just simply copy
  completeMessage?: string; // displaying message when completing (when `complete` is not defined)
  complete?: (metadata: Object) => any; // callback function when completing
}
```

##### prompts

use `prompts` field to define everything you need to know when initial the template.
the prompt interface looks like below:

```ts
type MetaPrompt = {
  type: string; // prompt type, see https://www.npmjs.com/package/inquirer
  message?: string; // tips message
  label?: string; // tips message, same as `message`
  required?: boolean; // whether be required or not
  default?: any; // default value
  when?: string; // if `when` expression value is true, then this prompt will show
  choices?: any[]; // needed when type is like 'list', 'checkbox' and so on
  validate?: string | ((...args: any[]) => boolean|string); // validate the input value
}
```

#### filters

filters interface:

```ts
type MetaFilters = {
  // propName is fileblob tell whether the file will be detect or not
  // the value is an expression return a boolean,
  // if it is false, then the file will be not be generated in the final project.
  // filename blob pattern see https://www.npmjs.com/package/minimatch
  [propName: string]: string // filenameBlob: conditionExpression
}
```

#### skipInterpolation

`skipInterpolation` tell the files which will be skiped during rendering files with [handlebarsjs](https://handlebarsjs.com/). See [multimatch](https://www.npmjs.com/package/multimatch) for match patterns.

### Render template

We use [handlebarsjs](https://handlebarsjs.com/) to render template content with meta data. So learn the [handlebarsjs](https://handlebarsjs.com/) template syntax at first.

## Develop

```
yarn link 
```