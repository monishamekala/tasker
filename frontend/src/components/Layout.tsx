import Header from './Header';
import SyncIndicator from './SyncIndicator';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top navigation */}
      <Header />

      {/* Sync indicator / status bar */}
      <div className="p-3 flex justify-end bg-white shadow-sm border-b">
        <SyncIndicator />
      </div>

      {/* Main content area */}
      <main className="p-6 max-w-4xl mx-auto">
        {children}
      </main>
    </div>
  );
}
