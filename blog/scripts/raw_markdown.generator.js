var fs = require('hexo-fs');

hexo.extend.generator.register('raw_markdown', function(locals){
  // console.log(locals.posts.data[locals.posts.data.length - 1]);process.exit();
  var list = {posts: [], pages: []};
  var ret = [];
  var posts = locals.posts.data.filter(function(post) {
    return post.published;
  }).map(function(post) {
    var source = post.source.split('/')[1];
    var path = 'raw/posts/' + (source || post.slug + '.md');
    list.posts.push(path);
    return {
      path: path,
      data: post.raw
    };
  });
  var pages = locals.pages.data.map(function(page) {
    var path = 'raw/pages/' + page.source;
    list.pages.push(path);
    return {
      path: path,
      data: page.raw
    };
  });
  ret = ret.concat(posts).concat(pages).concat([{
    path: 'raw/list.json',
    data: JSON.stringify(list)
  }]);
  return ret;
});