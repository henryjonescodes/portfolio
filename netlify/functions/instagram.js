require('isomorphic-fetch');

const url = `https://www.instagram.com/graphql/query/? query_hash=e769aa130647d2354c40ea6a439bfc08&variables= {"id":"519208", "first":4}`;
const url = `https://www.instagram.com/graphql/query/?query_hash=8c2a529969ee035a5063f2fc8602a0fd&variables=%7B%22id%22%3A%2220460177%22%2C%22first%22%3A12%2C%22after%22%3A%22QVFCUXdBNlJrLUxmTFNPYW5ONnZtTURLcXZkN1pRSFJWZ2pmWnJrc1lseDhLUTAtdDQwYzRWYnpaRTh4Y0MwSDVYNXV1bUJFMVRpTFdRTGNhYU5vTncyYQ%3D%3D%22%7D`;

async function getPosts() {
    const data = await fetch(url). then (res => res.json());
    console.log (data);
    return data;
}

exports.handler = function(event, context, callback) {
    // const posts = await getPosts();
    callback(null, {
        statusCode: 200,
        // body: JSON.stringify(posts),
        body: "Hello World",
    });
};
