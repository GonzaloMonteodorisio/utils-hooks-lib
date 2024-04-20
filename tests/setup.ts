import { afterEach, vi, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react-hooks";
// toBeInTheDocument()

// import * as matchers from '@testing-library/jest-dom/matchers'

// expect.extend(matchers)

beforeEach(() => {
    vi.useFakeTimers()
})

afterEach(() => {
    cleanup()
    vi.clearAllMocks()
})