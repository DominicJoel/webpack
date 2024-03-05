const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path"); //Esto no lo permite node para trabajar con la ruta

const ruleForStyles = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"], //Podemos poner mas de un loader, así cruza por varios loader para transformar y los loader va de izquierda a derecha primero toma en cuenta el primero y luego va en el mismo orden
};

const ruleForJavaScript = {
  //Aquí podemos poner ciertas reglas, en este caso usaremos una para transformar esos archivos que webpack no está entendiendo
  test: /\.js$/, //Le decimos que todos estos archivos pasen por el loader (podemos agregar otras extensiones)
  loader: "babel-loader", //El loader que estamos utilizando
  options: {
    //Ya esto de aquí es de Babel no de WEBPACK
    presets: [
      [
        "@babel/preset-react", // Esuna configuración preestablecida que hará todas las transformaciones necesarias para convertirlo a js
        {
          //Aquí va la config de un preset
          runtime: "automatic", // 'classic', esto ayuda no tener que importar react from React ya que babel cuando detecte que lo necesita el se encarga de importarlo
        },
      ],
    ],
  },
};

const rules = [ruleForJavaScript, ruleForStyles];

//La configuracion de webpack no es solo un objeto sino que puede ser una funcion que retorne un objeto
module.exports = (env, argv) => {
  // argv : son los argumentos y el env es

  const { mode } = argv;
  const isProduction = mode === "production";
  return {
    // entry: './src/index.js', //eEsto es si quisieramos agregar la entrada que debe tomar
    output: {
      filename: isProduction ? "[name].[contenthash]" : "main.js", //"[name].[contenthash]" permite tomar el nombre y usar el hash que se genere en ese momento y así podriamos cachear
      // Podemos modificar la salida
      path: path.resolve(__dirname, "build"), // Esto nos crea el archivo y directorio. (__dirname) nos indica en la ruta que estamos
    },
    plugins: [
      //Aquí podemos setear pluggins que haga cierta funcionalidad
      new HtmlWebpackPlugin({ template: "src/index.html" }), //Este pluggin crea el mismo el index.html
    ],
    module: {
      //Para agregar el loader
      rules,
    },
    devServer: {
      open: true, // Esto nos abre el navegador, claro debe tener la config previa
      port: 3000, //El puerto
      //  overlay: true, // Abrir un overlay con los errores si tiene problema para compilar
      compress: true,
    },
    // devtool: "source-map", // Es el mas potente pero el mas lento
  };
};
// Loader: Una herramienta o biblioteca que transforma mi código para que webpack lo entienda y lo transforme a algo que va a entender el navegador
// Babel: npm i @babel/core babel-loader @babel/preset-react --save-dev
