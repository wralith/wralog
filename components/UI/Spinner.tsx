const Spinner = ({ show }: any) => {
  return show ? (
    <div className="border-4 rounded-full w-8 h-8 animate-spin
    border-b-primary border-l-primary border-primary-content"></div>
  ) : null;
};

export default Spinner;
