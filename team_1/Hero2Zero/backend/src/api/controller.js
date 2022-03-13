var mysql = require('mysql');
const secret = "super_secret_pass";
const db_params = {
    host: "mydb.tamk.fi",
    user: "cpsvva",
    password: "6S52I9So",
    database: "dbcpsvva2"
};

exports.getUser = (req, res) => {
    // Validate request
    if ((req.params.pass != secret) || (!req.params.email)) {
        console.log(req.params);
        res.status(403).send({ message: "Bad request" });
        return;
    }

    var con = mysql.createConnection(db_params);

    con.connect((err) => {
        if (err) {
            res.status(500).send({ message: "Internal error" });
        }
        con.query(`SELECT * FROM user WHERE email = "${req.params.email}"`, (err, result, fields) => {
            if (err) {
                res.status(500).send({ message: "Internal error" });
            }
            res.send(result[0]);
          });
      });
}

exports.createUser = (req, res) => {
    // Validate request
    if ((req.params.pass != secret) || (!req.body.user)) {
        res.status(400).send({ message: "Bad request" });
        return;
    }

    var con = mysql.createConnection(db_params);

    con.connect((err) => {
        if (err) {
            res.status(500).send({ message: "Internal error" });
        }
        con.query(`INSERT INTO user (id, first_name, last_name, email, password) values (default, "${req.body.user.first_name}", "${req.body.user.last_name}", "${req.body.user.email}", "${req.body.user.pass}")`, (err,result,fields) => {
            if (err) {
                res.status(500).send({
                    message: "Internal error"
                });
                return
            }
            res.status(200).send({
                message: "User successfully created"
            });
        });
    });
} 

exports.getTaskList = (req, res) => {
    if ((req.params.pass != secret) || (!req.params.user_id)) {
        res.status(400).send({ message: "Bad request" });
        return;
    }

    var con = mysql.createConnection(db_params);

    con.connect((err) => {
        if (err) {
            res.status(500).send({ message: "Internal error" });
            return;
        }
        con.query(`SELECT name, description, weight, type, goal, completion.completion, task.id AS 'task_id' FROM task INNER JOIN assignment ON assignment.task_id = task.id INNER JOIN role ON role.role_id = assignment.role_id INNER JOIN user ON user.id = role.user_id INNER JOIN completion ON (completion.user_id = user.id AND completion.task_id = task.id) WHERE user.id = ${req.params.user_id};`, (err, result, fields) => {
            if (err) {
                res.status(500).send({
                    message: "Internal error"
                });
                return;
            }
            res.send(result);
        });
    });
}

exports.updateTask = (req, res) => {
    if ((req.params.pass != secret) || (!req.body)) {
        res.status(400).send({ message: "Bad request" });
        return;
    }

    var con = mysql.createConnection(db_params);

    con.connect((err) => {
        if (err) {
            res.status(500).send({ message: "Internal error" });
            return;
        }
        con.query(`UPDATE completion SET completion.completion = ${req.body.value} WHERE user_id = ${req.body.user_id} AND task_id = ${req.params.task_id};`, (err, result, fields) => {
            if (err) {
                res.status(500).send({
                    message: "Internal error"
                });
                return;
            }
            res.status(200).send({
                message: "UPDATE successful"
            });
        });
    });
}

exports.getReport = (req, res) => {
    if (req.params.pass != secret) {
        res.status(400).send({ message: "Bad request" });
        return;
    }

    var con = mysql.createConnection(db_params);

    con.connect((err) => {
        if (err) {
            res.status(500).send({ message: "Internal error" });
            return;
        }
        con.query(`SELECT password, organization_id FROM user INNER JOIN role ON user.id = role.user_id WHERE user_id = ${req.body.user_id} AND role_id = 0;`, (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: "Internal error"
                });
                return;
            }
            if (result[0].password != req.body.pass) {
                res.status(400).send({ message: "Bad request" });
                return;
            }
            req.body.organization_id = result[0].organization_id;
            con.query(`SELECT user.id, first_name, last_name, email, SUM(weight*completion.completion/goal)/SUM(weight) AS 'rating' FROM user INNER JOIN completion ON user.id = completion.user_id INNER JOIN task ON completion.task_id = task.id WHERE user.organization_id = ${req.body.organization_id} group by user_id;`, (err2, result2, fields2) => {
                if (err2) {
                    console.log(err2);
                    res.status(500).send({
                        message: "Internal error"
                    });
                    return;
                }
                res.status(200).send(result2);
            });
        });
    });
}


exports.getIndividualReport = (req, res) => {
    if (req.params.pass != secret) {
        res.status(400).send({ message: "Bad request" });
        return;
    }

    var con = mysql.createConnection(db_params);

    con.connect((err) => {
        if (err) {
            res.status(500).send({ message: "Internal error" });
            return;
        }
        con.query(`SELECT password, organization_id FROM user INNER JOIN role ON user.id = role.user_id WHERE user_id = ${req.body.user_id} AND role_id = 0;`, (err, result, fields) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message: "Internal error"
                });
                return;
            }
            if (result[0].password != req.body.pass) {
                res.status(400).send({ message: "Bad request" });
                return;
            }
            req.body.organization_id = result[0].organization_id;
            con.query(`SELECT first_name, last_name, email, name, description, weight, type, goal, completion.completion FROM user INNER JOIN completion ON user.id = completion.user_id INNER JOIN task ON completion.task_id = task.id WHERE user.organization_id = ${req.body.organization_id} AND user.id = ${req.params.user_id};`, (err2, result2, fields2) => {
                if (err2) {
                    console.log(err2);
                    res.status(500).send({
                        message: "Internal error"
                    });
                    return;
                }
                res.status(200).send(result2);
            });
        });
    });
}