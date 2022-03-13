package com.example.GreenAid;

public class listObject {
    private Double task_id;
    private String name;
    private String description;
    private Double weight;
    private Double completion;
    private Double goal;
    private String type;

    public Double getCompletion() {
        return completion;
    }

    public void setCompletion(Double completion) {
        this.completion = completion;
    }

    public Double getGoal() {
        return goal;
    }

    public void setGoal(Double goal) {
        this.goal = goal;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public listObject(Double pId, String pName, String pDescription, Double pWeight ){
        this.task_id = pId;
        this.name = pName;
        this.description = pDescription;
        this.weight = pWeight;
    }

    public listObject(){
        this.task_id = 0.0;
        this.name = "";
        this.description = "";
        this.weight = 0.0;
        this.completion = 0.0;
        this.goal = 0.0;
        this.type = "";
    }
    public Double getTask_id() {
        return task_id;
    }

    public void setTask_id(Double task_id) {
        this.task_id = task_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }
}
