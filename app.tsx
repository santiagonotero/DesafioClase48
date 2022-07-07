// @deno-types="https://deno.land/x/servest/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server";
import { Application, Router, Context } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application();

let colorList = []
  
const router = new Router()
  .get('/', (ctx)=>{
    ctx.response.body = ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <script src="scripts.js"></script>
          <title>App</title>
        </head>
        <body>
          <form action="/add" method="POST">
            <p>Ingresá un color (en inglés):</p>
            <input name="color" id= "color"></input>
            <button type="submit" id="boton">Enviar</button>
          </form>
          <ul>
            {colorList.map((i)=>{
              const fontColor = `${i}`
              const key = `${Date.now()}`
              return (<li key= {key}  style={{backgroundColor: 'black', color: fontColor}}> {i}</li>)
              }
            )}
          </ul>
        </body>
        <script src="scripts.js"></script>
      </html>
    )
  })

  .post('/add' , async (ctx)=>{
      const reqBody = await ctx.request.body({type: 'form'})
      const bodyValue = await reqBody.value
      const newColor = bodyValue.get("color")
      colorList.push(newColor)

      ctx.response.redirect('/');
    })

app.use(router.routes());
await app.listen({ port: 8888 });

