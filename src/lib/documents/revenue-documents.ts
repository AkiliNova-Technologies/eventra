export type RevenueDocumentTransaction = {
  id: string;
  event: string;
  customer: string;
  paymentMethod: string;
  amount: string;
  platformFee: string;
  netAmount: string;
  status: string;
  date: string;
};

function formatToday() {
  return new Date().toLocaleDateString("en-UG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function downloadHtmlFile(filename: string, html: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export function buildEventraInvoice(transaction: RevenueDocumentTransaction) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Eventra Invoice ${transaction.id}</title>
  ${documentStyles()}
</head>
<body>
  <main class="document">
    <header class="doc-header">
      <h1>EVENTRA</h1>
      <h2>ORGANIZER PAYMENT INVOICE</h2>
      <p>Generated ${formatToday()}</p>
    </header>

    <section class="meta-grid">
      <div>
        <span>Invoice ID</span>
        <strong>INV-${transaction.id}</strong>
      </div>
      <div>
        <span>Payment ID</span>
        <strong>${transaction.id}</strong>
      </div>
      <div>
        <span>Status</span>
        <strong>${transaction.status}</strong>
      </div>
      <div>
        <span>Payment Method</span>
        <strong>${transaction.paymentMethod}</strong>
      </div>
    </section>

    <section class="party">
      <p><strong>Customer:</strong> ${transaction.customer}</p>
      <p><strong>Event:</strong> ${transaction.event}</p>
    </section>

    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th class="right">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Gross ticket payment</td>
          <td class="right">${transaction.amount}</td>
        </tr>
        <tr>
          <td>Eventra platform fee</td>
          <td class="right">(${transaction.platformFee})</td>
        </tr>
        <tr class="total">
          <td>Net amount payable</td>
          <td class="right">${transaction.netAmount}</td>
        </tr>
      </tbody>
    </table>

    <footer>
      Eventra Pro • Secure organizer payment reporting
    </footer>
  </main>
</body>
</html>
`.trim();
}

export function buildEventraRevenueStatement() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Eventra Revenue Statement</title>
  ${documentStyles()}
</head>
<body>
  <main class="document">
    <header class="doc-header">
      <h1>EVENTRA</h1>
      <h2>ORGANIZER REVENUE STATEMENT</h2>
      <p>(In UGX, dashboard-generated values)</p>
    </header>

    <section class="period">
      <span>Period Ended</span>
      <strong>${formatToday()}</strong>
    </section>

    <table>
      <tbody>
        <tr class="section">
          <td colspan="4">1 Revenue</td>
        </tr>
        <tr>
          <td>Gross ticket revenue</td>
          <td class="right">UGX 45.2M</td>
        </tr>
        <tr>
          <td>Mobile money revenue</td>
          <td class="right">UGX 24.6M</td>
        </tr>
        <tr>
          <td>Card payment revenue</td>
          <td class="right">UGX 13.8M</td>
        </tr>
        <tr>
          <td>Bank transfer revenue</td>
          <td class="right">UGX 6.8M</td>
        </tr>

        <tr class="section">
          <td colspan="4">2 Deductions</td>
        </tr>
        <tr>
          <td>Platform fees</td>
          <td class="right">UGX 5.4M</td>
        </tr>
        <tr>
          <td>Refunds and reversals</td>
          <td class="right">UGX 0.0M</td>
        </tr>

        <tr class="section">
          <td colspan="4">3 Payouts</td>
        </tr>
        <tr>
          <td>Net earnings</td>
          <td class="right">UGX 39.8M</td>
        </tr>
        <tr>
          <td>Pending payouts</td>
          <td class="right">UGX 5.4M</td>
        </tr>

        <tr class="total">
          <td>Net amount available</td>
          <td class="right">UGX 39.8M</td>
        </tr>
      </tbody>
    </table>

    <footer>
      Eventra Pro • Organizer Revenue Statement
    </footer>
  </main>
</body>
</html>
`.trim();
}

function documentStyles() {
  return `
<style>
  body {
    margin: 0;
    background: #f8fafc;
    color: #334155;
    font-family: Arial, Helvetica, sans-serif;
    padding: 32px;
  }

  .document {
    max-width: 980px;
    margin: auto;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    padding: 56px;
  }

  .doc-header {
    text-align: center;
    margin-bottom: 56px;
  }

  .doc-header h1 {
    margin: 0;
    color: #8b5cf6;
    font-size: 28px;
    letter-spacing: 0.08em;
  }

  .doc-header h2 {
    margin: 18px 0 0;
    color: #475569;
    font-size: 28px;
    font-weight: 700;
  }

  .doc-header p {
    margin-top: 20px;
    color: #64748b;
    font-size: 16px;
  }

  .period {
    display: flex;
    justify-content: flex-end;
    gap: 32px;
    margin-bottom: 8px;
    color: #64748b;
    font-size: 18px;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin-bottom: 32px;
  }

  .meta-grid div {
    border: 1px solid #e2e8f0;
    background: #f8fafc;
    padding: 14px;
  }

  .meta-grid span {
    display: block;
    color: #64748b;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .meta-grid strong {
    display: block;
    margin-top: 8px;
    color: #334155;
    font-size: 14px;
  }

  .party {
    margin-bottom: 28px;
    font-size: 15px;
    color: #475569;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 20px;
  }

  th {
    color: #64748b;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding: 12px 8px;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 12px 8px;
    border-bottom: 1px solid #e2e8f0;
  }

  .right {
    text-align: right;
    font-weight: 600;
  }

  .section td {
    background: #e9eef3;
    color: #64748b;
    font-size: 22px;
    font-weight: 500;
    border-bottom: none;
  }

  .total td {
    font-weight: 800;
    color: #1e293b;
    border-top: 2px solid #cbd5e1;
    border-bottom: none;
  }

  footer {
    margin-top: 48px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
    color: #94a3b8;
    font-size: 12px;
    text-align: center;
  }

  @media print {
    body {
      background: #ffffff;
      padding: 0;
    }

    .document {
      border: none;
    }
  }

  @media (max-width: 720px) {
    body {
      padding: 12px;
    }

    .document {
      padding: 24px;
    }

    .meta-grid {
      grid-template-columns: 1fr;
    }

    table {
      font-size: 15px;
    }

    .doc-header h2 {
      font-size: 22px;
    }
  }
</style>
`;
}