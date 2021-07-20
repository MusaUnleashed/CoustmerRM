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
    const to = req.query.to ||200
    sequelize.query(`
SELECT client.id as id,first,last,country, email_type.email_type, sold,owner
From 
client,owner,country,email_type
WHERE
client.owner_id=owner.id 
AND
client.country_id=country.id
AND 
client.email_type_id=email_type.id
LIMIT ${from},${to}
`
    )
        .then(function ([results, metadata]) {
            res.send(results)
        })

})


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

module.exports = router