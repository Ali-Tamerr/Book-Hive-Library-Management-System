import DashboardLayout from '../layouts/DashboardLayout';
import { useState } from 'react';

function Dashboard() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <DashboardLayout activeTab="dashboard">
      <div className="p-6 flex-1 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">Abdelmohymen</h3>
            <p className="text-sm text-gray-600">Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-sm font-medium">12:29 PM</span>
              <p className="text-xs text-gray-600">Sep 22, 2025</p>
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="text-2xl cursor-pointer hover:rotate-12 transition-transform"
            >
              ⚙️
            </button>
          </div>
        </header>

        <section className="grid grid-cols-[40%_60%] gap-6">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="w-[300px] h-[300px] bg-[#0a0f33] rounded-full mb-6 flex items-center justify-center">
            </div>
            <div className="flex gap-8">
              <p className="text-sm flex items-center">
                <span className="w-3 h-3 bg-[#0a0f33] rounded-full inline-block mr-2"></span>
                Total Borrowed Books
              </p>
              <p className="text-sm flex items-center">
                <span className="w-3 h-3 bg-gray-600 rounded-full inline-block mr-2"></span>
                Total Returned Books
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="bg-white rounded-lg flex-1 p-5 text-center mx-1 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-3xl font-semibold text-[#0a0f33] mb-1">0150</h3>
                <p className="text-xs text-[#6f7390]">Total User Base</p>
              </div>
              <div className="bg-white rounded-lg flex-1 p-5 text-center mx-1 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-3xl font-semibold text-[#0a0f33] mb-1">01500</h3>
                <p className="text-xs text-[#6f7390]">Total Book Count</p>
              </div>
              <div className="bg-white rounded-lg flex-1 p-5 text-center mx-1 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-3xl font-semibold text-[#0a0f33] mb-1">0010</h3>
                <p className="text-xs text-[#6f7390]">Branch Count</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h4 className="text-sm font-medium text-[#0a0f33] mb-3">Overdue Borrowers</h4>
                <ul className="space-y-1">
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg">Ahmed Mohammed — Borrowed ID: 10</li>
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg">Ahmed Mohammed — Borrowed ID: 10</li>
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg">Ahmed Mohammed — Borrowed ID: 10</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h4 className="text-sm font-medium text-[#0a0f33] mb-3">BookWorm Admins</h4>
                <ul className="space-y-1">
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg">Abdelmohymen — Admin D1</li>
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg">Admin D2</li>
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg">Admin D3</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h4 className="text-sm font-medium text-[#0a0f33] mb-3">Branch Network</h4>
                <ul className="space-y-1">
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg">BookHive — Cairo (Branch ID: 1)</li>
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg">BookHive — Giza (Branch ID: 2)</li>
                  <li className="text-xs bg-[#f5f7fb] p-2 rounded-lg">BookHive — Alex (Branch ID: 3)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-[rgba(10,15,51,0.5)] flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-[0_5px_25px_rgba(0,0,0,0.1)]">
            <h3 className="text-center text-lg mb-4">Change Credentials</h3>
            <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setShowPopup(false); }}>
              <label className="text-sm font-medium block">Enter Current Password</label>
              <input
                type="password"
                placeholder="Enter Current Password"
                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
              />
              <label className="text-sm font-medium block">Enter New Password</label>
              <input
                type="password"
                placeholder="Enter New Password"
                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
              />
              <label className="text-sm font-medium block">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg outline-none text-sm"
              />
              <div className="flex justify-between gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="w-[48%] bg-gray-300 text-black rounded-lg py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-[48%] bg-[#0a0f33] text-white rounded-lg py-2 hover:bg-[#192261]"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;

