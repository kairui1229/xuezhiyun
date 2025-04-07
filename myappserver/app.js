var createError = require('http-errors');
var express = require('express');
var history = require('connect-history-api-fallback');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var RightRouter = require('./routes/RightRouter');
var RoleRouter = require('./routes/RoleRouter');
var UserRouter = require('./routes/UserRouter');
var TagRouter = require('./routes/TagRouter');
var ClassRouter = require('./routes/ClassRouter');
var StudentRouter = require('./routes/StudentRouter');
var CompanyRouter = require('./routes/CompanyRouter');
var CompanyStudentRouter = require('./routes/CompanyStudentRouter');

const JWT = require('./util/JWT');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(history());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// JWT 认证中间件 (代理请求应跳过 JWT 验证)
app.use((req, res, next) => {
  if (req.url.startsWith("/adminapi")) {
    return next(); // 让代理中间件处理
  }

  if (req.url === "/adminapi/users/login") {
    next();
    return;
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  if (token) {
    var payload = JWT.verify(token);
    if (payload) {
      const newToken = JWT.generate(
        {
          _id: payload._id,
          username: payload.username
        },
        "12h"
      );

      res.header("Authorization", newToken);
      return next();
    } else {
      return res.status(401).send({ errorCode: -1, errorInfo: "token过期" });
    }
  } else {
    return res.status(401).send({ errorCode: -2, errorInfo: "未授权" });
  }
});

// 代理中间件 (必须放在 JWT 认证后)
// app.use(
//   '/adminapi',
//   createProxyMiddleware({
//     target: 'http://localhost:3000',
//     changeOrigin: true
//   })
// );

// 业务路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(RightRouter);
app.use(RoleRouter);
app.use(UserRouter);
app.use(TagRouter);
app.use(ClassRouter);
app.use(StudentRouter);
app.use(CompanyRouter);
app.use(CompanyStudentRouter);

// 404 处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
