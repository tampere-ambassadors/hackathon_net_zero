package com.example.GreenAid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;

import GreenAid.R;


public class lessonWindow extends AppCompatActivity {

    ListView l;
    public listObject taskStore = new listObject(0.0,"","",0.0);
    static ArrayList<listObject> taskList = new ArrayList<>();
    private RequestQueue queue;
    String listDatafromBackend = "https://21wsp4pw.course.tamk.cloud/api/v2/tasks/";
    String idText;
    String superPass = "/super_secret_pass";

    //ListView l;
    String tutorials[]
            = { "Attend Workshop", "Save on Gas",
            "Water Office plants", "Clear Emails",
            "Switch off electrical appliances", "Use public transport",
            "Reduce plastic use", "Eat less meat",
            "Reduce printer use" };

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lesson_window);
        //Toast.makeText(this,userId.toString(),Toast.LENGTH_LONG).show();
        l = findViewById(R.id.listView);
        ArrayAdapter<String> arr;
        arr
                = new ArrayAdapter<String>(
                this,
                R.layout.support_simple_spinner_dropdown_item,
                tutorials);
        Intent userId = getIntent();
        idText = userId.getStringExtra("ID");
        l.setAdapter(arr);
        queue = Volley.newRequestQueue(this);
    }

    public void showChange(View view) {
        getList();
        //Toast.makeText(this,taskList.toString(),Toast.LENGTH_LONG).show();
    }


    private int counter =0;
    private String tas;
    public void getList() {
        listDatafromBackend = listDatafromBackend + idText + superPass;
        StringRequest stringRequest = new StringRequest(Request.Method.GET,listDatafromBackend,
                response ->{
                    try {
                        JSONArray tasks = new JSONArray(response);
                        //while(tasks.getJSONObject(0).has("name"))
                        {
                            taskStore.setName(tasks.getJSONObject(0).getString("name"));
                            taskStore.setCompletion(tasks.getJSONObject(0).getDouble("completion"));
                            taskStore.setDescription(tasks.getJSONObject(0).getString("description"));
                            taskStore.setGoal(tasks.getJSONObject(0).getDouble("goal"));
                            taskStore.setType(tasks.getJSONObject(0).getString("type"));
                            taskStore.setWeight(tasks.getJSONObject(0).getDouble("weight"));
                            taskList.add(taskStore);
                            myList(taskList);
                            //counter++;
                            //taskStore = new listObject();
                            //JSONObject taskkk = tasks.getJSONObject(0);
                            //tas = taskkk.getString("name");
                            //taskStore= new listObject(0.0,tas,"work",0.0);
                            //Toast.makeText(this,taskList.toString(),Toast.LENGTH_LONG).show();
                        }
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                },
                volleyError -> {
                    //Toast.makeText(this,"Error",Toast.LENGTH_LONG).show();
                });
        //Toast.makeText(this,taskList.toString(),Toast.LENGTH_LONG).show();
        queue.add(stringRequest);
    }

    private void myList(ArrayList<listObject> taskList) {
        //Toast.makeText(this,taskList.toString(),Toast.LENGTH_LONG).show();
        String dump[] = {taskList.get(0).getName() };
        l = findViewById(R.id.listView);
        ArrayAdapter<String> arr;
        arr
                = new ArrayAdapter<String>(
                this,
                R.layout.support_simple_spinner_dropdown_item,
                dump);
        Intent userId = getIntent();
        idText = userId.getStringExtra("ID");
        l.setAdapter(arr);
    }
}