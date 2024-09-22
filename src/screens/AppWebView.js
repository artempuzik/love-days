import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import {Platform, StyleSheet, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addMetricaAction, saveLastUrl} from "../store/app";

const AppWebView = () => {
    const [isLoading, setIsLoading] = useState(true)
    const url = useSelector((state) => state.app.url)
    const dispatch = useDispatch()
    const webViewRef = useRef(null)
    const codeAddListener = useMemo(() => {
        return `
            setTimeout(() => {
                const init = async () => {
                   console.log("Listener injected");
                   let fileInputs = null;
                   window.addEventListener("message", function (event) {
                        window.ReactNativeWebView.postMessage(JSON.stringify(event.data));
                   });
                   document.addEventListener("click", function (event) {
                       console.log("Document clicked");
                       if(fileInputs?.length) {
                           fileInputs.forEach((fileInput) => {
                               const fn = () => {
                                   window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'upload_photo'}));
                               }
                               fileInput.addEventListener("change", fn);
                           });
                       } else {
                           fileInputs = document.querySelectorAll('.edit-profile__photo input[type="file"]');
                       }
                   });
                };
                init();
            }, 2000);
    `;
    }, []);

    useEffect(() => {
        if(webViewRef.current) {
            webViewRef?.current.reload();
        }
        return () => {
            if (webViewRef?.current) {
                webViewRef.current.reload();
            }
        }
    }, []);

    if(!url) {
        return null

    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <WebView
                bounces={false}
                ref={(ref) => (webViewRef.current = ref)}
                style={styles.container}
                source={{ uri: url }}
                scalesPageToFit={(Platform.OS !== 'ios')}
                onNavigationStateChange={(data) => {
                    try {
                        dispatch(saveLastUrl(data.url))
                    } catch (e) {
                        console.error('onNavigationStateChange error:', e);
                    }
                }}
                onMessage={ (event) => {
                    try {
                        if(event.nativeEvent?.data) {
                            const data = JSON.parse(event.nativeEvent?.data)
                            if(data && data?.action === 'upload_photo') {
                                dispatch(addMetricaAction('upload_photo'))
                            }
                            if(data && data.penpal) {
                                if(data.args[0]) {
                                    if(data.args[0].status === 'success') {
                                        dispatch(addMetricaAction('prem_start'))
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.error('onMessage error:', e);
                    }
                }}
                onOpenWindow={(event) => {
                    console.log(event)
                }}
                onLoad={() => {
                    setIsLoading(false);
                }}
                onError={(event) => {
                    console.log(event)
                }}
                javaScriptCanOpenWindowsAutomatically={true}
                originWhitelist={['*']}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                automaticallyAdjustContentInsets={false}
                injectedJavaScript={codeAddListener}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: Constants.statusBarHeight,
    },
});

export default AppWebView;
