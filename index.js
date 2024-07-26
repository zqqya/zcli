#! /usr/bin/env node
import fs from 'fs-extra'

import { input } from '@inquirer/prompts';
import path from 'path'
import { fileURLToPath } from 'node:url';

const answer = await input({ message: '请输入项目名(默认my-app)' });
import ora from 'ora';
const spinner = ora('Loading').start();
const projectName = answer || 'my-app'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 模版文件目录
const templateUrl = path.join(__dirname, 'templates');
// 生成文件目录
// process.cwd() 对应控制台所在目录
const cwdUrl = process.cwd();
const targetUrl = path.join(cwdUrl, projectName);
try {
  await fs.copy(templateUrl, targetUrl)
  spinner.stop()
  console.info('创建成功，请执行以下命令开始你的开发吧')
  console.info(`cd ${projectName} && npm i && npm run dev`)
} catch (err) {
  spinner.stop()
  // console.log(symbols.error, chalk.red(``))
  process.exit()
}
