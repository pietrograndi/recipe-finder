// vitest.setup.ts

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest'

vi.mock('next/router', () => ({
  useRouter: vi.fn()
}))