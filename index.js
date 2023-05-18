var http = require('http');
const {SecretsManagerClient,GetSecretValueCommand} = require("@aws-sdk/client-secrets-manager");






//create a server object:
http.createServer(async function (req, res) {
  res.write('A Monk in Cloud');
  const secret_name = "test-secret-manager";
  let response;

const client = new SecretsManagerClient({
  region: "us-east-2",
});
 //write a response to the client
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    console.log("Error in Secrets", error)
    res.send("Error in Secrets" ,error)
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
  const secret = response.SecretString;
  console.log("Secret...", secret)
  console.log("Secret",{secret});
  res.end(); //end the response
}).listen(80); //the server object listens on port 80
