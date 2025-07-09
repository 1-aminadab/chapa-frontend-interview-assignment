import React, { useState } from "react";
import { FiSend, FiTrendingUp, FiClock, FiArrowUpRight } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";
import { useAppStore } from "../../store/appStore";
import { TransactionType, TransactionStatus } from "../../types";
import Pagination from "../common/Pagination";
import { Card } from "../common/Card";

export const UserDashboard: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { transactions, addTransaction } = useAppStore();

  const [form, setForm] = useState({ amount: "", recipient: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));
    addTransaction({
      amount: parseFloat(form.amount),
      type: TransactionType.SEND,
      status: TransactionStatus.PENDING,
      description: form.description,
      recipientName: form.recipient,
    });
    setForm({ amount: "", recipient: "", description: "" });
    setIsSubmitting(false);
  };

  const statusIcon = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.COMPLETED:
        return <FiTrendingUp className="text-green-600" />;
      case TransactionStatus.PENDING:
        return <FiClock className="text-yellow-500" />;
      default:
        return <FiClock className="text-red-600" />;
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen transition-colors px-6 py-8 text-foreground dark:text-foreground font-sans container mx-auto">
      {/* Wallet Balance */}
      <Card className="flex justify-between items-center mb-8">
        <div>
          <p className="text-sm text-muted-foreground">Wallet Balance</p>
          <p className="text-4xl font-extrabold text-foreground">
            ETB {currentUser?.walletBalance?.toLocaleString() ?? "0.00"}
          </p>
        </div>
        <div className="bg-primary rounded-full p-4 text-primary-foreground shadow-sm">
          <FiArrowUpRight size={24} />
        </div>
      </Card>

      {/* Send Money Form */}
      <Card className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Send Money</h2>
        <form
          onSubmit={submit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          autoComplete="off"
        >
          <input
            type="number"
            placeholder="Amount (ETB)"
            required
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="bg-input border border-border rounded-md px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition"
          />
          <input
            type="text"
            placeholder="Recipient"
            required
            value={form.recipient}
            onChange={(e) => setForm({ ...form, recipient: e.target.value })}
            className="bg-input border border-border rounded-md px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition"
          />
          <input
            type="text"
            placeholder="Description"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="bg-input border border-border rounded-md px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-3 bg-primary text-primary-foreground font-semibold py-3 rounded-md shadow-sm hover:bg-primary/90 disabled:opacity-50 flex justify-center items-center gap-2 transition"
          >
            <FiSend size={20} />
            {isSubmitting ? "Processing..." : "Send Money"}
          </button>
        </form>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <h3 className="text-2xl font-semibold mb-6 text-foreground">Recent Transactions</h3>
        <div className="space-y-5 max-h-[420px] overflow-y-auto pr-2">
          {currentTransactions.length > 0 ? (
            currentTransactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center p-4 rounded-md bg-card border border-border"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${t.type === TransactionType.RECEIVE
                      ? "bg-green-600/20 text-green-600"
                      : "bg-red-600/20 text-red-600"
                      }`}
                  >
                    {t.type === TransactionType.RECEIVE ? <FiTrendingUp /> : <FiSend />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t.description}</h4>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                    {t.recipientName && (
                      <p className="text-sm text-muted-foreground mt-1">
                        To: {t.recipientName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${t.type === TransactionType.RECEIVE ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {t.type === TransactionType.RECEIVE ? "+" : "-"} ETB{" "}
                    {t.amount.toLocaleString()}
                  </p>
                  <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mt-1">
                    {statusIcon(t.status)}
                    <span>{t.status.charAt(0).toUpperCase() + t.status.slice(1)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-12 text-muted-foreground">No transactions found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </Card>
    </div>
  );
};
