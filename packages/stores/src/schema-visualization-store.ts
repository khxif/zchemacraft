import { Edge } from '@xyflow/react';
import { create } from 'zustand';

type AuthStore = {
  edges: Edge[];
  setEdges: (edges: Edge[]) => void;

  nodes: any[];
  setNodes: (nodes: any[]) => void;
};

export const useSchemaVisualizationStore = create<AuthStore>()(set => ({
  edges: [],
  setEdges: edges => set({ edges }),

  nodes: [],
  setNodes: nodes => set({ nodes }),
}));
