# LeatnReact-reactGally
学习慕课网的视频《React实践图片画廊应用》，边看边敲打。还未添加翻转效果<br />
知识点：<br />
1.React框架的使用<br />
2.Yeoman的使用<br />
3.webpack的配置<br />
<br />
PS：由于目前的 webpack 和 React 版本和视频中不同，所以一些地方有修改<br />
    1.当前webpack中没有grunt相关配置文件，直接用 npm start 启动服务<br />
    2.loader配置文件在 cfg->difaults.js 中修改<br />
    3.生成项目时，默认用了 ES6 的写法<br />
      class AppComponent extends React.Component {}，所以需要在 constructor 中初始化 state<br />
    4.需要 require('react-dom') 进行DOM操作<br />
<br />
待解决问题：<br/>
1.不熟悉scss,暂时用css代替<br />
2.对项目进行 压缩打包发布<br />
3.CSS3的翻转原理<br/>
<br />
React文件在 src --> components --> Main.js中：<br />
React相关知识点：<br />
1.component: ImgFigure 是每个图片组件，在主组件 AppComponent 中被引入<br />
2.props: ImgFigure 的属性：<br/>
&nbsp;&nbsp;&nbsp;&nbsp; arrange: 存放状态信息，通过 arrange 设置样式styleObj<br/>
&nbsp;&nbsp;&nbsp;&nbsp; center: 存放一个图片排布函数，ImgFigure onClick 时执行。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 注:因为执行图片排布时需要 AppComponent 中的参数，所以在 AppComponent 中定义闭包函数 center(),通过 props 给 ImgFigure 消费<br/>
&nbsp;&nbsp;&nbsp;&nbsp; data: 存放图片的路径等基础信息<br/>
3.生命周期、state 、refs:<br/>
&nbsp;&nbsp;&nbsp;&nbsp; (1)初始化 state 进行渲染<br/>
&nbsp;&nbsp;&nbsp;&nbsp; (2)componentDidMount: 通过 ref 获得 DOM ，进行计算,然后通过 setState 重新渲染，排布图片<br/>
&nbsp;&nbsp;&nbsp;&nbsp; (3)点击ImgFigure，setState 重新渲染，排布图片
