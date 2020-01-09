const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();
const User = require('./UserSchema');

mongoose.connect('mongodb+srv://namipapa:Ice5548449@namipapa-zsvih.mongodb.net/test?retryWrites=true&w=majority');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/app/users', router);
app.listen(9000, () => {
    console.log('Back-end Start!');
});

router.get('/getall', (req, res) => {
    User.find((err, users) => {
        if(err) {
            res.status(404).json({message:'Not found'});
        }
        else{
            console.log('successful!');
            res.status(200).json(users);
        }
    })
})

router.get('/getone/:id', (req, res)=>{
    User.findById(req.params.id, (err, users)=>{
        if(err){
            res.status(501).json({message:'Can not find user!'});
        }
        res.json(users);
    })
})

router.post('/insertone', (req, res) => {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.sex = req.body.sex;
    user.age = req.body.age;
    user.password = req.body.password;
    user.save(err=>{
        res.status(501).end({message:'Created fail'});
    })
    res.status(200).json({message:'User created!'});
})

router.put('/editone/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id,
        {  
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           sex: req.body.sex,
           age: req.body.age,
           password: req.body.password
        }, (err, user) => {
            if(err){
                res.status(501).json({message:'Edit fail'});
            }else{
                res.json({message: 'Successfully updated'})
            }
        })
})

router.delete('/deleteone/:id', (req, res)=>{
    User.remove({
        _id:req.params.id
    }, (err, user) => {
        if(err) {
            res.json({message:'delete fail'});
        }else{
            res.json({message:'Successfual delete'});
        }
    })
})