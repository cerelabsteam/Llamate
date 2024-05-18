const SidebarHeading: React.FC<{
  handleClick: () => void;
  headingText: string;
}> = ({ handleClick, headingText }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-lg font-bold">{headingText}</p>
      <p className="text-3xl leading-none cursor-pointer" onClick={handleClick}>
        &times;
      </p>
    </div>
  );
};

export default SidebarHeading;
