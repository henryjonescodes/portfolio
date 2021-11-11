require('isomorphic-fetch');
const axios = require('axios').default;

// const url = `https://www.instagram.com/graphql/query/?query_hash=8c2a529969ee035a5063f2fc8602a0fd&variables=%7B%22id%22%3A%2220460177%22%2C%22first%22%3A12%2C%22after%22%3A%22QVFCUXdBNlJrLUxmTFNPYW5ONnZtTURLcXZkN1pRSFJWZ2pmWnJrc1lseDhLUTAtdDQwYzRWYnpaRTh4Y0MwSDVYNXV1bUJFMVRpTFdRTGNhYU5vTncyYQ%3D%3D%22%7D`;
// const url = `https://www.instagram.com/graphql/query/?query_hash=8c2a529969ee035a5063f2fc8602a0fd&variables={"id":"20460177", "first":12}`;
// const url = `https://www.instagram.com/graphql/query/?query_hash=d4d88dc1500312af6f937f7b804c68c3&variables=%7B%22user_id%22%3A%2220460177%22%2C%22include_chaining%22%3Afalse%2C%22include_reel%22%3Afalse%2C%22include_suggested_users%22%3Afalse%2C%22include_logged_out_extras%22%3Atrue%2C%22include_highlight_reels%22%3Atrue%2C%22include_live_status%22%3Afalse%7D`;

const cache = {
    lastFetch: 0,
    posts: null,
}

async function getPosts() {
    // const timeSinceLastFetch = Date.now() - cache.lastFetch
    // if(cache.lastFetch <= 1800000 && cache.posts != null) {
    //     return cache.posts;
    // }
    
    const data = await fetch(url).then(res => res.json());
    // const posts = slimUpPosts(data)
    console.log("DATA:", data);
    // cache.lastFetch = Date.now();
    // cache.posts = data;
    return data;
}

function slimUpPosts(edges){
    const slimPosts = edges.map(edge => ({
        thumbnail: edge.node.thumbnail_src,
        url: `https://instagram.com/p/${edge.node.shortcode}`,
        caption: edge.node.edge_media_to_caption.edges[0].node.text,
        id: edge.node.id,
        })
    );
    return slimPosts;
}

async function getInstagramPictures (profileName) {
    const baseUrl = "https://www.instagram.com";
    const profileUrl = `${baseUrl}/${profileName}`;
    const jsonDataUrl = `${profileUrl}/?__a=1`;
  
    const response = await fetch(jsonDataUrl);
    const jsonData = await response.json();
    const pictures = jsonData.graphql.user.edge_owner_to_timeline_media.edges;
  
    if (response.ok) {
      return pictures;
    } else {
      throw new Error(pictures);
    }
  }

exports.handler = async function(event, context, callback) {
    let posts = null;

    getInstagramPictures("nasa")
        .then(pictures => console.log("Pictures:", pictures))
        .catch(error => console.error("Error:", error));
    callback(null, {
        statusCode: 200,
        // headers:{
        //     'Content-Type' : 'application/json',
        // },
        // body: JSON.stringify(posts),
        // body: posts,
        // data: {},
    });
};

// exports.handler = async function(event, context, callback) {
//     const posts = await getPosts();
//     callback(null, {
//         statusCode: 200,
//         // headers:{
//         //     'Content-Type' : 'application/json',
//         // },
//         body: JSON.stringify(posts),
//         // data: {},
//     });
// };
