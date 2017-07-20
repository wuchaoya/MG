package com.mgcloud.javamodule;

import android.content.Intent;
import android.util.Log;
import android.widget.Toast;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.mgcloud.activity.CloudPlayActivity;
import com.mgcloud.activity.FullScreenVideoActivity;
import com.mgcloud.activity.WebViewActivity;
import com.mgcloud.common.Constant;
import com.mgcloud.utils.SendMessage;

public class RNInteration extends ReactContextBaseJavaModule {

    public RNInteration(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNInteraction";
    }

    /**
     * 调用云玩功能，后期需要增加云玩相关参数
     * @author: todo: 需要增加参数信息 shisheng.zhao
     */
    @ReactMethod
    public void startCloudPlay(ReadableMap readableMap) {
        String packageName = "";
        String userId = "";
        try {
            packageName = readableMap.getString("pkg");
            userId = readableMap.getString("userId");
            Log.e("RNInteration","pkg:"+packageName);
            Log.e("RNInteration","userId:"+userId);
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
        Intent intent = new Intent();
        intent.setClass(getReactApplicationContext(), CloudPlayActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra("packageName", packageName);
        intent.putExtra("userId", userId);
        intent.putExtra("playTime", "");
        getReactApplicationContext().startActivity(intent);
    }

    /**
     * 调用native视频播放器功能
     * @author:
     */
    @ReactMethod
    public void playVideoByUrl(String videoUrl) {
        Intent intent = new Intent();
        intent.setClass(getReactApplicationContext(), FullScreenVideoActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra("videoUrl", videoUrl);
        getReactApplicationContext().startActivity(intent);
    }

    /**
     * 调用native视频播放器功能
     * @author: todo:需要增加参数信息 shisheng.zhao
     */
    @ReactMethod
    public void openMGServer(ReadableMap readableMap) {
        String userId = "";
        try {
            userId = readableMap.getString("userId");
            Log.e("RNInteration","userId:"+userId);
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
        Intent intent = new Intent();
        intent.setClass(getReactApplicationContext(), WebViewActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.putExtra("userId", userId);
        getReactApplicationContext().startActivity(intent);
    }

    /**
     * 自动发送短信
     */
    @ReactMethod
    public void sendSms(String statue, Promise promise) {
        SendMessage sendMessage = new SendMessage(getReactApplicationContext(), promise);
        sendMessage.send(Constant.smsNum);
    }

    @ReactMethod
    public void showCustomToast(String message) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show();
    }
}