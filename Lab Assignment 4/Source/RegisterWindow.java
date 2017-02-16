package com.example.administrator.knowledgeapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.w3c.dom.Text;

/**
 * Created by Administrator on 2/11/2017.
 */

public class RegisterWindow extends AppCompatActivity {

    Button backButton;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.register_layout);
        setTitle("Registration");

        backButton = (Button) findViewById(R.id.button6);

        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent redirect = new Intent(RegisterWindow.this,LoginActivity.class);
                startActivity(redirect);
                finish();
            }
        });

        Button btn = (Button)findViewById(R.id.button3);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String fName = ((TextView) findViewById(R.id.editText5)).getText().toString();
                String lName = ((TextView) findViewById(R.id.editText7)).getText().toString();
                String email = ((TextView) findViewById(R.id.editText8)).getText().toString();
                String phone = ((TextView) findViewById(R.id.editText9)).getText().toString();

                String vText = "First Name : " + fName + "\n" +"Second Name : " + lName + "\n" + "Email : " + email + "\n" + "Phone : " + phone + "\n Registration successful";

                ((TextView) findViewById(R.id.textView10)).setText(vText);
            }
        });
    }


}
