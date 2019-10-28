import * as commander from 'commander';
import * as Metalsmith from 'metalsmith';
export type Command = commander.Command

interface IActionOption {
  name: string;
  alias?: string;
  description: string;
  usages: string[];
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
  type: string; // prompt提示类型，详见https://www.npmjs.com/package/inquirer
  message?: string; // 提示文案
  label?: string; // 提示文案，同message
  required?: boolean; // 是否必填项
  default?: any; // 默认值
  when?: string; // 满足此表达式条件时才会出现该prompt提示
  choices?: any[]; // type为list时的选项
  validate?: (...args: any[]) => boolean; // 输入结果是否合法校验函数
}
export type MetaPrompts = {
  // metadata key
  [propName: string]: MetaPrompt
}

export type MetaFilters = {
  // filenameBlob: conditionExpression 
  [propName: string]: string
}

export type MetaOption = {
  prompts?: MetaPrompts;// 提示对话列表
  filters?: MetaFilters; // 需要排除的特定文件（满足特定条件时）
  skipInterpolation?: string|string[]; // 生成时需要跳过的文件blob
  completeMessage?: string; // 成功之后的提示文案 （未配置complete时）
  complete?: (metadata: Object) => any; // 成功之后的回调
}

export type MetaData = {
  destDirName: string; // 生成的项目名
  [propName: string]: any;
}

export type CallbackFunction = (...args: any[]) => any;