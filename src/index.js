require('dotenv').config();

const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const mongoose = require('mongoose');
const {
    PORT: port = 4000,
    MONGO_URI: mongoURI
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(()=>{
    console.log('connected to mongodb');
}).catch((e)=>{
    console.error(e);
});

const api = require('./api');
const app = new koa();
const router = new Router();

//router 설정
router.use('/api', api.routes());

//router 적용 전에 bodyParser적용
app.use(bodyParser());

//app 인스턴스에 router적용
app.use(router.routes()).use(router.allowedMethods());


app.listen(port, () => {
    console.log('listening to port', port);
})