import React, { useEffect, useState } from 'react';
import DeployStatusBanner from '../components/system/DeployStatusBanner';
import { projectSchema } from '../data/schemas/projectSchema';

const Dashboard = () => {
  const [deploy, setDeploy] = useState<any>(null);

  useEffect(() => {
    fetch('/deploy.json')
      .then(res => res.json())
      .then(data => setDeploy(data))
      .catch(() => setDeploy(null));
  }, []);

  const schemaCoverage = Object.keys(projectSchema.properties).length;

  return (
    <div className="p-6 space-y-6 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold">Assistant Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-semibold">Deploy Health</h2>
          {deploy ? (
            <>
              <p>Timestamp: {deploy.timestamp}</p>
              <p>JS Size: {deploy.jsSizeKB} KB</p>
              <p>CSS Size: {deploy.cssSizeKB} KB</p>
              <p>Status: ✅ {deploy.status}</p>
            </>
          ) : (
            <p>Loading deploy data…</p>
          )}
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-semibold">Schema Coverage</h2>
          <p>Project schema fields: {schemaCoverage}</p>
          <p>Schema file: <code>projectSchema.ts</code></p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-semibold">Event Scoring</h2>
          <p>Real-time scoring coming soon</p>
        </div>
      </div>

      <DeployStatusBanner />
    </div>
  );
};

export default Dashboard;