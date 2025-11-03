import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the editor component with SSR disabled so third-party scripts run only on client
const Editor = dynamic(() => import('./Editor').then(mod => mod.default || mod), { ssr: false });

type EditorWrapperProps = {
  initialValue?: string;
  onChange?: (content: string) => void;
};

export default function EditorWrapper(props: EditorWrapperProps) {
  return <Editor {...props} />;
}
