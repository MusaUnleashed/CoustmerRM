const Sequelize = require('sequelize')
const sequelize=new Sequelize("mysql://root:@localhost:3306/crm");

const data=require('../../src/data.json')
const countries=require('./countries')
//!!!!! import data and countries

let owner = data.map(d => d.owner)
owner = owner.filter((elem, index, self) => index === self.indexOf(elem))

let emailType = data.map(d => d.emailType)
emailType = emailType.filter((elem, index, self) => index === self.indexOf(elem))


const addValue = async function (table, type) {
    let query =`INSERT INTO ${table} VALUES (null, '${type}')`
    let result = await sequelize.query(query)
    return result[0]
}

const findByID = async (table, name, value) => {
    let query = `SELECT id FROM ${table} WHERE ${name} = "${value}"`
    let results = await sequelize.query(query)
    return results[0][0].id
}

const addClient = async (client) => {
    let emailType = client.emailType !== null ? await findByID('email_type', 'email_type', client.emailType) : null
    let owner = await findByID('owner', 'owner', client.owner)
    let country = await findByID('country', 'country', client.country)
    let date = new Date (client.firstContact).toLocaleDateString()
    let nameSplit = client.name.split(' ')

    let query =`INSERT INTO client
    VALUES (null, '${nameSplit[1]}', '${nameSplit[0]}', '${client.email}', ${client.sold}, '${date}', ${emailType}, ${owner}, ${country})`
    let result = await sequelize.query(query)
    return result[0]
}

emailType.forEach(e => addValue('email_type', e))
countries.forEach(c => addValue('country', c))
owner.forEach(o => addValue('owner', o))
data.forEach(d => addClient(d))