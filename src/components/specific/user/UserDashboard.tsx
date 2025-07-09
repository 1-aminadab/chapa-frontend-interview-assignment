import React, { useState } from "react";
import {
  FiSend,
  FiTrendingUp,
  FiClock,
  FiArrowUpRight
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useAuthStore } from "../../../store/authStore";
import { useAppStore } from "../../../store/appStore";
import { TransactionType, TransactionStatus } from "../../../types";
import Pagination from "../../common/Pagination";
import { Card } from "../../common/Card";

export const UserDashboard: React.FC = () => {
  const { currentUser, updateUser } = useAuthStore();
  const { transactions, addTransaction } = useAppStore();

  const [form, setForm] = useState({ amount: "", recipient: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateForm = (): boolean => {
    const amount = parseFloat(form.amount);
    return !isNaN(amount) && amount > 0 && currentUser?.walletBalance! >= amount;
  };

  const confirmAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Invalid transaction amount. It must be greater than 0 and less than or equal to your balance.");
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    setIsSubmitting(true);

    await new Promise((res) => setTimeout(res, 1000));

    const amount = parseFloat(form.amount);
    addTransaction({
      amount,
      type: TransactionType.SEND,
      status: TransactionStatus.PENDING,
      description: form.description,
      recipientName: form.recipient
    });

    updateUser({
      ...currentUser,
      walletBalance: (currentUser?.walletBalance ?? 0) - amount
    });

    setForm({ amount: "", recipient: "", description: "" });
    setIsSubmitting(false);
  };

  const currentTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const statusIcon = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.COMPLETED:
        return <FiTrendingUp className="text-green-500" />;
      case TransactionStatus.PENDING:
        return <FiClock className="text-yellow-400" />;
      default:
        return <FiClock className="text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-10 bg-background text-foreground transition-colors">
      {/* Wallet Balance */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="flex justify-between items-center mb-8 shadow-md dark:shadow-lg">
          <div>
            <p className="text-sm text-muted-foreground">Wallet Balance</p>
            <p className="text-4xl font-extrabold tracking-tight">
              ETB {currentUser?.walletBalance?.toLocaleString() ?? "0.00"}
            </p>
          </div>
          <div className="bg-primary rounded-full p-4 text-primary-foreground shadow-md">
            <FiArrowUpRight size={24} />
          </div>
        </Card>
      </motion.div>

      {/* Send Money Form */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Card className="mb-10 shadow-md dark:shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Send Money</h2>
          <form
            onSubmit={confirmAndSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            autoComplete="off"
          >
            {["amount", "recipient", "description"].map((field, i) => (
              <div key={i} className="relative">
                <input
                  type={field === "amount" ? "number" : "text"}
                  placeholder=" "
                  required
                  min={field === "amount" ? "0.01" : undefined}
                  step={field === "amount" ? "0.01" : undefined}
                  value={(form as any)[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="peer w-full bg-background border border-border rounded-md px-4 pt-8 pb-2 text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
                />
                <label className="absolute left-4 top-2 text-sm text-muted-foreground peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground transition-all pointer-events-none mb-8">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:to-pink-500 text-white font-semibold py-3 rounded-md shadow-lg flex justify-center items-center gap-2 transition disabled:opacity-50"
            >
              <FiSend size={18} />
              {isSubmitting ? "Processing..." : "Send Money"}
            </button>
          </form>
        </Card>
      </motion.div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirm Transaction</h3>
            <p className="mb-4">
              Are you sure you want to send{" "}
              <span className="font-semibold">ETB {parseFloat(form.amount).toLocaleString()}</span> to{" "}
              <span className="font-semibold">{form.recipient}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transactions */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card className="shadow-md dark:shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Recent Transactions</h3>
          <div className="space-y-5 max-h-[420px] overflow-y-auto pr-1.5">
            {currentTransactions.length > 0 ? (
              currentTransactions.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex justify-between items-center p-4 rounded-md bg-muted border border-border shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${t.type === TransactionType.RECEIVE
                      ? "bg-green-500/20 text-green-500"
                      : "bg-red-500/20 text-red-500"
                      }`}>
                      {t.type === TransactionType.RECEIVE ? <FiTrendingUp /> : <FiSend />}
                    </div>
                    <div>
                      <h4 className="font-medium">{t.description}</h4>
                      <p className="text-xs text-muted-foreground">{t.date}</p>
                      {t.recipientName && (
                        <p className="text-sm text-muted-foreground mt-1">
                          To: {t.recipientName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${t.type === TransactionType.RECEIVE ? "text-green-500" : "text-red-500"
                      }`}>
                      {t.type === TransactionType.RECEIVE ? "+" : "-"} ETB {t.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mt-1">
                      {statusIcon(t.status)}
                      <span>{t.status.charAt(0).toUpperCase() + t.status.slice(1)}</span>
                    </div>
                  </div>
                </motion.div>
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
      </motion.div>
    </div>
  );
};
