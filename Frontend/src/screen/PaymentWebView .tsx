import React from "react";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/rootTypes";
export const PaymentWebView = ({ midtransUrl }: any) => {
  return (
    <WebView
      source={{ uri: midtransUrl }}
      javaScriptEnabled={true}
      javaScriptCanOpenWindowsAutomatically={true}
      domStorageEnabled={true}
      cacheEnabled={true}
      cacheMode="LOAD_NO_CACHE"
      style={{ flex: 1 }}
      onLoadStart={() => console.log("WebView loading started")}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.log("WebView loading error:", nativeEvent);
      }}
    />
  );
};
