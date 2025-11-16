function Popup({ show, onClose, title, children, maxWidthClass }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" 
    // onClick={onClose}
    >
      <div className={`bg-white max-h-[90%] w-11/12 ${maxWidthClass || 'max-w-[500px]'} rounded-lg p-5 border-2 border-[#0b0b3b]`} onClick={(e) => e.stopPropagation()}>
        <h3 className="text-center mb-5 text-lg text-[#0b0b3b]">{title}</h3>
        {children}
      </div>
    </div>
  );
}

export default Popup;