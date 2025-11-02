import Popup from './Popup.jsx';

function ReportFormPopup({ showPopup, formData, setFormData, handleAddReport, setShowPopup }) {
  return (
    <Popup show={showPopup} onClose={() => setShowPopup(false)} title="Generate New Report">
      <form onSubmit={handleAddReport} className="space-y-3">
        <div>
          <label className="text-sm font-medium block">Report Name</label>
          <input
            type="text"
            value={formData.report_name}
            onChange={(e) => setFormData({ ...formData, report_name: e.target.value })}
            placeholder="Enter report name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium block">Report Type</label>
          <input
            type="text"
            value={formData.report_type}
            onChange={(e) => setFormData({ ...formData, report_type: e.target.value })}
            placeholder="Enter report type"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div className="flex justify-between mt-5">
          <button
            type="submit"
            className="bg-[#0b0b3b] text-white px-4 py-2 rounded hover:bg-[#1a1a6a] transition-colors font-semibold"
          >
            Generate
          </button>
          <button
            type="button"
            onClick={() => {
              setShowPopup(false);
            }}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </Popup>
  );
}

export default ReportFormPopup;