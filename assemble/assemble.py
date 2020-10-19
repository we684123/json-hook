import re
from pathlib import Path
import os
from os import listdir
from os.path import isfile, isdir, join

import click


@click.command()
@click.option('-i', '--input', 'input', default="./main.js", help='程式本體(main.js)，預設 "./main.js"')
@click.option('-p', '--plugins_folder', 'plugins_folder', default="./plugins", help='plugins 資料夾的位置，預設 "./plugins"')
@click.option('-a', '--annotation', 'annotation', default="// load_plugins", help='註解的名稱，預設是 "// load_plugins"')
@click.option('-n', '--new_name', 'new_name', default="main.ass.js", help='新檔案的名稱，預設是 "main.ass.js"')
@click.option('-h', '--hide_folder_name', 'hide_folder_name', default="hide", help='忽略的資料夾名稱，預設是 "hide"')
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

        # files = [f for f in listdir(plugins_folder)
        # if isfile(join(plugins_folder, f))]
        files = [f for f in plugins_folder.iterdir()
                 if f.is_file()]
        # folders = [f for f in listdir(plugins_folder)
        #            if isdir(join(plugins_folder, f))]
        folders = [f for f in plugins_folder.iterdir()
                   if f.is_dir()]
        for i in files:
            file = plugins_folder.joinpath(i)
            file_content = file.read_text(encoding='utf-8')
            # print(file_content)
            j = pattern.findall(file_content)[0]
            txts.append(file_content)
            txts.append(j)
    else:
        print('plugins folder is not exist')

    with open(input, 'r', encoding='utf-8') as f:
        main = f.read()

    if annotation in main:
        ass = '\n'.join(txts)
        ass2 = main.replace(annotation, ass)
    else:
        print('input file content have not "{0}", so i can not replace text'.format(
            annotation))

    with open(new_name, 'w', encoding='utf-8') as f:
        f.write(ass2)


if __name__ == '__main__':
    assemble()

# pf = Path(plugins_folder)
# pfgp = pf.glob('*/*.py')
# str(pfgp)
#
# fi = plugins_folder.iterdir()
# fi.
# len(fi)
# for f in os.listdir(plugins_folder):
#     print(join(plugins_folder, f))
#     print(join(plugins_folder, f).isfile())
#
# is_dir
# list(Path(plugins_folder).glob('/*'))
