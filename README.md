# vue练习

## 实现 app.vue 组件中的功能
1. 顶部 Header 使用的是 MintUI 中的Header
2. 底部 Topbar 使用的是 Mui 中的 Topbar.html
3. 添加顶部的返回键为 router-link为span watch进行监听路由改变实现首页隐藏
4. 底部图标高亮通过添加路由 linkActiveClass 为 mui-active
## 实现 home.vue 的功能
1. 使用 MintUI 的 Swipe 组件实现轮播图效果
2. 实现 ajax 从服务器获取最新图片的json数据，然后解析渲染
3. 改造九宫格的样式，取消默认的背景颜色和边线
## 实现 NewList.vue, NewValue.vue 的功能以及 抽离 Comment 评论组件
1. NewList 分页从服务器获取数据，然后渲染为一个列表
2. 在点击了新闻的时候通过路由将新闻的id传输给 NewValue.vue 这个组件来加载新闻详细以及新闻的评论
3. 存在的 BUG 发表评论返回的json数据为空
## 实现 Photo.vue
1. 使用 mui 的 scroll 组件的时候，添加 js 功能需要在 VUe 的mounted中执行
2. Chrome 新版会出现警告信息 添加 *{touch-action: pay-y} 可以取消警告消息
3. 使用滑动组件的时候会出现底部Tab无法点击的效果，替换原先的 tab-item class类 复制原先的 style样式可以解决这个问题
4. 使用了vue-photo-preview 实现图片的预览功能
## 实现 shop.vue 抽离numbox.vue 添加商品数量组件
1. 实现了小球动画 v-show 实现半场动画
2. 使用mui 中的number-box实现添加商品数量 并用setOption设置商品可够最大值
3. 实现经典的两列布局
## 实现 cart.vue
1. 学习使用Vuex保存共享加入购物车的商品信息并将商品信息存入本地通过 getters计算提取数据 mutations修改数据
2. 实现购物车上的数字与商品购买数量一致
## 建立新项目
1. 创建.gitiginore 忽略文件
2. readme.md
3. 放入开源协议
4. git init 初始化一下创建本地窗口
5. git staus 显示文件状态 git add. 添加项目跟踪
6. git commit -m "init my project"提交到本地git

