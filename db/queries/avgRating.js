const { db } = require("../server.js");

const getRating = function (resource_id) {
  const queryString = `
  SELECT resource.title,
  ROUND(AVG(rating)2) as average_rating
  FROM resource
  JOIN user_id ON resources.id = user_id.resource_id
  WHERE resource_id = $1 AND rating != 0
  GROUP BY resource.title;`;
  return db
    .query(queryString, [resource_id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => console.error(err.stack));
};

module.exports = { getRating };
