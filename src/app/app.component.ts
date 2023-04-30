import { Component, ViewEncapsulation } from "@angular/core";

import { ConnectorModel, NodeModel, PaletteModel, SymbolPreviewModel } from '@syncfusion/ej2-angular-diagrams/src';

declare var pyscript: any;

interface ElementWithInnerText extends Element {
  innerText: string;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  codeStoredInDatabase = "for i in range(8):\n\t\tprint(i)";
  pseudocodeStoredInDatabase: string = "";
  pseudocodeOptions = {
    lineNumbers: true,
    theme: "default",
    mode: "python",
    lineWrapping: true,
    extraKeys: {
      "Ctrl-Q": function (cm: any) {
        cm.foldCode(cm.getCursor());
      },
    },
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  };


  public symbolPreviewSettings: SymbolPreviewModel ={
    height: 100,
    width: 100,
    offset: {
      x: 0.5,
      y: 0.5
    }
  }

  public paletteExpandingAction(args: any) {
    if(args.palette.id === "flow"){
      args.cancel = true;
    }
  }

  public symbolPalette: PaletteModel[]=[
    {
      id: "basic",
      expanded: false,
      symbols: this.getBasicShapes(),
      title: "Basic Shapes"
    },
    {
      id: "flow",
      symbols: this.getFlowShapes(),
      title: "Flow Shapes"
    },
    {
      id: "connectors",
      symbols: this.getConnectores(),
      title: "Connectors"
    },

  ];

  public getFlowShapes(): NodeModel[] {
    let flowshapes: NodeModel[] = [
      {id: "Terminator", shape: { type: "Flow", shape: "Terminator"}},
      {id: "Process", shape: { type: "Flow", shape: "Process"}},
      {id: "Decision", shape: { type: "Flow", shape: "Decision"}},
      {id: "PreDefinedProcess", shape: { type: "Flow", shape: "PreDefinedProcess"}}
    ];
    return flowshapes;
  }

  public getConnectores(): ConnectorModel[] {
    let connectores: ConnectorModel [] = [
      {
        id: "Link1",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0},
        targetPoint: { x: 60, y: 60 },
        targetDecorator: {shape: "Arrow"}
      },
      {
        id: "Link2",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0},
        targetPoint: { x: 60, y: 60 },
        targetDecorator: {shape: "None"}
      },
      {
        id: "Link3",
        type: "Straight",
        sourcePoint: { x: 0, y: 0},
        targetPoint: { x: 60, y: 60 },
        targetDecorator: {shape: "Arrow"}
      },
    ];
    return connectores;
  }

  public getBasicShapes(): NodeModel[] {
    let basicshapes: NodeModel [] = [
      { id: "Rectangle", shape: { type: "Basic", shape: "Rectangle"}},
      { id: "Ellipse", shape: { type: "Basic", shape: "Ellipse"}},
      { id: "Hexagon", shape: { type: "Basic", shape: "Hexagon"}},
      { id: "Parallelogram", shape: { type: "Basic", shape: "Parallelogram"}},
    ];
    return basicshapes;

  }


  execute(): void {
    const repl = document.getElementsByClassName("cm-content");
    const code = (repl[0] as ElementWithInnerText).innerText;
    pyscript.interpreter.run(code.trim());
  }

  save(): void {
    const repl = document.getElementsByClassName("cm-content");
    const code = (repl[0] as ElementWithInnerText).innerText;
    this.codeStoredInDatabase = code.trim();
  }

  handleChange(event: string) {
    // console.log("this.content", this.content);
    console.log(event);
  }



  
}
