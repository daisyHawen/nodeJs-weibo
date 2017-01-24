var mongodb = require('./db.js')

function Post(username, post, time) {
    this.user = username;
    this.post = post;
    if (time) {
        this.time = time;
    } else {
        this.time = new Date()
    }
    // this.time = user.email;
}
module.exports = Post;

Post.prototype.save = function(callback) {
    // body...
    var post = {
        user: this.user,
        post: this.post,
        time: this.time
    }
    console.log('open posts....')
    mongodb.open(function(err, db) {
        if (err) {
            // console.log('User open err')
            return callback(err);
        }
        db.collection('posts', function(err, collection) {
            // console.log(err)
            console.log('posts open success')
            if (err) {
                mongodb.close();
                return callback(err);
            }
            console.log('User open success')

            //为name属性添加索引
            var doc1 = post;
            collection.ensureIndex('user');
            //写入user文档
            collection.insert(doc1, { safe: true }, function(err, result) {
                mongodb.close();
                callback(err, post);
            });

        })
    })
};
Post.get = function(username, callback) {
    // body...
    mongodb.open(function(err, db) {
        if (!err) {
            console.log("We are connected");
            db.collection('posts', function(err, collection) {
                var query = {};
                if (username) {
                    query.user= username
                }
                collection.find(query).sort({ time: -1 }).toArray(function(error, docs) {
                    console.log('model/docs:'+docs);
                    if (docs) {
                        var posts = [];
                        docs.forEach(function(doc, index) {
                            var post = new Post(doc.user, doc.post, doc.time);
                            posts.push(post);
                        })
                        console.log('mongodb closed')
                        mongodb.close();
                        return callback(null, posts);
                    }
                    mongodb.close();
                    return callback(err);
                });
            });
        }
    });
};
