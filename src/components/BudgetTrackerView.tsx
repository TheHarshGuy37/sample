import React, { useState, useMemo } from 'react';
import { BudgetItem, VendorCategory } from '../types';
import { Plus, CheckCircle2, DollarSign } from 'lucide-react';

interface BudgetTrackerViewProps {
  budgetItems: BudgetItem[];
  totalCapBudget: number; // e.g. 1800000 (18 Lakhs INR)
  onAddItem: (item: Omit<BudgetItem, 'id'>) => void;
  onRecordPayment: (itemId: string, additionalAmount: number) => void;
}

export const BudgetTrackerView: React.FC<BudgetTrackerViewProps> = ({
  budgetItems,
  totalCapBudget,
  onAddItem,
  onRecordPayment,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [paymentModalItem, setPaymentModalItem] = useState<BudgetItem | null>(null);
  const [paymentAmountInput, setPaymentAmountInput] = useState<string>('');

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<VendorCategory>('Wedding Venues & Banquet Halls');
  const [newVendor, setNewVendor] = useState('');
  const [newAllocated, setNewAllocated] = useState('');
  const [newAdvance, setNewAdvance] = useState('');
  const [newDueDate, setNewDueDate] = useState('2026-11-20');
  const [newNotes, setNewNotes] = useState('');

  // Calculations
  const totalAllocated = useMemo(() => {
    return budgetItems.reduce((acc, curr) => acc + curr.allocatedAmount, 0);
  }, [budgetItems]);

  const totalAdvancePaid = useMemo(() => {
    return budgetItems.reduce((acc, curr) => acc + curr.advancePaid, 0);
  }, [budgetItems]);

  const totalRemainingDue = totalAllocated - totalAdvancePaid;
  const surplusBudget = Math.max(0, totalCapBudget - totalAllocated);

  const allocatedPct = Math.min(100, (totalAllocated / totalCapBudget) * 100);
  const advancesPct = Math.min(100, (totalAdvancePaid / totalCapBudget) * 100);
  const surplusPct = Math.max(0, 100 - allocatedPct);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const filteredItems = budgetItems.filter((item) => {
    if (filterCategory !== 'All' && item.category !== filterCategory) return false;
    if (filterStatus !== 'All' && item.status !== filterStatus) return false;
    return true;
  });

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAllocated) return;

    const allocatedNum = parseFloat(newAllocated) || 0;
    const advanceNum = parseFloat(newAdvance) || 0;

    let status: BudgetItem['status'] = 'Payment Due';
    if (advanceNum >= allocatedNum && allocatedNum > 0) {
      status = 'Fully Paid';
    } else if (advanceNum > 0) {
      status = 'Advance Paid';
    }

    onAddItem({
      title: newTitle,
      category: newCategory,
      vendorName: newVendor || 'Selected Vendor',
      allocatedAmount: allocatedNum,
      advancePaid: advanceNum,
      dueDate: newDueDate,
      status,
      notes: newNotes || 'Added by family planner',
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewAllocated('');
    setNewAdvance('');
    setNewNotes('');
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentModalItem || !paymentAmountInput) return;
    const amt = parseFloat(paymentAmountInput);
    if (amt > 0) {
      onRecordPayment(paymentModalItem.id, amt);
    }
    setPaymentModalItem(null);
    setPaymentAmountInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#0F172A]">
            Wedding Budget &amp; Payment Tracker
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Keep track of all wedding expenses, advances paid, and upcoming balances in one simple place.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#b90538] hover:bg-[#92002a] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense / Vendor</span>
        </button>
      </div>

      {/* Visual Budget Progress Card */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-sm space-y-5">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Planned Wedding Budget
            </span>
            <div className="font-sans text-3xl font-bold text-[#0F172A] tabular-nums mt-0.5">
              {formatINR(totalCapBudget)}
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ECFDF5] border border-emerald-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-xs font-bold text-[#047857]">
              Budget On Track · {surplusPct.toFixed(0)}% Savings Buffer Left
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-[#f2f3ff] rounded-full overflow-hidden flex shadow-inner p-0.5 border border-[#E2E8F0]">
            <div
              style={{ width: `${advancesPct}%` }}
              className="bg-[#D97706] h-full rounded-l-full transition-all duration-500"
              title={`Advances Paid: ${formatINR(totalAdvancePaid)}`}
            />
            <div
              style={{ width: `${Math.max(0, allocatedPct - advancesPct)}%` }}
              className="bg-[#10B981] h-full transition-all duration-500"
              title={`Committed Balance: ${formatINR(totalRemainingDue)}`}
            />
            <div
              style={{ width: `${surplusPct}%` }}
              className="bg-[#94A3B8]/30 h-full rounded-r-full transition-all duration-500"
              title={`Savings: ${formatINR(surplusBudget)}`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#D97706] inline-block" />
              <span className="text-slate-600">
                Advances Paid: <strong className="text-[#0F172A] tabular-nums">{formatINR(totalAdvancePaid)}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#10B981] inline-block" />
              <span className="text-slate-600">
                Balance Due Later: <strong className="text-[#0F172A] tabular-nums">{formatINR(totalRemainingDue)}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#94A3B8]/50 inline-block" />
              <span className="text-slate-600">
                Savings Buffer: <strong className="text-[#0F172A] tabular-nums">{formatINR(surplusBudget)}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-[#F1F5F9]">
          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Total Expenses</span>
            <div className="text-lg font-bold text-[#0F172A] tabular-nums mt-0.5">{formatINR(totalAllocated)}</div>
            <span className="text-[11px] text-slate-500">{allocatedPct.toFixed(0)}% of total budget</span>
          </div>

          <div className="p-3.5 bg-[#FFF1F2] rounded-xl border border-[#FFE4E6]">
            <span className="text-[11px] font-semibold text-[#b90538] uppercase block">Already Paid</span>
            <div className="text-lg font-bold text-[#b90538] tabular-nums mt-0.5">{formatINR(totalAdvancePaid)}</div>
            <span className="text-[11px] text-[#5b4041]">Advance tokens</span>
          </div>

          <div className="p-3.5 bg-[#FAF9F6] rounded-xl border border-[#E2E8F0]">
            <span className="text-[11px] font-semibold text-slate-500 uppercase block">Remaining to Pay</span>
            <div className="text-lg font-bold text-[#0F172A] tabular-nums mt-0.5">{formatINR(totalRemainingDue)}</div>
            <span className="text-[11px] text-slate-500">Due before event day</span>
          </div>

          <div className="p-3.5 bg-[#ECFDF5] rounded-xl border border-emerald-200">
            <span className="text-[11px] font-semibold text-[#006947] uppercase block">Emergency Buffer</span>
            <div className="text-lg font-bold text-[#006947] tabular-nums mt-0.5">{formatINR(surplusBudget)}</div>
            <span className="text-[11px] text-emerald-700">Money saved</span>
          </div>
        </div>

      </div>

      {/* Spreadsheet / Table */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        
        {/* Filter bar */}
        <div className="p-4 border-b border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-playfair text-lg font-bold text-[#0F172A]">
              Expense List ({filteredItems.length} items)
            </h3>
            <p className="text-xs text-slate-500">Click "Pay More" on any item to update advance</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Wedding Venues & Banquet Halls">Venues &amp; Halls</option>
              <option value="Catering & Food Services">Catering</option>
              <option value="Photographers & Videographers">Photographers</option>
              <option value="Wedding Decor & Stage">Decor &amp; Stage</option>
              <option value="Bridal Wear & Groom Outfits">Outfits &amp; Dresses</option>
              <option value="DJ, Band & Entertainment">Band &amp; Music</option>
              <option value="Mehendi & Makeup Artists">Mehendi &amp; Makeup</option>
              <option value="Travel & Cars">Travel &amp; Cars</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Fully Paid">Fully Paid</option>
              <option value="Advance Paid">Advance Paid</option>
              <option value="Payment Due">Payment Due</option>
              <option value="In Discussion">In Discussion</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] text-[#475569] border-b border-[#E2E8F0]">
                <th className="py-3 px-4 font-semibold">Item &amp; Vendor</th>
                <th className="py-3 px-3 font-semibold">Category</th>
                <th className="py-3 px-3 font-semibold text-right">Agreed Cost (₹)</th>
                <th className="py-3 px-3 font-semibold text-right">Paid (₹)</th>
                <th className="py-3 px-3 font-semibold text-right">Remaining (₹)</th>
                <th className="py-3 px-3 font-semibold">Payment Due</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {filteredItems.map((item) => {
                const balanceDue = item.allocatedAmount - item.advancePaid;
                return (
                  <tr key={item.id} className="hover:bg-[#FAF9F6] transition-colors">
                    <td className="py-3.5 px-4">
                      <strong className="text-xs font-semibold text-[#0F172A] block">{item.title}</strong>
                      <span className="text-[11px] text-slate-500 block">{item.vendorName}</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold text-[#0F172A] tabular-nums">
                      {formatINR(item.allocatedAmount)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold text-[#D97706] tabular-nums">
                      {formatINR(item.advancePaid)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold text-slate-600 tabular-nums">
                      {formatINR(balanceDue)}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 tabular-nums">
                      {item.dueDate}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Fully Paid'
                            ? 'bg-[#ECFDF5] text-[#047857]'
                            : item.status === 'Advance Paid'
                            ? 'bg-[#FEF3C7] text-[#B45309]'
                            : 'bg-[#F1F5F9] text-slate-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {balanceDue > 0 ? (
                        <button
                          onClick={() => {
                            setPaymentModalItem(item);
                            setPaymentAmountInput(Math.min(balanceDue, Math.round(item.allocatedAmount * 0.2)).toString());
                          }}
                          className="px-2.5 py-1 bg-[#FAF9F6] hover:bg-[#FFF1F2] text-[#b90538] border border-[#FFE4E6] rounded-lg text-xs font-semibold transition-colors"
                        >
                          Pay More
                        </button>
                      ) : (
                        <span className="text-xs text-[#047857] font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                          <span>Cleared</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Record Payment Modal */}
      {paymentModalItem && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 max-w-md w-full shadow-2xl space-y-4 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b90538]">Record Payment</span>
              <h3 className="font-playfair text-xl font-bold text-[#0F172A] mt-0.5">{paymentModalItem.title}</h3>
              <p className="text-xs text-slate-500">{paymentModalItem.vendorName}</p>
            </div>

            <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E2E8F0] text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Total Amount:</span>
                <strong className="text-[#0F172A] tabular-nums">{formatINR(paymentModalItem.allocatedAmount)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Already Paid:</span>
                <strong className="text-[#D97706] tabular-nums">{formatINR(paymentModalItem.advancePaid)}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-[#E2E8F0]">
                <span className="font-semibold text-slate-700">Remaining to Pay:</span>
                <strong className="text-[#b90538] tabular-nums">{formatINR(paymentModalItem.allocatedAmount - paymentModalItem.advancePaid)}</strong>
              </div>
            </div>

            <form onSubmit={handleConfirmPayment} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#0F172A] block">
                  Amount You Are Paying Now (₹ INR)
                </label>
                <input
                  type="number"
                  min="1"
                  max={paymentModalItem.allocatedAmount - paymentModalItem.advancePaid}
                  value={paymentAmountInput}
                  onChange={(e) => setPaymentAmountInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-sm font-semibold tabular-nums focus:outline-none focus:border-[#b90538]"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentModalItem(null)}
                  className="flex-1 py-2 border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl hover:bg-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#b90538] hover:bg-[#92002a] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Expense Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6 max-w-lg w-full shadow-2xl space-y-4 animate-fadeIn">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b90538]">New Entry</span>
              <h3 className="font-playfair text-xl font-bold text-[#0F172A] mt-0.5">Add Wedding Expense</h3>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#0F172A] block">Item Name / Service</label>
                <input
                  type="text"
                  placeholder="E.g., Reception Stage Flowers, Bridal Makeup, Car Rental"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#b90538]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#0F172A] block">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
                  >
                    <option value="Wedding Venues & Banquet Halls">Wedding Venues</option>
                    <option value="Catering & Food Services">Catering</option>
                    <option value="Photographers & Videographers">Photographers</option>
                    <option value="Wedding Decor & Stage">Decor &amp; Stage</option>
                    <option value="Bridal Wear & Groom Outfits">Bridal Wear</option>
                    <option value="DJ, Band & Entertainment">Band &amp; DJ</option>
                    <option value="Mehendi & Makeup Artists">Mehendi &amp; Makeup</option>
                    <option value="Travel & Cars">Travel &amp; Cars</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#0F172A] block">Vendor Name</label>
                  <input
                    type="text"
                    placeholder="E.g., Local flower decorator"
                    value={newVendor}
                    onChange={(e) => setNewVendor(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#0F172A] block">Total Cost (₹)</label>
                  <input
                    type="number"
                    placeholder="75000"
                    value={newAllocated}
                    onChange={(e) => setNewAllocated(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs font-bold tabular-nums text-[#0F172A] focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#0F172A] block">Advance Paid (₹)</label>
                  <input
                    type="number"
                    placeholder="25000"
                    value={newAdvance}
                    onChange={(e) => setNewAdvance(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs font-bold tabular-nums text-[#0F172A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#0F172A] block">Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF9F6] border border-[#E2E8F0] rounded-xl text-xs text-[#0F172A] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] rounded-xl hover:bg-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#b90538] hover:bg-[#92002a] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
