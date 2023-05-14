import { NodeModel } from "@syncfusion/ej2-angular-diagrams";

export interface FlowChartNodeModel extends NodeModel {
    pseudocode: string[];
}