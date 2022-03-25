const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 4000;
app.use(cors());

const pg = new Pool({
    host: "materialized",
    port: 6875,
    user: "materialize",
    password: "materialize",
    database: "materialize",
});

app.get("/", (req, res) => {
    const { query } = req;
    const { raw_query } = query;

    pg.connect((err, client, done) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
            done();
            return;
        }

        try {
            client
                .query(raw_query)
                .then(({ rows, fields }) => {
                    const columns = [];
                    for (field of fields) {
                        columns.push(field.name);
                    }

                    res.send({ rows, columns });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).send(err);
                });

            done();
        } catch (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
