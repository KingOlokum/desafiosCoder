import express from "express";

import UserManager from "./data/fs/files/users.fs.js";
import UsersManager from "./data/fs/files/users.fs.js";

import ProductsManager from "./data/fs/files/products.fs.js";

const server = express();

const PORT = 8080;

const ready = () => console.log("server ready on prot " + PORT);

server.listen(PORT, ready);

// Middlewares

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Enpoint de Usuarios

server.get("/api/users", async (req, res) => {
  try {
    const all = await UserManager.readFile();

    if (all.length === 0) {
      //throw new Error("Not fount users");
      return res./*status(404).*/ json({
        statusCode: 400,
        message: "Not fount users",
      });
    }

    console.log(all);

    return res.json({
      statusCode: 200,
      Response: all,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    const one = await UsersManager.readOne(uid);
    if (!one) {
      return res.json({
        statusCode: 404,
        message: "User not found",
      });
    }
    console.log(one);

    return res.json({
      statusCode: 200,
      Response: one,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

// Enpoint de Productos

server.get("/api/products", async (req, res) => {
  try {
    const all = await ProductsManager.readFile();

    if (all.length === 0) {
      return res.json({
        statusCode: 404,
        message: "Not found products",
      });
    }
    return res.json({
      statusCode: 200,
      Response: all,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await ProductsManager.readOne(pid);

    if (!one) {
      return res.json({
        statusCode: 404,
        message: "Not found product",
      });
    } else {
      return res.json({
        statusCode: 200,
        Response: one,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

