/**
 * 设置
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Navigator,
    Image,
    View,
    DeviceEventEmitter,
    TouchableOpacity,
    Modal,
    BackAndroid
} from 'react-native';
import HeadNav from '../components/HeadNav'
import TransparentStatusBar    from '../components/TransparentStatusBar'
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow:false
        }
    }

    render() {
        const { goBack,navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TransparentStatusBar/>
                <HeadNav header="设置"  onPress={() => goBack()} />
                <View style={{  paddingLeft:12,paddingRight:12,backgroundColor:'#fff',}}>
                    <TouchableOpacity
                        activeOpacity={0.9} style={styles.conter} onPress={() => navigate('Pact')}>
                        <Text style={styles.text} >用户服务协议</Text>
                        <Image style={styles.nextImg} source={require('../static/img/next_icon.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('Pact')}
                        activeOpacity={0.9}
                        style={[styles.conter,{marginTop:0,borderTopWidth: 1,borderTopColor:'#ededed'}]}>
                        <Text style={styles.text}>联系客服</Text>
                        <Image style={styles.nextImg} source={require('../static/img/next_icon.png')}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={()=>{
                        global.userId=null
                        DeviceEventEmitter.emit('LoginOut',{userName:this.state.user} )
                        goBack()
                    }}
                    style={{ justifyContent:'center',alignItems:'center',height:53,marginTop:6,backgroundColor:'#fff',}}>
                    <Text style={styles.text}>退出登录</Text>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={this.state.isShow}
                    onRequestClose={()=>{
                    }
                    }
                    style={{backgroundColor:'rgba(0,0,0,0.7)',flex:1}}>
                    <View
                        style={{
                            flex:1,backgroundColor:'rgba(0,0,0,0.7)',
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                        <View style={{width:265,height:132,backgroundColor:'#f2f2f2',borderRadius:6}}>
                            <View
                                style={{
                                    height:72,width:265,
                                    justifyContent:'center',alignItems:'center',
                                }}>
                                <Text onPress={()=>this.subStar()}>是否确认评分</Text>
                            </View>
                            <View style={{
                                borderTopWidth:1,
                                height:60,
                                borderTopColor:'#ddd',
                                flexDirection:'row',
                                alignItems:'center'
                            }}>
                                <TouchableOpacity
                                    onPress={()=>this.siginOut(false)}
                                    style={{width:265/2,height:40,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderRightColor:'#ddd'}}>
                                    <Text>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>this.siginOut(true)}
                                    style={{width:265/2,height:40,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#83b233'}}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }
    siginOut(isOut){
        this.setState({
            isShow:false
        },()=>{
            if(isOut){
                BackAndroid.exitApp()
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
    backgroundColor:'#ededed'
    },
    conter:{
        marginTop:6,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        height:53
    },
    text:{
        fontSize:14,
        color:'#333'
    },
    nextImg:{
        width:5,
        height:9
    }
});

