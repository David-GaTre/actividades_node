const sql = require('./db')

const Category = function(category) {
    this.id_category = category.id_category;
    this.id_parent = category.id_parent;
    this.id_shop_default = category.id_shop_default;
    this.level_depth = category.level_depth;
    this.active = category.active;
    this.name = category.name;
}

Category.getAll = (result) => {
    let query = "SELECT * FROM category";
    sql.query(query, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("categories: ", res);
        result(null, res);
    });
    };

Category.findById = (id, result) => {
    sql.query(`SELECT * FROM category where id_category = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found category: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Category.create = (newCategory, result) => {
    sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created category: ", { id: res.insertId, ...newCategory });
        result(null, { id: res.insertId, ...newCategory });
    });
};

Category.remove = (id, result) => {
    sql.query("DELETE FROM category WHERE id_category = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted category with id: ", id);
      result(null, res);
    });
};

Category.updateById = (id, category, result) => {
    sql.query(
      "UPDATE category SET id_parent = ?, id_shop_default = ?, level_depth = ?, active = ?, name = ? WHERE id_category = ?"
      [category.id_parent, category.id_shop_default, category.level_depth, category.active, category.name, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated category: ", { id: id, ...category });
        result(null, { id: id, ...category });
      }
    );
};

module.exports = Category