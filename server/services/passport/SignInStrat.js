const { User } = require('../../models/User');


const localSignInStrat = new Strat( function(username, password, done){
        User.findOne({username: username})
    }   
)

module.exports = localSignInStrat;