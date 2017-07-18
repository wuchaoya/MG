/**
 * 找回密码
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    Modal,
} from 'react-native';
import HeadNav from '../components/HeadNav'
import CodeButton from '../components/CodeButton'
import HttpRequest from '../common/HttpRequest'
import  DeviceStorage from '../common/DeviceStorage'
let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;

import LoginButton from '../components/LoginButton'
export default class SMSLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secretOff:require('../static/img/secret-off.png'),
            secretOn:require('../static/img/secret-on.png'),
            off:require('../static/img/off_icon.png'),
            on:require('../static/img/on_icon.png'),
            secureTextEntry:true,
            codeButtonDisabled:true,
            loginButtonDisabled:true,
            user:'',
            code:'',
            pass:'',
            clerUser:-100,
            clerPass:-100,
            clerCode:-100,
            onLogin:false,
            loginErr:false,
            codeText:'获取验证码',
            list:[],
            showList:false,
        }
    }
    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={{flex:1}}>
                <HeadNav leftColor="#222" color="#f5f5f5" onPress={() => goBack()}/>
                <View style={styles.container}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>重置密码</Text>
                    </View>
                    <View >
                        <TextInput
                            style={styles.userInput}
                            placeholder="手机号/邮箱/用户名/和通行证"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#999"
                            selectionColor="#999"
                            maxLength={18}
                            autoCorrect={false}
                            value={this.state.user}
                            onChangeText={(text) => {
                                this.setState({
                                    user:text},()=>{
                                    this.setState({
                                        clerUser:this.state.user.length!==0?34:-100,
                                        codeButtonDisabled:this.state.user.length===0,
                                        loginButtonDisabled:!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)})
                                })}}
                        />
                        <TouchableOpacity onPress={()=>{
                            this.setState({
                                user:'',
                            },()=>{
                                this.setState({
                                    clerUser:this.state.user.length!==0?34:-100,
                                })
                            })
                        }} style={[styles.clear,{right:this.state.clerUser,}]}>
                            <Text style={{fontSize:10}}>╳</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={
                                ()=>{
                                    this.setState({
                                        showList:!this.state.showList
                                    },()=>{
                                        DeviceStorage.get('userList').then((v)=>{
                                            if(!v){
                                                v=[]
                                            }
                                            this.setState({
                                                list:v
                                            })
                                            console.log(v)
                                        })
                                    })
                                }
                            }
                            style={styles.off}>
                            <Image style={{ width:24,height:24,}} source={this.state.off}></Image>
                        </TouchableOpacity>
                        <View style={[styles.list,this.state.showList?{top:44,}:{top:-10000}]}>
                            {this.state.list.map((item,i)=>{
                                return(
                                    <TouchableOpacity
                                        key={i}
                                        onPress={()=>{
                                            this.setState({
                                                user:item,
                                                showList:!this.state.showList,
                                                clerUser:34
                                            })
                                        }}
                                        activeOpacity={0.8} style={styles.item}>
                                        <Text>{item}</Text>
                                        <Text onPress={
                                            ()=>{
                                                let  arr = this.state.list
                                                arr.splice(i,1)
                                                this.setState({
                                                    list:arr
                                                },()=>{
                                                    DeviceStorage.save('userList',arr)
                                                })
                                            }
                                        } style={{fontSize:10}}>╳</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TextInput
                            style={[styles.userInput,{paddingRight:200,}]}
                            placeholder="验证码"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#999"
                            selectionColor="#999"
                            maxLength={18}
                            autoCorrect={false}
                            value={this.state.code}
                            onChangeText={(text) => {
                                this.setState({
                                    code:text},()=>{
                                    this.setState({
                                        clerCode :this.state.code.length!==0?120:-100,
                                        loginButtonDisabled:!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)})
                                })}}
                        />
                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({
                                    code:'',
                                },()=>{
                                    this.setState({
                                        clerCode :this.state.code.length!==0?120:-100,
                                    })
                                })
                            }}
                            style={[styles.clear,{right:this.state.clerCode,}]}>
                            <Text style={{fontSize:10}}>╳</Text>
                        </TouchableOpacity>
                        <CodeButton codeText={this.state.codeText} onPress={()=>this.getCode()} disabled={this.state.codeButtonDisabled}/>
                    </View>
                    <View style={{width:width-80,justifyContent:'space-between'}}>
                        <TextInput
                            style={styles.userInput}
                            placeholder="密码"
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#999"
                            selectionColor="#999"
                            maxLength={18}
                            autoCorrect={false}
                            secureTextEntry={this.state.secureTextEntry}
                            value={this.state.pass}
                            onChangeText={(text) => {
                                this.setState({
                                    pass:text},()=>{
                                    this.setState({
                                        clerPass:this.state.pass.length!==0?34:-100,
                                        loginButtonDisabled:!(this.state.user.length!==0&&this.state.pass.length!==0&&this.state.code.length!==0)})
                                })}}
                        />
                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({
                                    pass:'',
                                },()=>{
                                    this.setState({
                                        clerPass:this.state.pass.length!==0?34:-100,
                                    })
                                })
                            }}
                            style={[styles.clear,{right:this.state.clerPass,}]}>
                            <Text style={{fontSize:10}}>╳</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>{this.setState(
                            {secureTextEntry:!this.state.secureTextEntry} ) }} style={styles.secret}>
                            <Image style={{ width:24,height:24,}} source={this.state.secureTextEntry?this.state.secretOn:this.state.secretOff}></Image>
                        </TouchableOpacity>
                    </View>
                    <LoginButton
                        onPress={()=>this.restPass()}
                        text="确定" disabled={this.state.loginButtonDisabled} style={{marginTop:20}}/>
                </View>
                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={this.state.onLogin}
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
                        {this.state.loginErr?
                            <View style={{width:530/2,height:130,backgroundColor:'#fff',borderRadius:6,justifyContent:'center',alignItems:'center'}}>
                                <View style={{height:130/2,width:530/2,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                                    <Text>短信验证码错误</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.setState({
                                            onLogin:false,
                                            loginErr:false
                                        })
                                    }}
                                    style={{height:130/2,width:530/2,justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{color:'#83b233'}}>确定</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{width:100,height:100,backgroundColor:'#fff',borderRadius:15,justifyContent:'center',alignItems:'center'}}>
                                <Image style={{width:27,height:29}} source={require('../static/img/loading.gif')}/>
                                <Text style={{fontSize:10,marginTop:6,letterSpacing:1000}}>重置中</Text>
                            </View>
                        }
                    </View>

                </Modal>
            </View>
        );
    }
    getCode(){
        if(this.state.codeButtonDisabled){
            return
        }
        this.setState({
            codeButtonDisabled:true
        },()=>{
            let timeNumber =60
            let time = setInterval(()=>{
                this.setState({
                    codeText:'重新获取('+--timeNumber+')'
                })
                if(timeNumber==0){
                    clearInterval(time)
                    this.setState({
                        codeButtonDisabled:false,
                        codeText:'重新获取'
                    })
                }
            },1000)
        })
        HttpRequest.getVerityCode({
                phone:this.state.user,
                businessID:1
            },
            (response)=>{
            console.log(response)
            },
            (error)=>{

            }
        )
    }
   restPass(){
       this.setState({
           onLogin:true
       })
        HttpRequest.resetPass({
                phone:this.state.user,
                newPassword:this.state.pass,
                veritycode:Number(this.state.code)

            },
            (response)=>{
                console.log(response)
                if(response.resultCode==0){
                    this.setState({
                        onLogin:false
                    },()=>{
                    })
                }
                else {
                    this.setState({
                        loginErr:true
                    })
                }
            },
            (error)=>{

            }
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#f5f5f5',
        paddingLeft:40,
        paddingRight:40
    },
    userInput:{
        width:width-80,
        padding: 0,
        height:44,
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        color:'#666'
    },
    off:{
        position: 'absolute',
        right:0,
        height:44,
        justifyContent:'center'
    },
    secret:{
        position: 'absolute',
        top:0,
        right:0,
        height:44,
        justifyContent:'center',
        alignSelf:'flex-end'

    },
    foot:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:15
    },
    text:{
        color:'#666',
        fontSize:13
    },
    code:{
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:44,
        backgroundColor:'#83b233',
        borderRadius:6
    },
    titleText:{
        fontSize:14,
        color:'#83b233',
        fontWeight:'800'
    },
    title:{
        height:44,
        justifyContent:'center',
        alignItems:'center'
    },
    clear:{
        width:44,
        height:44,
        position: 'absolute',
        right:34,
        justifyContent:'center',
        alignItems:'center'
    },
    list:{
        position: 'absolute',
        top:44,
        width:width-80,
        zIndex:22
    },
    item:{
        backgroundColor:'#ddd',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:44,
        paddingLeft:10,
        paddingRight:10
    }
});

