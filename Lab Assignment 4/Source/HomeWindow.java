package com.example.administrator.knowledgeapp;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Looper;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.view.menu.ListMenuItemView;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.RelativeLayout;

import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.util.GenericData;
import com.jayway.jsonpath.JsonPath;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.util.List;

/**
 * Created by Administrator on 2/10/2017.
 */

public class HomeWindow extends AppCompatActivity {

    ArrayAdapter<String> adapter;
    String[][] arr;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_content);
        setTitle("Google Knowledge Search");
        Button btn = (Button) findViewById(R.id.button5);

        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                AsyncTask tsk = new AsyncTask() {
                    @Override
                    protected Object doInBackground(Object[] params) {
                        callAPI();
                        return null;
                    }
                };

                tsk.execute();
            }
        });

        ListView ll = ((ListView)findViewById(R.id.listview));
        ll.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                String muri = arr[1][position];
                Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(muri));
                startActivity(browserIntent);
            }
        });

        final Button logout = (Button)findViewById(R.id.button);
        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                logout();
            }
        });
    }

    private void callAPI(){
        String query = ((EditText)findViewById(R.id.editText3)).getText().toString();
        arr = LoginActivity.kgConnect(query);
        createList(arr[0]);
        System.out.println("success is on its way");
    }

    private void createList(String[] arr){
        adapter = new ArrayAdapter<String>(this,R.layout.layout,arr);
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                ListView list = ((ListView)findViewById(R.id.listview));
                list.setAdapter(adapter);
                list.requestFocus();
                InputMethodManager man = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
                man.hideSoftInputFromWindow(((RelativeLayout)findViewById(R.id.login_content)).getWindowToken(),0);
            }
        });
    }

    public void logout() {
        Intent redirect = new Intent(HomeWindow.this, LoginActivity.class);
        startActivity(redirect);
        finish();
    }
}