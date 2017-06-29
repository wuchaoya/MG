/**
 * 排行榜的tab组件
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ComStyle from '../style/CommonStyle'
import ColorStyle from '../style/ColorStyle'
import GameList from '../components/GameList'
import HttpRequest from '../common/HttpRequest'

const gameListDataHotPlay = [
    {
        gameImg: require('../static/img/user_head_icon.jpg'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gamePlayed:false
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gamePlayed:true
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gamePlayed:true
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gamePlayed:true
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gamePlayed:true
    }
]
const gameListDataReserve = [
    {
        gameImg: require('../static/img/game1_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gameReserve:false
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gameReserve:true
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gameReserve:false
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD',
        gameStar:9,
        gameClass:['益智','塔防'],
        gameReserve:false
    },
    {
        gameImg: require('../static/img/game2_img.png'),
        gameName:'崩坏3RD111111111111111111111111111111111111111111111111111111111111111111111111111',
        gameStar:9,
        gameClass:['益智','塔防'],
        gameReserve:false
    }
]

export default class RankingTabNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'HotPlay',
            theme: {
                color:ColorStyle.colorGreen,
            },
            lineIcon : require('../static/img/line_icon.png'),
            lineGreenIcon : require('../static/img/line_green_icon.png'),
            hotPlay:[],
            newProducts:[],
            reserve:[]
        }
    }

    _renderTab(Component, selectedTab, title, iconImg,selectedIconImg,data) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={{ color:'#83b233',}}
                title={title}
                titleStyle={styles.titleTextColor}
                renderIcon={() => <View style={styles.iconStyle}></View>}//默认图标
                renderSelectedIcon={() => <View style={[styles.iconStyle,{ borderBottomColor:'#83b333'}]}></View>}//选中图标
                onPress={() => this.setState({selectedTab: selectedTab})}>
                <Component showNumber={true} name={title} data={data} navigation ={this.props.navigation}/>
            </TabNavigator.Item>
        )
    }

    render() {

            return (
                this.state.hotPlay.length!==0&&this.state.reserve.length!==0&&this.state.newProducts.length!==0?
            <TabNavigator
                sceneStyle={{marginTop:48,paddingBottom:0}}
                tabBarStyle={[styles.center,styles.tabBarStyle]}>
                {this._renderTab(GameList,'HotPlay','热玩榜',this.state.lineIcon,this.state.lineGreenIcon,this.state.hotPlay)}
                {this._renderTab(GameList,'NewProducts','新品榜',this.state.lineIcon,this.state.lineGreenIcon,this.state.newProducts)}
                {this._renderTab(GameList,'Reserve','预约榜',this.state.lineIcon,this.state.lineGreenIcon,this.state.reserve)}
            </TabNavigator>:null
        )
    }
    componentWillMount() {
        HttpRequest.getRankListData({
                page:0,
                type:1
            },
            (responseData)=> {
                this.setState({
                    hotPlay:responseData
                },()=>{
                    console.log(this.state.hotPlay)
                })

            },
            (error)=> {
                console.log(error);
            });
        HttpRequest.getRankListData({
                page:0,
                type:2
            },
            (responseData)=> {
                this.setState({
                    newProducts:responseData
                },()=>{
                    console.log(this.state.newProducts)
                })

            },
            (error)=> {
                console.log(error);
            });
        HttpRequest.getRankListData({
                page:0,
                type:1
            },
            (responseData)=> {
                this.setState({
                    reserve:responseData
                },()=>{
                    console.log(this.state.reserve)
                })

            },
            (error)=> {
                console.log(error);
            });
    }

}


const styles = StyleSheet.create({
    flex: {

    },
    center: {
        // justifyContent: 'center',
        // alignItems: 'center',

    },
    iconStyle: {
        width:90,
        position: 'absolute',
        bottom:-37,
        alignSelf:'center',
        height:17,
        borderBottomWidth:2,
        borderBottomColor:'#fff'
    },
    titleTextColor:{
        fontSize: 14,
        color:'#888',
        fontWeight:'800',
        height:31
    },
    tabBarStyle:{
        position: 'absolute',
        top:0,
        height: 48,
        paddingLeft: 40,
        paddingRight: 40,
        margin:0,
        padding:0
    }
});
