import React, { useState } from 'react';
import { PlusCircle, AlertCircle, CheckCircle } from 'lucide-react';

export default function CustomWidgetForm({ categoryName, onAddWidget }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter a widget name.');
      return;
    }
    if (!text.trim()) {
      setErrorMessage('Please enter widget text or description.');
      return;
    }

    const result = onAddWidget({
      name: name.trim(),
      text: text.trim(),
    });

    if (!result.success) {
      setErrorMessage(result.error);
    } else {
      setSuccessMessage(`Widget "${name.trim()}" successfully added!`);
      setName('');
      setText('');
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  return (
    <div className="mt-6 pt-5 border-t border-slate-200">
      <div className="flex items-center gap-2 mb-3">
        <PlusCircle className="w-4 h-4 text-sky-600" />
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Add Custom Widget to {categoryName}
        </h4>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-700 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Alert */}
      {successMessage && (
        <div className="mb-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-emerald-700 text-xs">
          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Widget Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            placeholder="e.g. S3 Bucket Encryption Rate"
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Widget Text / Metric Value <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            rows={2}
            placeholder="e.g. Encrypted: 98%, Unencrypted: 2% (2 buckets require KMS key)"
            className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Add Custom Widget
        </button>
      </form>
    </div>
  );
}
