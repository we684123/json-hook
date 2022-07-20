#!/usr/bin/env node
const path = require("path");
const commander = require("commander");

const program = new commander.Command();
program
  .version("0.0.1")
  .option(
    "-i, --input <type>",
    '程式本體(main.js)，預設 "./main.js"',
    "./main.js"
  )
  .option(
    "-o, --output <type>",
    '新檔案的名稱，預設是 "main.ass.js"',
    "main.ass.js"
  )
  .option(
    "-p, --plugins_folder <type>",
    'plugins 資料夾的位置，預設 "./plugins"',
    "./plugins"
  )
  .option(
    "-f, --functions_folder <type>",
    'functions 資料夾的位置，預設 "./functions"',
    "./functions"
  )
  .option(
    "-alp, --annotation_load_plugins <type>",
    '註解的名稱，預設是 "// load_plugins"',
    "// load_plugins"
  )
  .option(
    "-alf, --annotation_load_functions <type>",
    '註解的名稱，預設是 "// load_functions"',
    "// load_functions"
  )
  .option(
    "-h, --hide_folder_name <type>",
    '忽略的資料夾名稱，預設是 "hide"',
    "hide"
  )
  .parse(process.argv);

console.log(`optsKeys: ${Object.keys(program.opts())}`);
console.log(`optsValues: ${Object.values(program.opts())}`);

function assemble() {
  const opts = program.opts();

  // 用這種方式處理輸入，配合 Hydrogen 開發較順手
  const input = opts.input ?? "./main.js";
  const output = opts.output ?? "./main.ass.js";

  const plugins_folder = opts.plugins_folder ?? "./plugins";
  const functions_folder = opts.functions_folder ?? "./functions";

  const alp = opts.annotation_load_plugins ?? "// load_plugins";
  const alf = opts.annotation_load_functions ?? "// load_functions";

  const hide_folder_name = opts.hide_folder_name ?? "hide";

  // 處理路徑
  const input_file_path = path.join(process.cwd(), input);
  const output_file_path = path.join(process.cwd(), output);

  const input_plugins_folder_path = path.join(process.cwd(), plugins_folder);
  const input_functions_folder_path = path.join(
    process.cwd(),
    functions_folder
  );

  // 開始組合

}
assemble();

//
