let express = require('express');
let router = express.Router();
let allPosts = require('../myPosts.json');

router.get('/:postId', function(req, res, next){
    // The workaround for showing the updates on the page after redirecting.
    // Otherwise after maling the patch request, the user would need to refresh page.
    setTimeout(() => {
        id = req.params.postId;
        post = allPosts.myPosts[id-1]; //We should look though and find the id rather than this
        let data = {
            postId: id,
            title: post.title,
            content: post.content
        }
        res.render('view-post', data);

    }, 150);
    // Note - 150ms is the lowest Ive tested with that works. 100ms is too quick for instance.
});

module.exports = router;