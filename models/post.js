const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");

const PostSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    summary: { type: String, required: true },
    subreddit: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    upVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
    downVotes : [{ type: Schema.Types.ObjectId, ref: "User"}],
    voteScore : {type: Number}
});

PostSchema
    .pre('findOne', function() {
        Populate('comments')
        Populate('author');
      })
    .pre('find', function() {
        Populate('comments')
        Populate('author');
    })

module.exports = mongoose.model("Post", PostSchema)


// PostSchema.pre("save", function(next) {
//     // SET createdAt AND updatedAt
//     const now = new Date();
//     this.updatedAt = now;

//     if (!this.createdAt) {
//       this.createdAt = now;
//     }

//     next();
//   });

//   module.exports = mongoose.model("Post", PostSchema);