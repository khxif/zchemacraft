'use client';

import { MockAPIModal } from '@zchemacraft/components/core/modals/mock-api-modal';
import { Button } from '@zchemacraft/components/uibutton';
import { useIsMobile } from '@zchemacraft/hooks/use-mobile';
import { useState } from 'react';
import { MockAPISlider } from '../../../../../packages/components/src/core/mobile-sliders/mock-api-slider';

export default function MockAPI() {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <Button onClick={() => setIsModalOpen(true)}>Create API</Button>
      {isMobile ? (
        <MockAPISlider open={isModalOpen} setOpen={setIsModalOpen} />
      ) : (
        <MockAPIModal open={isModalOpen} setOpen={setIsModalOpen} />
      )}
    </main>
  );
}
