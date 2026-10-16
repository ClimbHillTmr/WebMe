# WebMe

一个用于展示研究方向、学术论文与科研项目的静态学术主页。采用受 Claude 启发的暖米白与陶土橙配色，兼顾清晰阅读、移动端适配和简便维护。

## 主要功能

- **研究方向**：介绍智能传感、半导体工艺建模、临床机器学习与智能微流控等研究领域。
- **学术论文**：展示论文题目、期刊、发表年份与 DOI，支持关键词搜索和主题筛选。
- **引用工具**：支持查看、复制及下载 BibTeX 引用。
- **近期项目**：展示科研软件、物理仿真与实验平台项目，提供代码链接或项目说明。
- **中英文切换**：支持中文和英文界面。
- **响应式布局**：适配桌面、平板及手机，支持键盘操作与减少动态效果的系统偏好。

## 技术实现

使用原生 HTML、CSS 和 JavaScript，无需安装前端依赖或运行构建工具。网页内容通过源码维护，适合部署在 GitHub Pages 等静态托管平台。

## 文件结构

| 文件 | 用途 |
| --- | --- |
| `docs/index.html` | 主页结构、研究方向、论文及项目内容 |
| `docs/styles.css` | 配色、排版和响应式样式 |
| `docs/app.js` | 语言切换、搜索筛选、弹窗和引用复制 |
| `docs/citations.js` | 页面使用的 BibTeX 引用数据 |
| `docs/publications.bib` | 可下载的引用文件 |
| `docs/favicon.svg` | 网站图标 |
| `deploy.sh` | GitHub 仓库上传与 Pages 配置脚本 |

## 本地预览

直接打开 `docs/index.html`，或在项目根目录运行：

```bash
python3 -m http.server 4173 --directory docs
```

随后访问 http://localhost:4173。

## 部署到 GitHub Pages

在仓库的 **Settings → Pages** 中设置：

1. Source：**Deploy from a branch**。
2. Branch：**main**。
3. Folder：**/docs**。
4. 点击 **Save** 并等待部署完成。

部署成功后的访问地址：https://climbhilltmr.github.io/WebMe/

也可以在 GitHub CLI 已登录、网络可用且具备仓库写入及 Pages 管理权限时运行 `bash deploy.sh`。该脚本针对当前仓库配置，不执行强制推送。

## 内容维护

修改 `docs/index.html` 更新研究方向、论文及项目。新增或调整论文时，同步维护 `docs/citations.js` 和 `docs/publications.bib`。提交到已配置的 Pages 发布分支后，GitHub 会重新部署网站。

论文条目链接至对应出版来源，在研项目与已发表成果分别标注。
