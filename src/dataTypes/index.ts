export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export interface TabItemProps {
  icon: string;
  callback: () => void;
  title: string;
}
