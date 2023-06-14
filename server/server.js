require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();
const sanitizeHtml = require("sanitize-html");

const pool = require("./config/database.js");
const {
  sendingGet,
  sendingGetError,
  sendingGetById,
  sendingPost,
  sendingPut,
  sendingDelete,
  sendingInfo,
} = require("./config/sending.js");
const cors = require("cors")

//#region middlewares
app.use(express.json());
app.use(cors())
//#endregion middlewares

//#region cartoons
app.get("/cartoons", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql =  `
    SELECT cartoons.id, cartoons.name,numberOfSeasons,numberOfEpisodes,countries.name countriesId,creators.name creatorsId,runningTime,DATE_FORMAT(AiringStart, '%Y-%m-%d') AiringStart, DATE_FORMAT(AiringEnd, '%Y-%m-%d') AiringEnd FROM cartoons
    INNER JOIN countries on countriesId = countries.id
    INNER JOIN creators on creatorsId = creators.id
;
    `;
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/cartoons/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    //   const sql = `
    //   SELECT * FROM cars
    // WHERE id = ${id}
    //   `;
    const sql = `
    SELECT cartoons.id, cartoons.name,numberOfSeasons,numberOfEpisodes,countries.name countriesId,creators.name creatorsId,runningTime,DATE_FORMAT(AiringStart, '%Y-%m-%d') AiringStart, DATE_FORMAT(AiringEnd, '%Y-%m-%d') AiringEnd FROM cartoons
    INNER JOIN countries on countriesId = countries.id
    INNER JOIN creators on creatorsId = creators.id
    WHERE cartoons.id = ?
;
      ;
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/cartoons", (req, res) => {
  console.log(req.body);
  const newR = {
    name: mySanitizeHtml(req.body.name),
    numberOfSeasons: +mySanitizeHtml(req.body.numberOfSeasons),
    numberOfEpisodes: +mySanitizeHtml(req.body.numberOfEpisodes),
    countriesId: +mySanitizeHtml(req.body.countriesId),
    creatorsId: +mySanitizeHtml(req.body.creatorsId),
    runningTime: +mySanitizeHtml(req.body.runningTime),
    AiringStart: mySanitizeHtml(req.body.AiringStart),
    AiringEnd: mySanitizeHtml(req.body.AiringEnd),
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT cartoons
    (name,numberOfSeasons,numberOfEpisodes,countriesId,creatorsId,runningTime,AiringStart,AiringEnd)
    VALUES 
    (?,?,?,?,?,?,?,?);
    `;
    connection.query(
      sql,
      [newR.name, newR.numberOfSeasons, newR.numberOfEpisodes,newR.countriesId,newR.creatorsId,newR.runningTime,newR.AiringStart,newR.AiringEnd],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/cartoons/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    name: mySanitizeHtml(req.body.name),
    numberOfSeasons: +mySanitizeHtml(req.body.numberOfSeasons),
    numberOfEpisodes: +mySanitizeHtml(req.body.numberOfEpisodes),
    countriesId: +mySanitizeHtml(req.body.countriesId),
    creatorsId: +mySanitizeHtml(req.body.creatorsId),
    runningTime: +mySanitizeHtml(req.body.runningTime),
    AiringStart: mySanitizeHtml(req.body.AiringStart),
    AiringEnd: mySanitizeHtml(req.body.AiringEnd),
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE cartoons SET
    name=?,
    numberOfSeasons= ?,
    numberOfEpisodes= ?,
    countriesId= ?,
    creatorsId= ?,
    runningTime= ?,
    AiringStart= ?,
    AiringEnd= ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.name, newR.numberOfSeasons, newR.numberOfEpisodes,newR.countriesId,newR.creatorsId,newR.runningTime,newR.AiringStart,newR.AiringEnd, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/cartoons/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    DELETE from cartoons
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

app.get("/countrycreatorAbc", (req, res) => {
  let sql = `SELECT co.id, co.name ,cr.id , cr.name FROM countries co
  INNER JOIN creators cr on co.id = cr.id
  order by cr.name, co.name`;

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingGetError(res, "Server connecting error!");
      return;
    }
    connection.query(sql, async function (error, results, fields) {
      if (error) {
        message = "Datas sql error";
        sendingGetError(res, message);
        return;
      }
      sendingGet(res, null, results);
    });
    connection.release();
  });
});

//#endregion cartoons

//#region countries
app.get("/countries", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = "SELECT * FROM countries";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});
app.get("/countriesAbc", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql =  `
    SELECT name, id from countries
  order by name;
;
    `;
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});


app.get("/countries/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    //   const sql = `
    //   SELECT * FROM cars
    // WHERE id = ${id}
    //   `;
    const sql = `
    SELECT * FROM countries
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/countries", (req, res) => {
  console.log(req.body);
  const newR = {
    name: mySanitizeHtml(req.body.name),
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT INTO countries
      (name)
      VALUES
      (?)
    `;
    connection.query(
      sql,
      [newR.name],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/countries/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    name: mySanitizeHtml(req.body.name),
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE countries SET
    name = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.name, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/countries/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    DELETE from countries
    WHERE id = ?
    `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

//#endregion countries

//#region creators

app.get("/creators", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = "SELECT * FROM creators";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/creatorsABC", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql =  `
    SELECT name, id from creators
  order by name;
;
    `;
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/creators/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    //   const sql = `
    //   SELECT * FROM cars
    // WHERE id = ${id}
    //   `;
    const sql = `
    SELECT * FROM creators
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/creators", (req, res) => {
  console.log(req.body);
  const newR = {
    name: mySanitizeHtml(req.body.name),
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT INTO creators
      (name)
      VALUES
      (?)
    `;
    connection.query(
      sql,
      [newR.name],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/creators/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    name: mySanitizeHtml(req.body.name),
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE creators SET
    name = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.name, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/creators/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    DELETE from creators
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

//#endregion creators

function mySanitizeHtml(data) {
  return sanitizeHtml(data, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
