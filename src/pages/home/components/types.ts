export type PageProps = {
  page: string | undefined;
  navigate: (path: string) => void;
  fullScreen?: boolean
};