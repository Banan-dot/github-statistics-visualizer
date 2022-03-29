import Language from "./Language";

interface Languages {
  edges: {
    size: number;
    node: Language;
  }[];
  totalSize: number;
}

export default Languages;
