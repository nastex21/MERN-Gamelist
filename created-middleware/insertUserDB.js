module.exports = function insertDB (req, res, next){
    console.log("called InsertDB");
    console.log(req);
    next();
}