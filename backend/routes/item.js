const express = require('express');
const connection = require("../db");

const router = express.Router();

router.get('/foodlist', function (req, res) {
  const query = 'SELECT * FROM foodlist';
  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      return res.status(500).send('Internal server error');
    }

    res.status(200).json({
      success: true,
      result: rows
    });
  });
});

router.get('/itemDetail', function (req, res) {

  const id = req.query.id;
  const query = `
  select *
  from foodlist
  where id = ${id};
  `;
  connection.query(query, async function (error, rows, fields) {
    if (error) {
      console.error(error);
      return res.status(500).send({
        error: true,
        message: 'Internal server error',
      });
    }

    // replace taglist
    let splittedTags = rows[0].taglist?.split(',');
    rows[0].taglist = splittedTags;

    // get ingredients
    // the ingredient is Name|Link,Name|Link
    let ingredients = rows[0].ingredientslist
      .split(',')
      .map(ingredient => {
        let splittedIngredient = ingredient.split('|');
        return {
          name: splittedIngredient[0],
          img: splittedIngredient[1]
        }
      });
    rows[0].ingredientslist = ingredients;

    res.json({
      success: true,
      result: {
        ...rows[0],
        ingredients
      }
    });
  });
});

router.get('/itemSearch', function (req, res) {
  let query = "SELECT * FROM foodlist"
  let whereClause = [] // WHERE a OR b OR c
  let andClause = [] // AND d AND e AND f

  if (req.query.id) {
    whereClause.push(`id = ${req.query.id}`)
  }
  if (req.query.name) {
    whereClause.push(`name LIKE '%${req.query.name}%'`)
  }
  if (req.query.tag) {
    whereClause.push(`taglist LIKE '%${req.query.tag}%'`)
  }
  if (req.query.description) {
    whereClause.push(`description LIKE '%${req.query.description}%'`)
  }
  if (req.query.minPrice) {
    andClause.push(`price >= ${req.query.minPrice}`)
  }
  if (req.query.maxPrice) {
    andClause.push(`price <= ${req.query.maxPrice}`)
  }

  if (whereClause.length > 0) {
    query += " WHERE " + whereClause.join(" AND ")
  }
  if (andClause.length > 0) {
    if (whereClause.length === 0) {
      query += " WHERE "
    } else {
      query += " AND "
    }
    query += andClause.join(" AND ")
  }

  console.log(query)

  connection.query(query, function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
    res.json({
      success: true,
      result
    });
  })
})

router.post('/itemSubmit', function (req, res) {
  // Extract the data from the request body
  const item = req.body

  // Use try catch to prevent app from crashing on inccorect input
  connection.query('INSERT INTO foodlist SET ?', item, function (error, results) {
    if (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: 'Invalid Input',
      });
    }
    return res.send({
      success: true,
      data: results.affectedRows,
      message: 'New item has been created successfully.',
    });
  });
});

router.put('/itemUpdate', function (req, res) {
  console.log(req.body)
  let id = req.body.id
  let item = req.body;

  connection.query("UPDATE foodlist SET ? WHERE id = ?", [item, id], function (error, results) {
    if (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: 'Invalid Input',
      });
    }

    return res.send({
      success: true,
      data: results.affectedRows,
      message: 'New item has been created successfully.',
    });
  });
});

router.delete('/itemDelete', function (req, res) {
  const id = req.query.id;

  connection.query('DELETE FROM foodlist WHERE id = ?', [id], function (error, results) {
    if (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: 'Invalid Input',
      });
    }
    return res.send({ success: true, data: results.affectedRows, message: 'item has been deleted successfully.' });
  });
});


module.exports = router;