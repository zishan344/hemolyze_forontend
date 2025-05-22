import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { X } from "lucide-react";
import { FundDonation } from "../../../types/Dashboard/FundDonation.type";

interface ReceiptModalProps {
  receiptInfo: FundDonation | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReceiptModal = ({ receiptInfo, isOpen, onClose }: ReceiptModalProps) => {
  const [pdfDataUrl, setPdfDataUrl] = useState<string>("");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen && receiptInfo) {
      generatePdf(receiptInfo);
    }

    return () => {
      // Clean up
      if (pdfDataUrl) {
        URL.revokeObjectURL(pdfDataUrl);
      }
    };
  }, [isOpen, receiptInfo]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const generatePdf = (info: FundDonation) => {
    // Create a new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Set document properties
    const currentDate = new Date().toLocaleDateString();
    const donationDate = new Date(info.created_date).toLocaleDateString();

    // Add Hemolyze logo/header
    doc.setFontSize(22);
    doc.setTextColor(255, 0, 0);
    doc.text("HEMOLYZE", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Blood Donation Organization", 105, 28, { align: "center" });
    doc.setDrawColor(220, 53, 69); // Bootstrap danger red
    doc.line(20, 32, 190, 32);

    // Receipt heading
    doc.setFontSize(18);
    doc.text("DONATION RECEIPT", 105, 45, { align: "center" });

    // Receipt details
    doc.setFontSize(12);

    // Add receipt info
    const startY = 60;
    const leftMargin = 30;
    const rightCol = 90;

    doc.text("Receipt Information:", leftMargin, startY);
    doc.line(leftMargin, startY + 2, leftMargin + 50, startY + 2);

    let currentY = startY + 10;

    doc.text("Transaction ID:", leftMargin, currentY);
    doc.text(info.transaction_id, rightCol, currentY);
    currentY += 8;

    doc.text("Donor Name:", leftMargin, currentY);
    doc.text(info.username, rightCol, currentY);
    currentY += 8;

    doc.text("Donation Amount:", leftMargin, currentY);
    doc.text(`$${info.amount.toLocaleString()}`, rightCol, currentY);
    currentY += 8;

    doc.text("Donation Date:", leftMargin, currentY);
    doc.text(donationDate, rightCol, currentY);
    currentY += 8;

    doc.text("Receipt Generated:", leftMargin, currentY);
    doc.text(currentDate, rightCol, currentY);
    currentY += 25;

    // Thank you message
    doc.setFontSize(14);
    doc.text("Thank you for your generous donation!", 105, currentY, {
      align: "center",
    });
    currentY += 8;
    doc.setFontSize(12);
    doc.text(
      "Your contribution helps save lives through our blood donation programs.",
      105,
      currentY,
      { align: "center" }
    );

    // Footer
    const footerY = 250;
    doc.setDrawColor(220, 53, 69);
    doc.line(20, footerY, 190, footerY);
    doc.setFontSize(10);
    doc.text("Hemolyze - Blood Donation Organization", 105, footerY + 6, {
      align: "center",
    });
    doc.text(
      "https://hemolyze-woad.vercel.app/ | info@hemolyze.org | +1-234-567-8900",
      105,
      footerY + 12,
      { align: "center" }
    );

    // Generate data URL
    const dataUrl = doc.output("dataurlstring");
    setPdfDataUrl(dataUrl);
  };

  const handleDownload = () => {
    if (receiptInfo) {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Regenerate the PDF for download
      // (same code as in generatePdf, but calling save instead)
      // Set document properties
      const currentDate = new Date().toLocaleDateString();
      const donationDate = new Date(
        receiptInfo.created_date
      ).toLocaleDateString();

      // Add Hemolyze logo/header
      doc.setFontSize(22);
      doc.setTextColor(255, 0, 0);
      doc.text("HEMOLYZE", 105, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Blood Donation Organization", 105, 28, { align: "center" });
      doc.setDrawColor(220, 53, 69);
      doc.line(20, 32, 190, 32);

      // Receipt heading
      doc.setFontSize(18);
      doc.text("DONATION RECEIPT", 105, 45, { align: "center" });

      // Receipt details
      doc.setFontSize(12);

      // Add receipt info
      const startY = 60;
      const leftMargin = 30;
      const rightCol = 90;

      doc.text("Receipt Information:", leftMargin, startY);
      doc.line(leftMargin, startY + 2, leftMargin + 50, startY + 2);

      let currentY = startY + 10;

      doc.text("Transaction ID:", leftMargin, currentY);
      doc.text(receiptInfo.transaction_id, rightCol, currentY);
      currentY += 8;

      doc.text("Donor Name:", leftMargin, currentY);
      doc.text(receiptInfo.username, rightCol, currentY);
      currentY += 8;

      doc.text("Donation Amount:", leftMargin, currentY);
      doc.text(`$${receiptInfo.amount.toLocaleString()}`, rightCol, currentY);
      currentY += 8;

      doc.text("Donation Date:", leftMargin, currentY);
      doc.text(donationDate, rightCol, currentY);
      currentY += 8;

      doc.text("Receipt Generated:", leftMargin, currentY);
      doc.text(currentDate, rightCol, currentY);
      currentY += 25;

      // Thank you message
      doc.setFontSize(14);
      doc.text("Thank you for your generous donation!", 105, currentY, {
        align: "center",
      });
      currentY += 8;
      doc.setFontSize(12);
      doc.text(
        "Your contribution helps save lives through our blood donation programs.",
        105,
        currentY,
        { align: "center" }
      );

      // Footer
      const footerY = 250;
      doc.setDrawColor(220, 53, 69);
      doc.line(20, footerY, 190, footerY);
      doc.setFontSize(10);
      doc.text("Hemolyze - Blood Donation Organization", 105, footerY + 6, {
        align: "center",
      });
      doc.text(
        "www.hemolyze.org | info@hemolyze.org | +1-234-567-8900",
        105,
        footerY + 12,
        { align: "center" }
      );

      // Download the PDF
      doc.save(`Hemolyze_Donation_Receipt_${receiptInfo.transaction_id}.pdf`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col ${
          isClosing
            ? "opacity-0 scale-95 transition-all duration-300"
            : "opacity-100 scale-100 transition-all duration-300"
        }`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Donation Receipt Preview</h3>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {pdfDataUrl ? (
            <object
              data={pdfDataUrl}
              type="application/pdf"
              className="w-full h-[600px]">
              <p>
                Your browser does not support PDFs.
                <a href={pdfDataUrl} target="_blank" rel="noopener noreferrer">
                  Click here to download the PDF
                </a>
              </p>
            </object>
          ) : (
            <p className="text-center py-10">Loading receipt...</p>
          )}
        </div>

        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Close
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
