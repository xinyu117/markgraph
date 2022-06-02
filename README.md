# markgraph
visualize your markdown documents as graph


## 参照的开源项目

[将markdown中的head生成mindmap](https://github.com/dundalek/markmap)https://github.com/jonschlinkert/remarkable

[依赖以上项目，将markdown生成mindmap](https://github.com/gera2ld/markmap)，使用lerna.

[markdown文档解析库](https://github.com/jonschlinkert/remarkable)

[用keyValueDB存储graph数据](https://github.com/levelgraph/levelgraph)

[图表库](https://github.com/antvis/G6)


## remarkable的插件

[自定义tags的解析渲染](https://github.com/bytesnz/remarkably-simple-tags)

[扩展remarkable原有的link](https://github.com/samiahmedsiddiqui/remarkable-external-link)

[只解析tag，并把解析的结果作为md的属性返回](https://github.com/eugeneware/remarkable-meta)


## 其他

1. 回车换行符是如何解决：
    - .editorconfig文件中end_of_line = lf -> end_of_line = crlf
    - 执行npm run lint  --fix

2. 入口： npm run cli_debug note.md


3. 如何解决不能push代码到github:
    - [用github生成token,添加到远程仓库的连接中](https://blog.csdn.net/wujihua118/article/details/119804627)
    - 本仓库的连接： git remote set-url origin https://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@github.com/xinyu117/markgraph.git