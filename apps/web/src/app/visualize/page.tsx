'use client';

import { Edge, Node, Position, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  DatabaseSchemaNode,
  DatabaseSchemaNodeBody,
  DatabaseSchemaNodeHeader,
  DatabaseSchemaTableCell,
  DatabaseSchemaTableRow,
} from '@zchemacraft/components/ui/database-schema-node';
import { LabeledHandle } from '@zchemacraft/components/ui/labeled-handle';
import { useSchemaVisualizationStore } from '@zchemacraft/stores/schema-visualization-store';
import dagre from 'dagre';
import { memo } from 'react';

export default function SchemaVisualize() {
  const edges = useSchemaVisualizationStore(state => state.edges);
  const nodes = useSchemaVisualizationStore(state => state.nodes);

  const layoutedNodes = layoutNodes(nodes, edges, 'LR');

  return (
    <ReactFlowProvider>
      {!edges.length && !nodes.length ? null : (
        <div className="h-screen w-full">
          <ReactFlow
            nodes={layoutedNodes}
             edges={edges.map(e => ({ ...e, type: 'smoothstep' }))}
            fitView
            nodeTypes={nodeTypes}
            defaultEdgeOptions={{ animated: true }}
          ></ReactFlow>
        </div>
      )}
    </ReactFlowProvider>
  );
}

type DatabaseSchemaNodeData = {
  data: {
    label: string;
    schema: { title: string; type: string }[];
  };
};

const DatabaseSchemaSection = memo(({ data }: DatabaseSchemaNodeData) => {
  return (
    <DatabaseSchemaNode className="p-0">
      <DatabaseSchemaNodeHeader>{data.label}</DatabaseSchemaNodeHeader>
      <DatabaseSchemaNodeBody>
        {data.schema.map(entry => (
          <DatabaseSchemaTableRow key={entry.title}>
            <DatabaseSchemaTableCell className="pl-0 pr-6 font-light">
              <LabeledHandle
                id={entry.title}
                title={entry.title}
                type="target"
                position={Position.Left}
              />
            </DatabaseSchemaTableCell>
            <DatabaseSchemaTableCell className="pr-0 font-thin">
              <LabeledHandle
                id={entry.title}
                title={entry.type}
                type="source"
                position={Position.Right}
                className="p-0"
                handleClassName="p-0"
                labelClassName="p-0 w-full pr-3 text-right"
              />
            </DatabaseSchemaTableCell>
          </DatabaseSchemaTableRow>
        ))}
      </DatabaseSchemaNodeBody>
    </DatabaseSchemaNode>
  );
});

const nodeTypes = {
  databaseSchema: DatabaseSchemaSection,
};

const nodeWidth = 250;
const nodeHeight = 160;

const layoutNodes = (nodes: Node[], edges: Edge[], direction: 'LR' | 'TB' = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: direction,
    align: 'UL',
    nodesep: 100,
    ranksep: 150,
  });

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.map(node => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: x - nodeWidth / 2, y: y - nodeHeight / 2 },
    };
  });
};
