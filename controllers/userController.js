const userHelpers = require('../helpers/userHelpers')

module.exports={
    getAvailableServices:((req, res)=>{
        console.log(req.body);
        const data = req.body
        userHelpers.findServices(data).then((response)=>{
            if(response==='data not fount'){
                res.json({status:'Err'})
            }else{
                res.json({status:'done', data:response})
            }
        })
    })
}