package in.statpsych.cdss;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.InputStream;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String APP_HOST = "appassets.androidplatform.net";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        webView.setWebViewClient(new WebViewClient() {
            private WebResourceResponse loadFromAssets(Uri uri) {
                if (uri == null || !APP_HOST.equals(uri.getHost())) {
                    return null;
                }
                String path = uri.getPath();
                if (path == null || path.isEmpty() || path.equals("/")) {
                    path = "index.html";
                } else if (path.startsWith("/")) {
                    path = path.substring(1);
                }
                String mime = "application/octet-stream";
                if (path.endsWith(".html")) mime = "text/html";
                else if (path.endsWith(".js")) mime = "text/javascript";
                else if (path.endsWith(".css")) mime = "text/css";
                else if (path.endsWith(".svg")) mime = "image/svg+xml";
                else if (path.endsWith(".png")) mime = "image/png";
                else if (path.endsWith(".json") || path.endsWith(".webmanifest")) mime = "application/json";

                try {
                    InputStream is = getAssets().open(path);
                    return new WebResourceResponse(mime, "UTF-8", is);
                } catch (Exception e) {
                    try {
                        InputStream fallback = getAssets().open("index.html");
                        return new WebResourceResponse("text/html", "UTF-8", fallback);
                    } catch (Exception ex) {
                        return null;
                    }
                }
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                WebResourceResponse res = loadFromAssets(request.getUrl());
                if (res != null) return res;
                return super.shouldInterceptRequest(view, request);
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
                WebResourceResponse res = loadFromAssets(Uri.parse(url));
                if (res != null) return res;
                return super.shouldInterceptRequest(view, url);
            }
        });

        setContentView(webView);
        webView.loadUrl("https://" + APP_HOST + "/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
