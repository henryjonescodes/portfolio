exports.handler = async function(event, context) {
    console.log("im here")
    
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello World"})
    };
}