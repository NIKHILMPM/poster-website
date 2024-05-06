import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: parseInt(process.env.COOKIE_MAX_AGE)
  }
}))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json())
app.use(express.static("public"))


const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database successfully!');
  }
});

//---------------------------------------------handles api routes for backend-----------------------------------------------------

app.get('/', async (req, res) => {
  try {
    const u = await db.query("SELECT * FROM users ORDER BY id ASC");
    const p = await db.query('SELECT * FROM posters ORDER BY id ASC');
    const o = await db.query(`
    SELECT orders.*, users.email, posters.title, posters.image_src
    FROM orders
    JOIN users ON orders.uid = users.id 
    JOIN posters ON orders.pid = posters.id
    ORDER BY orders.id ASC`);

    const users = u.rows;
    const orders = o.rows;
    const posters = p.rows;

    console.log(orders)

    res.render("index.ejs", {
      users: users,
      orders: orders,
      posters: posters
    })

  } catch (err) {
    console.log(err);
  }
})

app.post("/deleteUser", async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id=($1)', [req.body.id])
    res.redirect("/")
  } catch (err) { console.log(err) }
})

app.post("/approveCancel", async (req, res) => {
  const uid = parseInt(req.body.uid);
  const id = parseInt(req.body.id);
  const pid = parseInt(req.body.pid);
  const quantity = req.body.quantity;
  const price = parseInt(req.body.price);

  const date = new Date();

  try {
    await db.query("INSERT INTO orderhist(pid, uid, oid, orderStatus, date, quantity, price) VALUES($1, $2, $3, $4, $5, $6, $7) ", [pid, uid, id, 'cancel', date, quantity, price]);
    await db.query('DELETE FROM orders WHERE id=($1)', [id]);
    await db.query('UPDATE posters SET quantity = quantity + ($1) WHERE id = ($2)', [quantity, pid]);

    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/denyOrder", async (req, res) => {
  const uid = parseInt(req.body.uid);
  const oid = parseInt(req.body.id);
  const pid = parseInt(req.body.pid);
  const quantity = req.body.quantity;
  const price = parseInt(req.body.price);
  const date = new Date();

  try {
    await db.query("INSERT INTO orderhist(pid, uid, oid, orderStatus, date, quantity, price) VALUES($1, $2, $3, $4, $5, $6, $7) ", [pid, uid, oid, 'deny', date, quantity, price]);
    await db.query('DELETE FROM orders WHERE id=($1)', [oid])
    await db.query('UPDATE posters SET quantity=quantity+($1) WHERE id=($2)', [quantity, pid])

    res.redirect("/")
  } catch (err) { console.log(err) }

})

app.post("/sendOrder", async (req, res) => {
  const uid = parseInt(req.body.uid);
  const oid = parseInt(req.body.id);
  const pid = parseInt(req.body.pid);
  const quantity = parseInt(req.body.quantity);
  const price = parseInt(req.body.price);
  const date = new Date();

  try {
    await db.query("INSERT INTO orderhist(pid, uid, oid, orderStatus, date, quantity, price) VALUES($1, $2, $3, $4, $5, $6, $7) ", [pid, uid, oid, 'sent', date, quantity, price]);
    await db.query('DELETE FROM orders WHERE id=($1)', [oid])
    res.redirect("/")
  } catch (err) { console.log(err) }

})


app.post("/denyCancel", async (req, res) => {
  try {
    await db.query('UPDATE orders SET status=false WHERE id=$1', [req.body.id])
    res.redirect("/")
  } catch (err) { console.log(err) }
})


app.post("/changeQuantity", async (req, res) => {
  const quantity = parseInt(req.body.newQuantity);
  const pid = parseInt(req.body.pid);

  try {
    await db.query('UPDATE posters SET quantity=$1 WHERE id=$2', [quantity,pid])
    res.redirect("/")
  } catch (err) { console.log(err) }

})

app.post("/deletePoster", async (req, res) => {
  const pid = parseInt(req.body.pid);

  try {
    await db.query('DELETE FROM posters WHERE id=$2', [pid])
    res.redirect("/")
  } catch (err) { console.log(err) }

})


//---------------------------------------------handles api routes for frontend-----------------------------------------------------
//GET
//getting posters
app.get('/api/products', async (req, res) => {
  console.log("getting all products")
  try {
    const result = await db.query("SELECT * FROM posters WHERE quantity>0 ORDER BY id ASC");
    // console.log(result.rows[0]);
    res.json(result.rows);
  } catch (err) {
    console.log(err)
  }
})

//log out
app.get('/api/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid'); // Clear the session cookie
});

//auth
app.get("/api/auth", (req, res) => {
  console.log("home page")
  if (req.session._id) {
    // console.log("home : " + req.session._id);
    return res.json({ valid: true, id: req.session._id, username: req.session.username, email: req.session.email })
  } else {
    return res.json({ valid: false })
  }
});

//getting cart items
app.get('/api/cartitems', async (req, res) => {
  console.log("getting cart items")
  try {
    // Await the database query
    const response = await db.query(`SELECT usercart.*, users.email, posters.title,posters.image_src
      FROM usercart
      JOIN users ON usercart.uid = users.id
      JOIN posters ON usercart.pid = posters.id
      WHERE usercart.uid = ($1)`, [req.session._id]);

    console.log(response.rows);
    res.json(response.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//getting ordered items
app.get('/api/orders', async (req, res) => {
  try {
    const response = await db.query(`SELECT orders.*, users.email, posters.title, posters.image_src
    FROM orders
    JOIN users ON orders.uid = users.id
    JOIN posters ON orders.pid = posters.id
    WHERE orders.uid = ($1)`, [req.session._id]);

    // console.log(response.rows);
    res.json(response.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//getting order history
app.get("/api/getOrderHistory", async (req, res) => {
  try {
    const response = await db.query("SELECT orderhist.*, posters.title, posters.image_src FROM orderhist JOIN posters ON posters.id = orderhist.pid WHERE uid = $1 ORDER BY orderhist.id ASC", [req.session._id]);
    res.json(response.rows)
  } catch (err) {
    console.log(err);
    res.status(500)
  }
})

// Getting specific product
app.get("/api/getProduct", async (req, res) => {
  console.log("getting specific product");
  const pid = req.query.pid; // Access pid from req.query
  console.log("pid: " + pid + " ," + typeof (pid));
  try {
    const response = await db.query("SELECT * FROM posters WHERE id=($1)", [pid]);
    console.log(response.rows[0]);
    res.json(response.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
//POST
//posting login data
app.post('/api/login', async (req, res) => {
  console.log("log-in page");
  const { email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1 ORDER BY id ASC", [email]);
    if (user.rows.length < 0) {
      res.json(false); // User with the provided email already exists
    } else if (password == user.rows[0].password && email == user.rows[0].email) {
      req.session.email = user.rows[0].email;
      req.session.username = user.rows[0].username;
      req.session._id = user.rows[0].id;
      console.log(req.session.email);
      res.json({ login: true });
    } else {
      res.json({ login: 'null' }); // Send back the newly created user
    }
  } catch (err) {
    console.error(err);
    res.json({ login: false });
  }

});

//posting registration data
app.post('/api/signup', async (req, res) => {
  console.log("sign up page");
  const { username, email, password } = req.body;

  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1 ORDER BY id ASC", [email]);
    if (user.rows.length > 0) {
      res.json(false); // User with the provided email already exists
    } else {
      const newUser = await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, password]);
      res.json(newUser.rows[0]); // Send back the newly created user
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//adding item in cart
app.post('/api/addcart', async (req, res) => {
  console.log("adding your item bro ", typeof (req.body.pid))

  const uid = req.session._id;
  const pid = parseInt(req.body.pid);
  try {
    const respando = await db.query('SELECT * FROM posters WHERE id=$1', [pid]);

    const price = parseInt(respando.rows[0].price);
    console.log("uid:" + uid + " pid:" + pid + " Price : " + price);

    const responsee = await db.query('SELECT * FROM usercart WHERE uid=$1 AND pid=$2 ORDER BY id ASC', [uid, pid]);
    const result = responsee.rows[0];
    if (!result) {
      await db.query(
        `INSERT INTO usercart(uid,pid,quantity,state,price) VALUES ($1,$2,$3,$4,$5)`,
        [uid, pid, 1, false, price]
      );
      const response = await db.query(`
        SELECT usercart.*, users.email, posters.title
        FROM usercart
        JOIN users ON usercart.uid = users.id
        JOIN posters ON usercart.pid = posters.id
        WHERE usercart.uid = ($1) 
        `, [uid]);

      res.json({ success: true, message: 'Item added to cart', cartItem: response.rows });

    } else {
      const resp = await db.query('SELECT * FROM posters WHERE id=$1', [pid]);
      const maxQuantity = parseInt(resp.rows[0].quantity);
      if (result.state === false) {
        const resultQuantity = parseInt(result.quantity);
        if (maxQuantity === resultQuantity) {
          await db.query('UPDATE usercart SET state=true WHERE uid=$1 AND pid=$2 ', [req.session._id, pid]);
          res.json({ success: true, message: 'Item quantity updated to maximum', condition: 'maxQuantityReached' });
        } else {
          await db.query(
            `UPDATE usercart SET quantity=quantity+1 WHERE uid=$1 AND pid=$2 `,
            [uid, pid]
          );

          const response = await db.query(`
          SELECT usercart.*, users.email, posters.title
          FROM usercart
          JOIN users ON usercart.uid = users.id
          JOIN posters ON usercart.pid = posters.id
          WHERE usercart.uid = ($1)
        `, [uid]);

          res.json({ success: true, message: 'Item quantity updated', cartItem: response.rows });
        }
      } else {
        res.json({ success: false, message: `We have only ${maxQuantity} for the poster ${resp.rows[0].title}. We are extremely sorry.`, condition: 'maxQuantityReached' });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'An error occurred while adding item to cart' });
  }
});


//changing the quantity in usercart
app.post('/api/changequantity', async (req, res) => {
  let { pid, quantity } = req.body;
  pid = parseInt(pid);
  quantity = parseInt(quantity);
  console.log(typeof (pid) + " " + typeof (quantity));
  try {
    const resp = await db.query('SELECT * FROM posters WHERE id=$1', [pid]);
    const price = resp.rows[0].price;
    console.log("uid:" + req.session._id + " pid:" + pid + " quantity: " + quantity + " Price : " + price);

    await db.query('UPDATE usercart SET quantity=$1, price=$2 WHERE uid=$3 AND pid=$4', [quantity, price * quantity, req.session._id, pid]);
    const response = await db.query(`
    SELECT usercart.*, users.email, posters.title,posters.image_src
    FROM usercart
    JOIN users ON usercart.uid = users.id
    JOIN posters ON usercart.pid = posters.id
    WHERE usercart.uid = ($1)
  `, [req.session._id]);
    res.json(response.rows);
  } catch (err) {
    res.sendStatus(500); // Sending 500 status code
  }
})


//adding items to orders and deleting same items of cart
app.post('/api/checkout', async (req, res) => {
  console.log("checkout page ", req.body);
  const cartItems = req.body;
  const date = new Date();
  try {

    for (const cartItem of cartItems) {
      await db.query('INSERT INTO orders (uid, pid, date, status,quantity,approve,price) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.session._id, cartItem.pid, date, false, cartItem.quantity, false, cartItem.price]);
    }

    for (const cartItem of cartItems) {
      await db.query('DELETE FROM usercart WHERE uid = $1 AND pid = $2', [req.session._id, cartItem.pid]);
    }

    for (const cartItem of cartItems) {
      await db.query('UPDATE posters SET quantity=quantity-$1 WHERE id = $2', [cartItem.quantity, cartItem.pid]);
    }

    res.status(200).json({ message: 'Checkout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//DELETE
//delete item from usercart
app.post('/api/dropitem', async (req, res) => {
  const pid = req.body.pid;
  console.log("backend" + pid)
  console.log('delete item ' + pid + " " + req.session._id);
  try {
    await db.query(`DELETE FROM usercart WHERE pid=$1 AND uid=$2`, [pid, req.session._id]);
    const response = await db.query(`
    SELECT usercart.*, users.email, posters.title,posters.image_src
    FROM usercart
    JOIN users ON usercart.uid = users.id
    JOIN posters ON usercart.pid = posters.id
    WHERE usercart.uid = ($1)
  `, [req.session._id]);

    res.json(response.rows);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
})

//delete item from orders
app.post('/api/cancelOrder', async (req, res) => {
  const id = parseInt(req.body.id);
  console.log('delete item ' + id + " " + req.session._id);
  try {
    await db.query(`UPDATE orders SET status = true WHERE id = $1`, [id]);
    const response = await db.query(`SELECT orders.*, users.email, posters.title, posters.image_src
    FROM orders
    JOIN users ON orders.uid = users.id
    JOIN posters ON orders.pid = posters.id
    WHERE orders.uid = ($1)`, [req.session._id]);
    res.json(response.rows);
  } catch (err) {
    console.log(err)
    res.sendStatus(500);
  }
})

//removing order history

app.post("/api/removeOrderHistory", async (req, res) => {
  const id = parseInt(req.body.id);

  try {
    await db.query("DELETE FROM orderhist WHERE id = $1", [id]);
    const response = await db.query("SELECT orderhist.*, posters.title, posters.image_src FROM orderhist JOIN posters ON posters.id = orderhist.pid WHERE uid = $1 ORDER BY orderhist.id ASC", [req.session._id]);

    res.json(response.rows)
  } catch (err) {
    res.status(500)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

