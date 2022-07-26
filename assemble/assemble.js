#!/usr/bin/env node
var fs = require("fs");
const path = require("path");

const prettier = require("prettier");
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

// console.log(`optsKeys: ${Object.keys(program.opts())}`);
// console.log(`optsValues: ${Object.values(program.opts())}`);

function list_tree_to_do(dir, new_opts, mode, txts) {
  var arr = fs.readdirSync(dir);
  arr.forEach(function(item) {
    var fullpath = path.join(dir, item);
    var stats = fs.statSync(fullpath);
    if (stats.isDirectory()) {
      // 不是"隱藏內容"的資料夾名稱就遞迴
      if (fullpath.split(path.sep).pop() != new_opts.hide_folder_name) {
        list_tree_to_do(fullpath, new_opts, mode, txts);
      }
    } else {
      // 是檔案就處理
      const data_str = fs.readFileSync(fullpath, "utf-8").toString();
      if (mode == "functions") {
        // 處理 functions
        txts.push(data_str); // 寫入完整的 function 函式
      } else if (mode == "plugins") {
        // 處理 plugins
        const re_plugins = new RegExp("^function ([^{}]+)", "g");
        txts.push(data_str); // 寫入完整的 plugin 函式
        txts.push(re_plugins.exec(data_str)[1]); // 再寫入 plugin 函式的名稱來達成自動載入
      }
    }
  });
  return txts;
}

function assemble(new_opts) {
  // 讀取被組合的 main 程式
  const main_code = fs.readFileSync(new_opts.input_file_path).toString();
  var new_main_code = "";
  var changed = false;

  // 組合 functions
  if (main_code.includes(new_opts.alf)) {
    var txts_for_functions = [];
    txts_for_functions = list_tree_to_do(
      new_opts.functions_folder,
      new_opts,
      "functions",
      txts_for_functions
    );

    let ass = txts_for_functions.join("\n");
    new_main_code = main_code.replace(new_opts.alf, ass);
    changed = true;
  } else {
    console.log(
      `input file content have not ${new_opts.alf}, so i can not replace.`
    );
  }

  // 組合 plugins
  if (main_code.includes(new_opts.alp)) {
    var txts_for_plugins = [];
    txts_for_plugins = list_tree_to_do(
      new_opts.plugins_folder,
      new_opts,
      "plugins",
      txts_for_plugins
    );

    let ass = txts_for_plugins.join("\n");
    new_main_code = main_code.replace(new_opts.alp, ass);
    changed = true;
  } else {
    console.log(
      "\x1B[33m%s\x1B[0m",
      `input file content have not ${new_opts.alp}, so i can not replace.`
    );
  }

  // 如果有成功組合就，註解掉 loadNodejsPlugin、loadGoogleAppsScriptPlugin
  // 然後輸出檔案
  if (changed) {
    // 處理註解
    const annotation = "// ↓ annotation by assemble.js";
    const re_loadNodejsPlugin = RegExp(
      "(^[^.\n]+.loadNodejsPlugin[^\n]+)",
      "gm"
    );
    const re_loadGoogleAppsScriptPlugin = RegExp(
      "(^[^.\n]+.loadGoogleAppsScriptPlugin[^\n]+)",
      "gm"
    );
    new_main_code = new_main_code.replace(
      re_loadNodejsPlugin,
      `${annotation}\n// $1`
    );
    new_main_code = new_main_code.replace(
      re_loadGoogleAppsScriptPlugin,
      `${annotation}\n// $1`
    );

    // 格式化 code
    new_main_code = prettier.format(new_main_code, {
      semi: false,
      parser: "babel"
    });

    fs.writeFile(new_opts.output_file_path, new_main_code, function(err) {
      if (err) console.log(err);
      else console.log("\x1B[36m%s\x1B[0m", "assemble done.");
    });
  }
}

function assemble_CLI() {
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

  const new_opts = {
    input: input,
    output: output,
    plugins_folder: plugins_folder,
    functions_folder: functions_folder,
    alp: alp,
    alf: alf,
    hide_folder_name: hide_folder_name,
    input_file_path: input_file_path,
    output_file_path: output_file_path,
    input_plugins_folder_path: input_plugins_folder_path,
    input_functions_folder_path: input_functions_folder_path
  };
  console.log("\x1B[36m%s\x1B[0m", "【info】new_opts：");
  console.log(new_opts);

  // 開始組合
  assemble(new_opts);
}
assemble_CLI();

//
