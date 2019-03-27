const mongoUtil = require('../utilities/MongoUtility');
var ObjectID = require('mongodb').ObjectID;


module.exports.listCompanies = async function (req, res) {
    let database = await mongoUtil.createMongoConnection();
    if (!database) {
        res.json({ status: false, msg: 'Opps something want wrong!' });
        return
    }
    let db = database.db('jlloyds');
    var input = req.body;
    db.collection('companies').find().toArray(function (err, result) {
        if (err) {
            res.json({ status: false, msg: 'Opps something want wrong!' });
            database.close();
            return;
        }
        if (!result) {
            res.json({ status: false, msg: "No record found" });
            database.close();
            return;
        }
        res.json({ status: true, data: result });
        database.close();
        return;
    })
}

module.exports.getCompanyStatus = async function (req, res) {
    let database = await mongoUtil.createMongoConnection();
    if (!database) {
        res.json({ status: false, msg: 'Opps something want wrong!' });
        return
    }
    let db = database.db('jlloyds');
    var input = req.body;
    db.collection('companies').findOne({ companyName: input.companyName, licenceStatus:true }, function (err, company) {
        if (err) {
            res.json({ status: false, msg: 'Opps something want wrong!' });
            database.close();
            return;
        }
        if (!company) {
            res.json({ status: "false" });
            database.close();
            return;
        }
        res.json({ status: "success", data: company });
        database.close();
        return;
    })
}



module.exports.updateCompany = async function (req, res) {
    let database = await mongoUtil.createMongoConnection();
    if (!database) {
        res.json({ status: false, msg: 'Opps something want wrong!' });
        return
    }
    let db = database.db('jlloyds');
    var input = req.body;
    db.collection('companies', function (err, collection) {
        collection.findOne({ _id: ObjectID(input._id) }, function (err, company) {
            if (err) {
                res.json({ status: false, msg: 'Opps something want wrong!' });
                return
            }
            if (!company) {
                res.json({status:false,msg:'Invelid _id'});
                database.close();
                return;
            }
            var firstName = input.firstName ? input.firstName : company.firstName;
            var lastName = input.lastName ? input.lastName : company.lastName;
            var email = input.email ? input.email : company.email;
            var licenceStartDate = input.licenceStartDate ? input.licenceStartDate : company.licenceStartDate;
            var licenceEndDate = input.licenceEndDate ? input.licenceEndDate : company.licenceEndDate;
            var licenceStatus = input.licenceStatus ? input.licenceStatus : company.licenceStatus;
            console.log('lastName',lastName,licenceEndDate)
            db.collection('companies', function (err, collection) {
                collection.updateOne({ _id: ObjectID(input._id) }, { $set: { firstName: firstName, lastName: lastName, email: email, licenceStartDate: licenceStartDate, licenceEndDate: licenceEndDate, licenceStatus: licenceStatus} }, function (err, result) {
                    if (err) {
                        res.json({ status: false, msg: 'Opps something want wrong!' });
                        return
                    }
                    if (result.result.nModified == 0) {
                        res.json({status:false,msg:'Enter atleast one different value'});
                        database.close();
                        return;
                    }
                    res.json({ status: true, msg: 'Company updated successfuly!' });
                    database.close();
                    return;
                })
            })
        })
    })
}
