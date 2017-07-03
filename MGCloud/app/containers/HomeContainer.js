/**
 * 首页页面
 * @author wuchao
 * @date 2017-06-14
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    StatusBar,
    Image,
    Dimensions,
    DeviceEventEmitter
} from 'react-native';
import ColorStyle from '../style/ColorStyle'
import Banner from '../components/ScrollBanner';
import Title from '../components/Title'
import CommonStyle from '../style/CommonStyle'
import TextConst from '../const/TextConst'
import ScrollGameThemes from '../components/ScrollGameThemes'
import ScrollGameHighlights from '../components/ScrollGameHighlights'
import HeadNav from '../components/HeadNav'
import HttpRequest from '../common/HttpRequest'
import  LoadingContainer from '../containers/LoadingContainer'

export default class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerArray:[],
            dissertation:[],
            gameList:[],
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={{height:Dimensions.height}}>
                <HeadNav header="云游戏" onPress={() => navigate('Home')}/>
                {this.state.gameList.length!==0&&this.state.dissertation.length!==0&&this.state.bannerArray.length!==0?
                    <View style={styles.container}>
                        {this.state.bannerArray.length!==0?<Banner navigation={this.props.navigation} data={this.state.bannerArray}/>:null}
                        <View style={CommonStyle.container}>
                            <Title
                                titleText={TextConst.HomeContainerText.gameTheme.title}
                                color="#000"
                            ></Title>
                            <Text
                                style={styles.subtitle}>{TextConst.HomeContainerText.gameTheme.subtitle}</Text>
                            {this.state.dissertation.length!==0?<ScrollGameThemes data={this.state.dissertation} navigation={this.props.navigation}></ScrollGameThemes>:null}
                        </View>
                        <View style={[{marginTop: 12, paddingTop: 12, backgroundColor: ColorStyle.colorWhite}]}>
                            <View style={styles.homeContainer}>
                                <Title color="#000" titleText={TextConst.HomeContainerText.gameHighlights.title}></Title>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Text onPress={() => navigate('Game')}
                                          style={styles.more}>{TextConst.HomeContainerText.gameHighlights.more}</Text>
                                    <Image style={{width:5,height:9,marginLeft:4}} source={require('../static/img/more.png')}></Image>
                                </View>
                            </View>
                            {this.state.gameList.length!==0?<ScrollGameHighlights data={this.state.gameList}  navigation={this.props.navigation}></ScrollGameHighlights>:null}
                        </View>
                    </View>:(<LoadingContainer load="loadHome" isLoading="isLoadHome"/>)}
            </ScrollView>
        );
    }
    getHomeData(){
        HttpRequest.getHomeData('',
            (responseData)=> {
                if(!responseData){
                    DeviceEventEmitter.emit('isLoadHome', false)
                    return
                }
                if(responseData.banner.length===0||responseData.dissertation.length===0||responseData.gameList.length===0){
                    DeviceEventEmitter.emit('isLoadHome', false)
                    return
                }
                this.setState({
                    bannerArray:responseData.banner,
                    dissertation:responseData.dissertation,
                    gameList:responseData.gameList
                },()=>{
                    console.log(responseData.gameList
                    )
                });

            },
            (error)=> {
                console.log(error);
            });
    }
    failedLoad(){
        this.loadHome= DeviceEventEmitter.addListener('loadHome',(listenerMsg) => {
            this.getHomeData()
            console.log('要重新加载了')
        });
    }
    componentWillMount() {
        this.failedLoad()
        this.getHomeData()
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.colorLightSteelGray,
    },
    subtitle: {
        marginTop: 12,
        color: '#999'
    },
    homeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        marginRight: 12,
        paddingLeft: 12,
    },
    more: {
        color: ColorStyle.colorGreen
    }

});
