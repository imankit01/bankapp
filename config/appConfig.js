let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
  
  // uri: 'mongodb://imankit012:Abcd@1234@ds113870.mlab.com:13870/bankapp'
   uri: 'mongodb://localhost:27017/bankapp'
  }
appConfig.apiVersion = '/api/v1';


module.exports = {
    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db :appConfig.db,
    apiVersion : appConfig.apiVersion
};
