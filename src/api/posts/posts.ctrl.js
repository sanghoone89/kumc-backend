const Post = require("models/post");
const Joi = require("joi");
const { ObjectId } = require("mongoose").Types;

exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  console.log("id :", id);
  if (!ObjectId.isValid(id)) {
    ctx.status = 404;
    return null;
  }

  return next();
};
/**
 * POST /api/posts
 * {
    "vacation": [
     {
     	"title": "10월 테스트",
     	"body":"zz",
     	"vacationType": "종일",
		"startDate": "2019-10-02",
		"endDate": "2019-10-03",
		"officialHoliday": false
     }	
    ]
}
 */
exports.write = async ctx => {
  const schema = Joi.object().keys({
    vacation: Joi.array().required(),
    //name: Joi.String().required(),
    //startDate: Joi.String().required(),
    //endDate: Joi.String().required()
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { vacation } = ctx.request.body;
  console.log("vacation :", vacation);

  const post = new Post({
    vacation
  });

  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/**
 * GET /api/posts
 */
exports.list = async ctx => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/**
 * GET /api/posts/:id
 */
exports.read = async ctx => {
  const { id } = ctx.params;
  console.log(id);
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/**
 * DELETE /api/posts/:id
 */
exports.remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

/**
 * PATCH /api/posts/:id
 */
exports.update = async ctx => {
  const { id } = ctx.params;

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    }).exec();

    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
