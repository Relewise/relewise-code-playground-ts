import { type CSSProperties, useState } from 'react';
import { runProductSearch } from './examples/product-search';
import { runSearchTermPrediction } from './examples/search-term-prediction';

const EXAMPLE_OPTIONS = [
  { id: 'search-term-prediction', label: 'Search Term Prediction' },
  { id: 'product-search', label: 'Product Search' },
];

type Runner = (opts: { datasetId: string; apiKey: string; serverUrl: string }) => Promise<unknown>;

const RUNNERS: Record<string, Runner> = {
  'search-term-prediction': runSearchTermPrediction,
  'product-search': runProductSearch,
};

function App() {
  const [selectedExample, setSelectedExample] = useState(EXAMPLE_OPTIONS[0].id);
  const [datasetId, setDatasetId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      const runner = RUNNERS[selectedExample];
      if (!runner) {
        throw new Error(`No runner registered for ${selectedExample}`);
      }

      const result = await runner({ datasetId, apiKey, serverUrl });
      const formatted =
        typeof result === 'undefined'
          ? 'Done.'
          : typeof result === 'string'
            ? result
            : JSON.stringify(result, null, 2);
      setOutput(formatted);
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
    setIsRunning(false);
  };

  return (
    <div style={{ padding: '10px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <label htmlFor="example" style={{ fontWeight: 600, fontSize: '14px' }}>
          Example
        </label>
        <select
          id="example"
          value={selectedExample}
          onChange={(e) => setSelectedExample(e.target.value)}
          style={{ padding: '6px 8px', fontSize: '14px' }}
        >
          {EXAMPLE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <h2>
        {EXAMPLE_OPTIONS.find((opt) => opt.id === selectedExample)?.label ??
          'Search Term Prediction'}
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label
            htmlFor="datasetId"
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Dataset ID
          </label>
          <input
            id="datasetId"
            type="text"
            value={datasetId}
            onChange={(e) => setDatasetId(e.target.value)}
            placeholder="Enter dataset ID"
            disabled={isRunning}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label
            htmlFor="apiKey"
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            API Key
          </label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter API key"
            disabled={isRunning}
            autoComplete="off"
            spellCheck={false}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              WebkitTextSecurity: 'disc',
            } as CSSProperties}
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label
            htmlFor="serverUrl"
            style={{
              display: 'block',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Server URL
          </label>
          <input
            id="serverUrl"
            type="text"
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            placeholder="Enter server URL"
            disabled={isRunning}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      <button
        onClick={handleRun}
        disabled={isRunning}
        style={{ marginBottom: '20px' }}
      >
        {isRunning ? 'Running...' : 'Run'}
      </button>

      <pre
        style={{
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          overflow: 'auto',
          minHeight: '200px',
        }}
      >
        {output || 'Click "Run" to execute the selected example'}
      </pre>
    </div>
  );
}

export default App;
