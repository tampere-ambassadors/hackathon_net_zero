package com.example.GreenAid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import GreenAid.R;

public class MainActivity extends AppCompatActivity {

    String email="";
    String userId="";
    String copyId="";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        email = getIntent().getExtras().getString("Email");
        userId = getIntent().getExtras().getString("Id");
        copyId = userId;
        //Toast.makeText(this,email+userId,Toast.LENGTH_LONG).show();
    }

    public void showCommunityStats(View view) {
        //Intent intent = new Intent(this,communityStats.class);
        TextView mainScreenStats = findViewById(R.id.textView2);
        Integer percentageCommunity = getPercentage();
        mainScreenStats.setText("Community : "+percentageCommunity.toString());
    }

    private int getPercentage() {
        int percentage;
        percentage = 100;
        return percentage;
    }

    public void showMyStats(View view) {
        TextView mainScreenStats = findViewById(R.id.textView2);
        Integer percentageMy = getPercentage();
        mainScreenStats.setText("My GreenRate: "+percentageMy.toString());
    }

    public void showLessons(View view) {
        Intent intent = new Intent(this,registerPerson.class);
        //intent.putExtra("Id",userId);
        // Maybe send some data here
        startActivity(intent);
    }

    public void showLogin(View view) {
        Intent intent = new Intent(this,lessonWindow.class);
        intent.putExtra("ID",copyId);
        startActivity(intent);
    }
}