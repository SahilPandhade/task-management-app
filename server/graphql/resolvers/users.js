const { GraphQLError } = require('graphql')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) {
            //Check if user already exist (throw error)
            const oldUser = await User.findOne({ email })
            if (oldUser) {
                throw new GraphQLError('User already exists with email ' + email, {
                    extensions: {
                        code: 'USER_ALREADY_EXIST'
                    }
                })
            }
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: hash
            })

            const token = jwt.sign(
                { user_id: newUser._id, email },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '2h'
                }
            )
            newUser.token = token
            //Save user in mongodb
            const res = await newUser.save()

            return {
                user_id: res.id,
                userName:res.username,
                email:res.email,
                password:res.password
            }
        },
        async loginUser(_, { loginInput: { email, password } }) {

            const user = await User.findOne({ email }) //check if user exists

            if (user && (bcrypt.compare(password, user.password))) {    //check if exntered pass equals encrypted pass
                const token = jwt.sign(
                    { user_id: user._id,userName:user.username, email },
                    process.env.JWT_SECRET_KEY,
                    {
                        expiresIn: '2h'
                    }
                )
                user.token = token  //Attach token to found user model 
                console.log("this is login user ",user)
                return user
                    // user_id: user.id,
                    // userName:user.username,
                    // email:user.email,
                    // password:user.password,
                    // token:user.token
                
            } else {
                throw new GraphQLError('Incorrect password', {
                    extensions: {
                        code: 'INCORRECT_PASSWORD'
                    }
                })
            }
        }
    },
    Query: {
        user: (_, { ID }) => User.findById(ID)
    }
}