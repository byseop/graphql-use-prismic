const axios = require('axios');

module.exports.webhookForDev = async (event) => {
  console.log('serverless function START 🚀');
  console.log('event', event);
  const { secret } = JSON.parse(event.body);
  if (secret === process.env.TOY_SECRET) {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://common.jenkins.omnious.co.kr/job/toys/job/toy-graphql-use-prismic/job/develop/build',
        headers: {
          'Content-Type': 'application/json',
        },
        auth: {
          username: process.env.JENKINS_AUTH_USERNAME,
          password: process.env.JENKINS_AUTH_PASSWORD,
        },
      });
      console.log(response);
      console.log('serverless function SUCCESS 🤩');
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
          },
          null,
          2
        ),
      };
    } catch (e) {
      console.log('serverless function ERROR 🤮');
      throw new Error(e);
    }
  }
  console.log('Not matched secret.');
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Not mathced secret.',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.webhookForProd = async (event) => {
  // console.log('serverless function START 🚀');
  // console.log('event', event);
  const { secret } = JSON.parse(event.body);
  if (secret === process.env.TOY_SECRET) {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://common.jenkins.omnious.co.kr/job/toys/job/toy-graphql-use-prismic/job/master/build',
        headers: {
          'Content-Type': 'application/json',
        },
        auth: {
          username: process.env.JENKINS_AUTH_USERNAME,
          password: process.env.JENKINS_AUTH_PASSWORD,
        },
      });
      // console.log(response);
      // console.log('serverless function SUCCESS 🤩');
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Executed successfully!',
            input: event,
          },
          null,
          2
        ),
      };
    } catch (e) {
      console.log('serverless function ERROR 🤮');
      throw new Error(e);
    }
  }
  // console.log('Not matched secret.');
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Not mathced secret.',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
