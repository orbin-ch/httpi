import path from "path";

export default {
  entry: "./src/http-client.js",
  output: {
    path: "./dist",
    filename: "httpi.js",
    libraryTarget: "umd"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.resolve(__dirname, "src"),
      loader: "babel-loader"
    }]
  },
  externals: (context, request, done) => {
    if (!request.startsWith("./")) return done(null, request);
    done();
  }
};
