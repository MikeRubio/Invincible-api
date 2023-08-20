import { GraphQLResolveInfo } from "graphql";

export const getSelections = (info: GraphQLResolveInfo) => {
  const selections = info.fieldNodes[0].selectionSet?.selections;
  if (!selections) {
    return [];
  }
  return selections;
};

export const extractSelections = (info: GraphQLResolveInfo) => {
  const selections = getSelections(info);

  if (!selections) return [];

  return selections.reduce<string[]>((acc, selection) => {
    if (selection.kind === "Field") {
      acc.push(selection.name.value);
    }
    return acc;
  }, []);
};
