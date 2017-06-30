/**
 * 排行页面
 * @author wuchao
 * @date 2017-06-14
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    DeviceEventEmitter
} from 'react-native';
import ColorStyle from '../style/ColorStyle'
import RankingTabNav from '../components/RankingTabNav'
import HeadNav from '../components/HeadNav'
import HttpRequest from '../common/HttpRequest'

export default class RankingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starNumber: 1,
            selectedTab:'HotPlay',
            hotPlay:null,
            newProducts:null,
            reserve:null,
            PullRelease:false
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <HeadNav header="排行榜" onPress={() => navigate('Home')}/>
                {
                    this.state.hotPlay!==null&&this.state.newProducts!==null&&this.state.reserve!==null?
                        <RankingTabNav data={this.state} navigation={this.props.navigation}/>:null
                }
            </View>
        );
    }


    getHotPlayList(){
        HttpRequest.getRankListData({
                page:0,
                type:1
            },
            (responseData)=> {
                this.setState({
                    hotPlay:responseData
                },()=>{
                    DeviceEventEmitter.emit('onLoad', true)
                })

            },
            (error)=> {
                console.log(error);
            });
    }

    getNewProducts(){
        HttpRequest.getRankListData({
                page:0,
                type:2
            },
            (responseData)=> {
                this.setState({
                    newProducts:responseData
                },()=>{
                    DeviceEventEmitter.emit('onLoad', true)
                })

            },
            (error)=> {
                console.log(error);
            });
    }

    getReserve(){
        HttpRequest.getRankListData({
                page:0,
                type:1
            },
            (responseData)=> {
                this.setState({
                    reserve:responseData
                },()=>{
                    DeviceEventEmitter.emit('onLoad', true)
                })

            },
            (error)=> {
                console.log(error);
            });
    }

    componentDidMount() {
        //监听是那个选项
        this.msgListener = DeviceEventEmitter.addListener('selectedTab',(listenerMsg) => {
            this.setState({
                selectedTab:listenerMsg,
            },()=>{
                console.log('当前是'+this.state.selectedTab+'页面')
            })
        });
        //监听刷新事件
        this.isPullRelease = DeviceEventEmitter.addListener('PullRelease',(listenerMsg) => {
            this.setState({
                PullRelease:listenerMsg,
            },()=>{
                if(this.state.selectedTab=='HotPlay'){
                    console.log('热玩刷新')
                    this.getHotPlayList()
                }
                if(this.state.selectedTab=='NewProducts'){
                    console.log('新品刷新')
                    this.getNewProducts()
                }
                if(this.state.selectedTab=='Reserve'){
                    console.log('预约刷新')
                    this.getReserve()
                }
            })
        });

    }

    componentWillMount() {

        this.getHotPlayList()
        this.getNewProducts()
        this.getReserve()

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    head: {
        height:60,
        backgroundColor:ColorStyle.colorGreen,
        justifyContent:'center',
        alignItems: 'center',
    },
    title:{
        fontSize:24,
        fontWeight:'900',
        color:ColorStyle.colorWhite,
        fontFamily:'Arial',
    }
});

