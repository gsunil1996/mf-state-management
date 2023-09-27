const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    publicPath:
      argv.mode === "development"
        ? "http://localhost:8081/"
        : "https://mf-state-management.vercel.app/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images", // This is the directory where your images will be output
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "store",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./store": "./src/redux/store",

        // weatherApi actions
        "./getWeatherDataRemote":
          "./src/redux/weatherApi/actions/getWeatherData",

        // mern table actions
        "./addEmployee":
          "./src/redux/mernTable/actions/employeeActions/addEmployee",
        "./addEmployeeReset":
          "./src/redux/mernTable/actions/employeeActions/addEmployee",
        "./deleteEmployee":
          "./src/redux/mernTable/actions/employeeActions/deleteEmployee",
        "./deleteEmployeeReset":
          "./src/redux/mernTable/actions/employeeActions/deleteEmployee",
        "./editEmployee":
          "./src/redux/mernTable/actions/employeeActions/editEmployee",
        "./editEmployeeReset":
          "./src/redux/mernTable/actions/employeeActions/editEmployee",
        "./getEmployeeProfile":
          "./src/redux/mernTable/actions/employeeActions/getEmployeeProfile",
        "./getEmployeeProfileReset":
          "./src/redux/mernTable/actions/employeeActions/getEmployeeProfile",
        "./getEmployeeTable":
          "./src/redux/mernTable/actions/employeeActions/getEmployeeTable",
        "./getEmployeeTableReset":
          "./src/redux/mernTable/actions/employeeActions/getEmployeeTable",
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
