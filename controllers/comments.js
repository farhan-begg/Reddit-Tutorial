const Post = require('../models/post');
const Comment = require('../models/comments');
const User = require('../models/user');

module.exports = function(app) {

    // CREATE Comment
    app.post("/posts/:postId/comments", function(req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);

        comment.author = req.user._id;

        console.log('///////')

        // SAVE INSTANCE OF Comment MODEL TO DB
        comment

            .save()
            .then(comment => {
                console.log(req.params.postId)
                return Post.findById(req.params.postId);
            })
            .then(post => {
                post.comments.unshift(comment);
                return post.save();

            })
            .then(post => {
                res.redirect(`/`);
                // res.redirect(`/posts/${post._id}`);
            })
            .catch(err => {
                console.log(err);
            });
    });
}





































// const Post = require('../models/post.js');
// const Comment = require('../models/comments')

// module.exports = (app) => {
// // CREATE Comment
//     app.post("/posts/:postId/comments", function(req, res) {
//         // INSTANTIATE INSTANCE OF MODEL
//         const comment = new Comment(req.body);

//         // SAVE INSTANCE OF Comment MODEL TO DB
//         comment
//         .save()
//         .then(comment => {
//             // REDIRECT TO THE ROOT
//             return Post.findById(req.params.postId);
//         })
//         .then(post => {
//             post.comments.unshift(comment);
//             return post.save();
//         })
//         .then(post => {
//             res.redirect(`/posts/${post._id}`);
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     });
// };