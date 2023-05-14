import { Component } from "@angular/core";
import {
  ConnectorModel,
  NodeModel,
  PaletteModel,
  SymbolPreviewModel,
} from "@syncfusion/ej2-angular-diagrams";
import { FlowChartNodeModel } from "src/app/interfaces/flowchart-node-model";

@Component({
  selector: "app-flowchart",
  templateUrl: "./flowchart.component.html",
  styleUrls: ["./flowchart.component.css"],
})
export class FlowchartComponent {
  symbolPreviewSettings: SymbolPreviewModel = {
    height: 100,
    width: 100,
    offset: {
      x: 0.5,
      y: 0.5,
    },
  };
  symbolPalette: PaletteModel[] = [
    {
      id: "basic",
      expanded: false,
      symbols: this.getBasicShapes(),
      title: "Basic Shapes",
    },
    {
      id: "flow",
      symbols: this.getFlowShapes(),
      title: "Flow Shapes",
    },
    {
      id: "connectors",
      symbols: this.getConnectors(),
      title: "Connectors",
    },
  ];

  paletteExpandingAction(args: any): void {
    if (args.palette.id === "flow") {
      args.cancel = true;
    }
  }

  getFlowShapes(): NodeModel[] {
    const flowShapes: NodeModel[] = [
      { id: "Terminator", shape: { type: "Flow", shape: "Terminator" } },
      { id: "Process", shape: { type: "Flow", shape: "Process" } },
      { id: "Decision", shape: { type: "Flow", shape: "Decision" } },
      {
        id: "PreDefinedProcess",
        shape: { type: "Flow", shape: "PreDefinedProcess" },
      },
    ];
    return flowShapes;
  }

  getConnectors(): ConnectorModel[] {
    const connectors: ConnectorModel[] = [
      {
        id: "Link1",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "Arrow" },
      },
      {
        id: "Link2",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "None" },
      },
      {
        id: "Link3",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "Arrow" },
      },
    ];
    return connectors;
  }

  getBasicShapes(): FlowChartNodeModel[] {
    const basicShapes: FlowChartNodeModel[] = [
      {
        id: "Rectangle",
        shape: { type: "Basic", shape: "Rectangle" },
        pseudocode: [],
      },
      {
        id: "Ellipse",
        shape: { type: "Basic", shape: "Ellipse" },
        pseudocode: ["if ( {condition} ) {", "    // do something", "}"],
      },
      {
        id: "Hexagon",
        shape: { type: "Basic", shape: "Hexagon" },
        pseudocode: [],
      },
      {
        id: "Parallelogram",
        shape: { type: "Basic", shape: "Parallelogram" },
        pseudocode: [],
      },
    ];
    return basicShapes;
  }
}
