import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020203] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-2xl mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            ⚠️
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Something went wrong</h1>
          <p className="text-slate-400 max-w-md mb-4 text-sm leading-relaxed">
            The application encountered an unexpected visual rendering error. You can refresh or reload the page to restore performance.
          </p>
          {this.state.error && (
            <div className="max-w-xl w-full p-4 mb-6 bg-red-950/40 border border-red-500/30 rounded-xl text-left text-xs font-mono overflow-auto max-h-48 text-red-200">
              <p className="font-bold mb-1 text-red-400">{this.state.error.name}: {this.state.error.message}</p>
              <pre className="text-[10px] text-slate-300 opacity-80 whitespace-pre-wrap">{this.state.error.stack}</pre>
            </div>
          )}
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale-95"
          >
            Reload Website
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
