import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/sass/sass";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint"
import { Controlled as ControlledEditor } from "react-codemirror2";


const Editor = (props) => {

  const { displayName, language, value, onChange } = props;

  const [open, setOpen] = useState(true)

  const handleChange = (editor, data, value) => {
    onChange(value)
  }

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {displayName}
        <p className="collapse-expand-button" onClick={()=>setOpen(!open)}>{open ? "Collapse" : "Expand"}</p>
      </div>

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          theme: "material",
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
        }}
      />
    </div>
  )
};

export default Editor;
