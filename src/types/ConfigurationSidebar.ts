export interface ConfigurationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  messageHistoryLimit: number;
  setMessageHistoryLimit: React.Dispatch<React.SetStateAction<number>>;
  deployment: string;
  setDeployment: React.Dispatch<React.SetStateAction<string>>;
}
