import React, { Component } from 'react';

import mermaid from 'mermaid'
import MarkdownIt from 'markdown-it'
import MarkdownItMermaid from 'markdown-it-mermaid'
import Dompurify from 'dompurify'




class App extends Component {
  state = {result : 'now loading'}

  componentDidMount() {
    this.md = MarkdownIt();
    this.md.use(MarkdownItMermaid);

    var input = document.getElementById("input");
    var preview = document.getElementById("preview");
    var output = document.getElementById("output");
    var renderBtn = document.getElementById("render");

    mermaid.mermaidAPI.initialize({ startOnLoad: false });

    renderBtn.onclick =  () =>{
      preview.innerHTML = input.value;
      // mermaid.mermaidAPI.render('theGraph'+Math.floor(Math.random() * 100) + 1, input.value, function (svgCode) {
      //   output.innerHTML = svgCode;
      // });
      //var result = this.md.render(`\`\`\`mermaid\n${input.value}`)
      var result = this.md.render(input.value)
      console.log(result)
      //output.innerHTML = result
      this.setState({result:result})
      // you need this! By default, mermaid.init will be called when the document is ready, finding all elements with class="mermaid". If you are adding content after mermaid is loaded, or otherwise need finer-grained control of this behavior, you can call init
      mermaid.init();
    }


  }


  render() {
    return (
      <div>
        <textarea name="" id="input" cols="30" rows="10">
        graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
        </textarea>
      
      <div>
        Your code (for debugging): <pre id="preview"></pre>
      </div>
      <div>
        <button type="button" id="render">Render</button>
      </div>
      <div>Graph:
  <div dangerouslySetInnerHTML={{__html:Dompurify.sanitize(this.state.result)}} id="output"></div>
      </div>
      </div>
    );
  }
}

export default App;
