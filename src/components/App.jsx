import React, { useState, useEffect } from "react";
import Editor from "./Editor"

function App() {

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [sourceDocument, setSourceDocument] = useState("");

  //Retrieve data
  useEffect(()=>{
    let localData = localStorage.getItem("code-editor-data");
    localData = JSON.parse(localData);
    if(localData){
      setHtml(localData.html);
      setCss(localData.css);
      setJs(localData.js);
    }
  },[])

  useEffect(() => {

    //Saving in localstorage
    const localData = {html,css,js}
    localStorage.setItem("code-editor-data",JSON.stringify(localData))

    const timeOut = setTimeout(() => {
      setSourceDocument(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `)
    }, 900);

    // Clearing the timeOut 
    return () => clearTimeout(timeOut);
  }, [html, css, js])


  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="sass"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="Javascript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="bottom-pane">
        <iframe
          srcDoc={sourceDocument}
          title="output"
          sandbox="allow-forms allow-popups allow-scripts allow-same-origin allow-modals"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
