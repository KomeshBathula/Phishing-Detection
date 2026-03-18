import { useState, useEffect } from 'react';
import { Trash2, ShieldCheck, Database, RefreshCw, CheckCircle2, Save } from 'lucide-react';
import api from '../services/api';

export default function Settings() {
  const [autoDeleteDays, setAutoDeleteDays] = useState(0); // 0 means disabled
  const [isClearing, setIsClearing] = useState(false);
  const [clearSuccess, setClearSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [groqKey, setGroqKey] = useState('');

  useEffect(() => {
    // Load initial settings
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['autoDeleteDays', 'groqApiKey'], (result) => {
        if (result.autoDeleteDays !== undefined) {
          setAutoDeleteDays(result.autoDeleteDays);
        }
        if (result.groqApiKey) {
          setGroqKey(result.groqApiKey);
        }
      });
    } else {
      const savedKey = localStorage.getItem('groqApiKey');
      if (savedKey) setGroqKey(savedKey);
    }
  }, []);

  const handleDaysChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 0) {
      setAutoDeleteDays(val);
    }
  };

  const saveSettings = () => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.set({ 
        autoDeleteDays: autoDeleteDays,
        groqApiKey: groqKey 
      }, () => {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      });
    } else {
        localStorage.setItem('groqApiKey', groqKey);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const clearHistory = async () => {
    setIsClearing(true);
    try {
      await api.clearHistory();
      if (typeof chrome !== 'undefined' && chrome.storage) {
        await new Promise(r => chrome.storage.local.set({ bypassedUrls: [] }, r));
      }
      setTimeout(() => {
        setIsClearing(false);
        setClearSuccess(true);
        setTimeout(() => setClearSuccess(false), 3000);
      }, 800);
    } catch (err) {
      console.error('Failed to clear history:', err);
      setIsClearing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyber-info to-cyber-accent">
          Data & Privacy Settings
        </h1>
        <p className="text-cyber-muted mt-2">
          Manage how the PhishGuard extension handles your local scan history.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Data Management Card */}
        <div className="glass-card rounded-xl p-6 border-l-4 border-l-cyber-info">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-cyber-info/10 rounded-lg text-cyber-info">
              <Database className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-cyber-text mb-1">Local Storage Management</h2>
              <p className="text-sm text-cyber-muted mb-4 max-w-2xl">
                All scanned URLs and results are stored locally on your machine via <code>chrome.storage</code>. 
                They are never transmitted to our servers without your explicit permission.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center p-4 bg-cyber-card rounded-lg border border-cyber-border">
                <div className="flex-1 w-full text-left">
                  <h3 className="text-sm font-semibold text-cyber-text">Clear Scan History</h3>
                  <p className="text-xs text-cyber-muted mt-1">
                    Permanently delete all locally saved URL scanning reports from your browser.
                  </p>
                </div>
                <button
                  onClick={clearHistory}
                  disabled={isClearing || clearSuccess}
                  className={`w-full sm:w-auto px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 min-w-[150px] ${
                    clearSuccess 
                      ? 'bg-cyber-safe/20 text-cyber-safe border border-cyber-safe/30' 
                      : 'bg-cyber-danger/10 text-cyber-danger border border-cyber-danger/30 hover:bg-cyber-danger/20'
                  }`}
                >
                  {isClearing ? (
                    <RefreshCw className="w-4 h-4 animate-spin-slow" />
                  ) : clearSuccess ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  {isClearing ? 'Clearing...' : clearSuccess ? 'History Cleared' : 'Clear History'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Timed Auto Delete Input */}
        <div className="glass-card rounded-xl p-6 border-l-4 border-l-cyber-accent">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 bg-cyber-accent/10 rounded-lg text-cyber-accent shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex-1 w-full text-left">
               <h2 className="text-lg font-bold text-cyber-text mb-1">Extension Configuration</h2>
               <p className="text-sm text-cyber-muted max-w-2xl mb-4">
                 Configure your personal Groq API Key and data retention policy.
               </p>
               
               <div className="space-y-4">
                 {/* API Key Input */}
                 <div className="p-4 bg-cyber-card rounded-lg border border-cyber-border">
                   <label className="text-[10px] font-bold uppercase tracking-wider text-cyber-muted block mb-2">Groq API Key (Required for AI)</label>
                   <input 
                     type="password"
                     placeholder="gsk_..."
                     value={groqKey}
                     onChange={(e) => setGroqKey(e.target.value)}
                     className="w-full bg-cyber-dark border border-cyber-border rounded px-3 py-2 text-sm text-cyber-text font-mono focus:ring-1 focus:ring-cyber-accent outline-none"
                   />
                   <p className="text-[10px] text-cyber-muted mt-2">
                     Get your free key at <a href="https://console.groq.com/" target="_blank" rel="noreferrer" className="text-cyber-accent hover:underline">console.groq.com</a>. Stored locally in your browser.
                   </p>
                 </div>

                 {/* Days Input */}
                 <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center p-4 bg-cyber-card rounded-lg border border-cyber-border">
                   <div className="flex-1 w-full flex items-center gap-3">
                     <div className="flex flex-col gap-1 w-32">
                       <label className="text-[10px] font-bold uppercase tracking-wider text-cyber-muted">Keep Data For</label>
                       <div className="relative">
                         <input 
                           type="number" 
                           min="0"
                           max="365"
                           value={autoDeleteDays}
                           onChange={handleDaysChange}
                           className="w-full bg-cyber-dark border border-cyber-border rounded px-3 py-2 text-sm text-cyber-text font-mono focus:ring-1 focus:ring-cyber-accent outline-none appearance-none"
                         />
                         <span className="absolute right-3 top-2 text-sm text-cyber-muted pointer-events-none">days</span>
                       </div>
                     </div>
                     
                     <div className="flex-1 pt-5 hidden sm:block">
                       {autoDeleteDays === 0 ? (
                         <span className="text-xs text-cyber-muted text-left block">Automated cleanup is <strong>disabled</strong>.</span>
                       ) : (
                         <span className="text-xs text-cyber-info text-left block">Cleanup every <strong>{autoDeleteDays} days</strong>.</span>
                       )}
                     </div>
                   </div>

                   <button 
                    onClick={saveSettings}
                    className="w-full sm:w-auto px-4 py-2 bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/30 hover:bg-cyber-accent/20 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 mt-2 sm:mt-0"
                   >
                     {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                     {saveSuccess ? 'Saved' : 'Save Config'}
                   </button>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
