const mongoUtil = require('../utilities/MongoUtility');

module.exports.registerCompany = async function(req, res) {
    let database = await mongoUtil.createMongoConnection();
    if (!database) {
        res.json({status:false, msg:'Opps something want wrong!'});
        return
    }
    let db = database.db('jlloyds');
    console.log('signup function running....');
    var input = req.body;
    input.licenceStatus = false;
    input.registerTime = new Date();
    db.collection('companies').findOne({ companyName: input.companyName }, function(err, result) {
        if (err) {
            res.json({status:false, msg:'Opps something want wrong!'});
            database.close();
            return;
        }
        if (result) {
            res.json({ status: false, msg: "Company already exist!" });
            database.close();
            return;
        }
        db.collection('companies').insertOne(input, function(err, result) {
            if (err) {
                res.json({status:false, msg:'Opps something want wrong!'});
                database.close();
                return;
            }
            res.json({ status: true, msg: 'Company register successfully!' });
            database.close();
        })
    })
}
