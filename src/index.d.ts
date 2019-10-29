import * as commander from 'commander';
import * as Metalsmith from 'metalsmith';
export type Command = commander.Command

interface IActionOption {
  name: string;
  alias?: string;
  description: string;
  usages: string[][];
}

interface ActionMethod {
  (program: Command, ...rest: any[]): Promise<any>;
}

type MetalSmithFile = {
  contents: Buffer;
  [propName: string]: any
}
type MetalSmithFiles = {
  // filename: MetalSmithFileObj
  [propName: string]: MetalSmithFile
}

export type MetalSmithPlugin = (files: MetalSmithFiles, metalsmith: Metalsmith, callback) => any;

export type MetaPrompt = {
  type: string; // prompt type, see https://www.npmjs.com/package/inquirer
  message?: string; // tips message
  label?: string; // tips message, same as `message`
  required?: boolean; // whether be required or not
  default?: any; // default value
  when?: string; // if `when` expression value is true, then this prompt will show
  choices?: any[]; // needed when type is like 'list', 'checkbox' and so on
  validate?: string | ((...args: any[]) => boolean|string); // validate the input value
}
export type MetaPrompts = {
  // metadata key
  [propName: string]: MetaPrompt
}

export type MetaFilters = {
  // propName is fileblob tell whether the file will be detect or not
  // the value is an expression return a boolean,
  // if it is false, then the file will be not be generated in the final project.
  // filename blob pattern see https://www.npmjs.com/package/minimatch
  [propName: string]: string // filenameBlob: conditionExpression
}

export type MetaOption = {
  prompts?: MetaPrompts;// prompts to show when initializing the project 
  filters?: MetaFilters; // include some files only when satisfy some condition
  skipInterpolation?: string|string[]; // files not render with meta data,just simply copy
  completeMessage?: string; // displaying message when completing (when `complete` is not defined)
  complete?: (metadata: Object) => any; // callback function when completing
}

export type MetaData = {
  destDirName: string; // generated project name
  [propName: string]: any;
}

export type CallbackFunction = (...args: any[]) => any;