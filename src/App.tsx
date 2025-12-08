import { type CSSProperties, useState } from 'react';
import { EXAMPLES, type ExampleRunner } from './examples';

const ENV_DEFAULTS = {
  datasetId: import.meta.env.VITE_DATASET_ID ?? '',
  apiKey: import.meta.env.VITE_API_KEY ?? '',
  serverUrl: import.meta.env.VITE_SERVER_URL ?? '',
};

function App() {
  const [selectedExample, setSelectedExample] = useState('');
  const [datasetId, setDatasetId] = useState(ENV_DEFAULTS.datasetId);
  const [apiKey, setApiKey] = useState(ENV_DEFAULTS.apiKey);
  const [serverUrl, setServerUrl] = useState(ENV_DEFAULTS.serverUrl);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => { 
    setIsRunning(true);
    setOutput('');

    if (!selectedExample) {
      setOutput('Select an example to run it.');
      setIsRunning(false);
      return;
    }

    try {
      const runner: ExampleRunner | undefined = EXAMPLES.find(
        (entry) => entry.id === selectedExample
      )?.run;
      if (!runner) {
        throw new Error(`No runner registered for ${selectedExample}`);
      }

      const result = await runner({
        datasetId: datasetId || ENV_DEFAULTS.datasetId,
        apiKey: apiKey || ENV_DEFAULTS.apiKey,
        serverUrl: serverUrl || ENV_DEFAULTS.serverUrl,
      });
      const formatted =
        typeof result === 'undefined'
          ? 'undefined'
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
          <option value="">Select an example…</option>
          {EXAMPLES.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <h2>
        {EXAMPLES.find((opt) => opt.id === selectedExample)?.label ??
          'Select an example to get started'}
      </h2>

      <details open style={{ marginBottom: '20px' }}>
        <summary
          style={{
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          Connection settings
        </summary>
        <div style={{ paddingTop: '12px' }}>
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

      <p style={{ marginBottom: '12px', fontSize: '13px', color: '#555' }}>
        Tip: you can also set dataset variables in a local .env file (see .env.example).
      </p>
      
      </details>

      <button
        onClick={handleRun}
        disabled={isRunning || !selectedExample}
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
        {output || 'Select an example above, fill the fields, then click Run.'}
      </pre>
    </div>
  );
}

export default App;
