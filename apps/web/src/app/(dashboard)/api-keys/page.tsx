'use client';

import { APIKeyModal } from '@zchemacraft/components/core/modals/api-key-modal';
import { Button } from '@zchemacraft/components/uibutton';
import React from 'react';

export default function ApiKeys() {
  const [isAPIKeyModalOpen, setAPIKeyModalOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setAPIKeyModalOpen(true)}>Create New API Key</Button>
      <APIKeyModal open={isAPIKeyModalOpen} setOpen={setAPIKeyModalOpen} />
    </div>
  );
}
