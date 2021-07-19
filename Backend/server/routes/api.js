const express = require('express')
const router = express.Router()
const Sequelize=require('sequelize')
const sequelize=new Sequelize("mysql://root:@localhost:3306/crm");

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })



router.get('/clients',function(req,res){
const from=req.query.from;
const to =req.query.to
sequelize.query(`
SELECT * 
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
.then(function([results,metadata]){
    res.send(results)
})

})
router.get('/test',function(req, res){
    res.send(" test works ")
})


module.exports = router