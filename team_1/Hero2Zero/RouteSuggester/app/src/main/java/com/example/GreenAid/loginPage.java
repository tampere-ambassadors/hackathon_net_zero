package com.example.GreenAid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import GreenAid.R;

public class loginPage extends AppCompatActivity {

    private RequestQueue queue;
    String testUrl = "https://21wsp4pw.course.tamk.cloud/api/v2/user/";
    String superPass = "/super_secret_pass";
    String receivedPass= "";
    String receivedEmail="";
    String userId ="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_page);
        queue = Volley.newRequestQueue(this);
    }

    public void loginNow(View view) {
        EditText username = (EditText)findViewById(R.id.editTextTextPersonName);
        String email = username.getText().toString();
        EditText password = (EditText)findViewById(R.id.editTextTextPassword);
        String pass = password.getText().toString();
        testUrl = testUrl+email+superPass;
        StringRequest stringRequest = new StringRequest(Request.Method.GET, testUrl,
                response -> {
                    //Toast.makeText(this,response,Toast.LENGTH_LONG).show();
                    try {
                        JSONObject credentials = new JSONObject(response);
                        userId = credentials.getString("id");
                        receivedPass = credentials.getString("password");
                        receivedEmail = credentials.getString("email");
                        //Toast.makeText(this,receivedEmail+receivedPass+userId,Toast.LENGTH_LONG).show();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    if( (pass.equals(receivedPass)) && (email.equals(receivedEmail))){
                        testUrl = "https://21wsp4pw.course.tamk.cloud/api/v2/user/";
                        Intent main = new Intent(this,MainActivity.class);
                        Bundle userData = new Bundle();
                        userData.putString("Email",email);
                        userData.putString("Id",userId);
                        main.putExtras(userData);
                        startActivity(main);
                    }
                    else {
                        Toast.makeText(this,"Wrong Credentials",Toast.LENGTH_LONG).show();
                        testUrl = "https://21wsp4pw.course.tamk.cloud/api/v2/user/";
                    }
                    //
                   // parseJsonAndUpdateUI(response);  	//<= Sub function which parses the json object
                },
                volleyError -> {
                    Toast.makeText(this,"Error",Toast.LENGTH_LONG).show();
                    testUrl = "https://21wsp4pw.course.tamk.cloud/api/v2/user/";
                });

        // Sending request by adding it to queue
        queue.add(stringRequest);

    }

    public void openRegister(View view) {
        Intent intent = new Intent(this,registerPerson.class);
        startActivity(intent);
    }
}