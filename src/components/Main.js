require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let ReactDOM = require('react-dom');

// let yeomanImage = require('../images/yeoman.png');
let imageDatas = require('../data/imageDatas.json');

//获取图片路径,自执行函数
imageDatas = (function getImageURL(imageDatasArr) {
    for(let i=0; i<imageDatasArr.length; i++){
        imageDatasArr[i].imageURL = require('../images/' + imageDatasArr[i].fileName);
    }
    return imageDatasArr;
})(imageDatas);



//获取区间内的一个随机值
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

//获取(-30---30)的一个随机数
function get30DegRandom() {
    return (Math.random() > 0.5 ? '+' : '-') + (Math.ceil(Math.random() * 30));
}



let ImgFigure = React.createClass({


    //imgFigure的点击处理函数
    handleClick: function(e){

        // this.props.inverse();

        if(!this.props.arrange.isCenter){
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    },


    render: function () {


        let styleObj = {};

        //如果props属性中指定了这张图片的位置,则使用
        if(this.props.arrange.pos){
            styleObj = this.props.arrange.pos;
        }

        //如果图片旋转角度有值且不为0, 添加角度
        if(this.props.arrange.rotate){
            (['-moz-','-ms-','-webkit-','']).forEach(function (value, index) {
                styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }

        if(this.props.arrange.isCenter){
            styleObj.zIndex = 11;
        }


        let imgFigureClassName = 'img-figure';
        // imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
});

class AppComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            imgsArrangeArr: [
            // {
            //   pos: {
            //     left: '0',
            //     top:'0'
            //   }
            //   rotate: 0   //旋转角度
            //   isInverse: false //图片正反面
            //   isCenter: false  //图片是否居中
            // }
            ]
        }
    }

    Constant = {
        centerPos: {
            left: 0,
            right: 0
        },
        hRosRange: {    //水平方向取值范围
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        vPosRange: {    //垂直方向的取值范围
            x: [0, 0],
            topY: [0, 0]
        }
    };




    /*
    * 利用rearrange函数, 居中对应index的图片
    * @param index, 需要被居中的图片对应信息数组的index值
    * @return {function}
    * */
    center = function(index){
      return function () {
        this.rearrange(index);
      }.bind(this);
    }

    /*
    * 翻转图片
    * @param index 输入当前被执行inverse操作的图片对应的图片信息数组的index值
    * @return {function} 这是一个闭包函数, 其内return一个正真待被执行的函数
    * */
    // inverse = function (index) {
    //
    //   return function () {
    //     let imgsArrangeArr = this.state.imgsArrangeArr;
    //
    //     imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
    //
    //     this.setState({
    //       imgsArrangeArr: imgsArrangeArr
    //     });
    //   }.bind(this);
    // }



    //用于布局图片
    //centerIndex 是被指定居中的图片
    rearrange = function (centerIndex) {
        let imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hRosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.ceil(Math.random() * 2),   //上面只排一个或0个
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        //首先居中 centerIndex 的图片,居中的 centerIndex 的图片不需要旋转
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter:true
        }


        //取出要布局上侧图片的状态信息
        let topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        });


        //布局位于左右两侧的图片
        for(let i=0, j = imgsArrangeArr.length / 2; i<imgsArrangeArr.length; i++){

            let hPosRangeLORX = null;

            //前半部分布局左边,有半部分布局右边
            if(i < j){
                hPosRangeLORX = hPosRangeLeftSecX;
            }else{
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        }


        //把拿出来的元素放回数组
        if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);


        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });


    };

    //组件加载后,为每张图片计算其位置的范围
    componentDidMount(){

        //拿到舞台的大小
        let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        //拿到一个imageFigure的大小
        let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        //计算中心图片的位置点
        this.Constant.centerPos = {
          left: halfStageW - halfImgW,
          top: halfStageH - halfImgH
        }

        //计算左右和上侧区域图片排布位置取值范围
        this.Constant.hRosRange.leftSecX[0] = -halfImgW;
        this.Constant.hRosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hRosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hRosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hRosRange.y[0] = -halfImgH;
        this.Constant.hRosRange.y[1] = stageH - halfImgH;

        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

        this.rearrange(0);
    };

    render() {

        let imgFigures = [];

        imageDatas.forEach(function (value, index) {

            if(!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isCenter: false
                    // isInverse: false
                }
            }

            imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]}
            center={this.center(index)}/>);
        }.bind(this));

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
            </section>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
