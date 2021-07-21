const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const sequelize = new Sequelize("mysql://root:@localhost:3306/crm");

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })



router.get('/clients', function (req, res) {
    const from = req.query.from || 0;
    const to = req.query.to || 200
    sequelize.query(`
SELECT client.id as id,first,last,country, date,email_type , sold,owner
From 
client,owner,country,email_type
WHERE
client.owner_id=owner.id 
AND
client.country_id=country.id
AND 
client.email_type_id=email_type.id
 
`
    )
        .then(function ([results, metadata]) {
            res.send(results)
        })

})

router.get("/allClients", function (req, res) {
    sequelize
        .query(
            `SELECT * FROM client ,owner
         WHERE client.owner_id=owner.id
    `
        )
        .then(function ([clients, metadata]) {
            res.send(clients);
        });
});

router.get("/mostcountrysales", function (req, res) {
    sequelize
        .query(
            `SELECT a.country,MAX(total) FROM
    (SELECT country,count(*) as total  
    FROM country,client 
    WHERE client.country_id=country.id AND client.sold=1  
    GROUP BY country ) as a`
        )
        .then(function ([results, metadata]) {
            res.send(results);
        });
});
router.get("/salesByCountry", function (req, res) {
    sequelize
      .query(
        `SELECT country,count(*) AS Sales FROM client AS c , country AS co
    WHERE c.country_id=co.id AND sold=1
    GROUP BY country `
      )
      .then(function ([results]) {
        res.send(results);
      });
  });
  router.get("/topOwners", function (req, res) {
    sequelize
      .query(
        `SELECT owner.owner,COUNT(*) AS total FROM client ,owner
    WHERE client.owner_id=owner.id 
    AND sold=1 
    GROUP BY owner
    ORDER BY  total desc
    LIMIT 3`
      )
      .then(function ([results]) {
        res.send(results);
      });
  });


router.get('/owners', function (req, res) {
    sequelize.query(`
    SELECT *
    FROM owner
    `).then(function ([results, metadata]) {
        res.send(results)
    })



})

router.post('/clients', async (req, res) => {
    const newClient = req.body
    console.log(newClient)

    try {
        const countryId = await getCountryId(newClient.country);
        const ownerId = await getOwnerId(newClient.owner);
        addNewClient(newClient.firstName, newClient.lastName, ownerId, countryId)
    } catch (error) {

    }
}
)


router.put('/clients', async (req, res) => {
    const clientToUpdate = req.body
    // console.log("country  ",clientToUpdate.country)
    const country_id = await getCountryId(clientToUpdate.country)

    sequelize.query(`
    UPDATE client 
    SET
    first='${clientToUpdate.first}',
    last='${clientToUpdate.last}',
    country_id=${country_id}
    WHERE 
    client.id=${clientToUpdate.id}
    `).then(function ([results, metadata]) {
        console.log("--------------------------", results)
        res.send(results)
    })




})

router.put("/emails", function (req, res) {
    sequelize.query(
        `UPDATE client
       SET client.email_type_id=(SELECT id FROM email_type
       WHERE email_type.email_type="${req.query.email}")
       WHERE client.first="${req.query.name}"
    `
    );
    res.send("success");
});

router.put("/sold", function (req, res) {
    let clientName = req.query.name;

    sequelize.query(`UPDATE client 
    SET sold=1 
    WHERE first=${clientName}`);
});

router.put("/owners", function (req, res) {
    sequelize.query(
        `UPDATE client
       SET client.owner_id=(SELECT id FROM owner
       WHERE owner.owner="${req.query.owner}")
       WHERE client.first="${req.query.name}"
    `
    );
    res.send("success");
});








///////////////////
getCountryId = async (country) => {
    let countryID = await sequelize.query(`
SELECT c.id
FROM 
country as c
WHERE 
c.country='${country}'

`)
    return countryID[0][0].id


}

getOwnerId = async (owner) => {
    let OwnerID = await sequelize.query(`SELECT id FROM owner WHERE owner = '${owner}'`);

    if (!OwnerID[0][0]) {
        let ownerIdQuery = `INSERT INTO owner VALUES(null,'${owner}')`;
        OwnerID = await sequelize.query(`SELECT id FROM owner WHERE owner = '${owner}'`);
    }

    return OwnerID[0][0].id


}

getDate = () => {
    let date = new Date();
    let strDate = "m/d/Y"
        .replace("Y", date.getFullYear())
        .replace("m", date.getMonth() + 1)
        .replace("d", date.getDate());
    return strDate;
}

addNewClient = async (firstName, lastName, ownerId, countryId) => {
    const strDate = getDate()

    sequelize.query(`INSERT INTO client (last,first,date,sold,owner_id,country_id)
    VALUES ('${lastName}','${firstName
        }','${strDate}',${0},${ownerId},${countryId})`).
        then(function ([results, metadata]) {

        })

}

module.exports = router