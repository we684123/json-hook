from pprint import pprint
import re
from pathlib import Path

import click


@click.command()
@click.option('-i', '--input', 'input',
              default="./main.js",
              help='程式本體(main.js)，預設 "./main.js"')
@click.option('-p', '--plugins_folder', 'plugins_folder',
              default="./plugins",
              help='plugins 資料夾的位置，預設 "./plugins"')
@click.option('-a', '--annotation', 'annotation',
              default="// load_plugins",
              help='註解的名稱，預設是 "// load_plugins"')
@click.option('-n', '--new_name', 'new_name',
              default="main.ass.js",
              help='新檔案的名稱，預設是 "main.ass.js"')
@click.option('-h', '--hide_folder_name', 'hide_folder_name',
              default="hide",
              help='忽略的資料夾名稱，預設是 "hide"')
def assemble(input, plugins_folder, annotation, new_name, hide_folder_name):
    # input = './assemble/main.js'
    # plugins_folder = './assemble/plugins'
    # annotation = '// load_plugins'
    # new_name = './assemble/main.ass.js'
    # hide_folder_name = 'hide'
    ph = Path(plugins_folder)
    plugins_folder = Path.cwd().joinpath(ph)
    pattern = re.compile(r'^function\ ([^{}]+)')
    txts = []
    txts.insert(0, annotation)

    if plugins_folder.exists():
        # pf = plugins_folder
        def plugins_load(pf):
            files = [f for f in pf.iterdir()
                     if f.is_file()]
            folders = [f for f in pf.iterdir()
                       if f.is_dir() and f.name != hide_folder_name]
            for i in files:
                # i = files[0]
                file = pf.joinpath(i)
                file_content = file.read_text(encoding='utf-8')

                pattern3 = re.compile(r'\.addHook\(([^\(\)]+), ([^\(\)]+)\)')
                pattern3.findall(file_content)

                b = re.search(pattern3, file_content)
                aims_name = b.group(1)
                func_name = b.group(2)

                pattern4 = re.compile(
                    r'function [^\(\)\{\}]+\(([^\(\)\{\}]+)\) +\{')
                c = re.search(pattern4, file_content)
                hook_name = c.group(1)

                a = re.sub(hook_name + r'\.addHook\(([^\(\)]+), ([^\(\)]+)\)',
                           '{0}.macthRun({1},{2},{3},{4},{5})'.format(
                               hook_name,
                               aims_name,
                               func_name,
                               'source',
                               'incoming',
                               '{0}.strict_equality'.format(hook_name)
                           ),
                           file_content
                           )
                j = pattern.findall(file_content)[0]
                txts.append(a)
                txts.append(j)

            for k in folders:
                plugins_load(k)

        plugins_load(plugins_folder)

    else:
        print('plugins folder is not exist')

    with open(input, 'r', encoding='utf-8') as f:
        main = f.read()

    if annotation in main:
        ass = '\n'.join(txts)
        ass2 = main.replace(annotation, ass)
    else:
        print([
            f'input file content have not "{annotation}"',
            ', so i can not replace text'
        ])

    with open(new_name, 'w', encoding='utf-8') as f:
        f.write(ass2)


if __name__ == '__main__':
    assemble()
