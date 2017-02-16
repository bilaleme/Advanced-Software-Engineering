package com.example.administrator.knowledgeapp;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Html;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.jayway.jsonpath.JsonPath;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

public class LoginActivity extends AppCompatActivity {

    EditText et;
    EditText et1;
    TextView tv;
    Button loginButton;
    Button registerButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        setTitle("Login");
        et = (EditText) findViewById(R.id.editText);
        et1 = (EditText) findViewById(R.id.editText2);
        tv = (TextView) findViewById(R.id.textView4);
        loginButton = (Button) findViewById(R.id.button2);
        registerButton = (Button) findViewById(R.id.button4);
        et1.requestFocus();
        tv.setText("");
        loginButton.setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkLogin();
            }
        });

        registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent redirect = new Intent(LoginActivity.this,RegisterWindow.class);
                startActivity(redirect);
            }
        });
        System.out.println("app starting");
    }

    protected void checkLogin(){
        String username = et.getText().toString();
        String pass = et1.getText().toString();

        if(username.equals("admin") && pass.equals("admin")){
            tv.setText("Successful Login");

            AsyncTask tsk = new AsyncTask() {
                @Override
                protected Object doInBackground(Object[] params) {
                    Intent redirect = new Intent(LoginActivity.this,HomeWindow.class);
                    startActivity(redirect);
                    return null;
                }
            };
            tsk.execute();


        } else {
            tv.setText("Invalid Credentials");
        }

    }

    protected static String[][] kgConnect(String query){
        try {
            HttpTransport httpTransport = new NetHttpTransport();
            HttpRequestFactory requestFactory = httpTransport.createRequestFactory();
            JSONParser parser = new JSONParser();
            GenericUrl url = new GenericUrl("https://kgsearch.googleapis.com/v1/entities:search");
            url.put("query", query);
            url.put("limit", "10");
            url.put("indent", "true");
            url.put("key", "AIzaSyC1KweCNnbAXZEyt2LJZARV0DFbXrew4PE");
            HttpRequest request = requestFactory.buildGetRequest(url);
            HttpResponse httpResponse = request.execute();
            JSONObject response = (JSONObject) parser.parse(httpResponse.parseAsString());
            JSONArray elements = (JSONArray) response.get("itemListElement");
            String[][] arr = new String[2][elements.size()];
            int x=0;
            for (Object element : elements) {
                String name = JsonPath.read(element,"$.result.name").toString();
                String nameUrl  = JsonPath.read(element,"$.result.detailedDescription.url").toString();
//                String htmlText = "<a href=\""+nameUrl+"\">"+name+"</a>";
                arr[0][x] = name;
                arr[1][x++] = nameUrl;
                System.out.println(JsonPath.read(element, "$.result.name").toString());
            }

            return arr;

        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }






}
