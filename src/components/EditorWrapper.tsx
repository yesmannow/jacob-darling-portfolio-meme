import React, { lazy, Suspense } from 'react';

// Dynamically import the editor component so third-party scripts run only on client
const Editor = lazy(() => import('./Editor').then(mod => ({ default: mod.default || mod })));

type EditorWrapperProps = {
  initialValue?: string;
  onChange?: (content: string) => void;
};

export default function EditorWrapper(props: EditorWrapperProps) {
  return (
    <Suspense fallback={<div>Loading editor...</div>}>
      <Editor {...props} />
    </Suspense>
  );
}
