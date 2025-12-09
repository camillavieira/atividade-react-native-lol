export type RootStackParamList = {
  Home: undefined;
  Questions: undefined;
  Result: { score: number } | undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
