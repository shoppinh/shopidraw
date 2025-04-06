import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  color: string;
}

interface Room {
  id: string;
  name: string;
  participants: User[];
}

interface DrawingState {
  isDrawing: boolean;
  currentTool: 'pen' | 'eraser' | 'select';
  strokeColor: string;
  strokeWidth: number;
}

interface WhiteboardState {
  currentUser: User | null;
  currentRoom: Room | null;
  drawingState: DrawingState;
  connectedUsers: User[];
  setCurrentUser: (user: User | null) => void;
  setCurrentRoom: (room: Room | null) => void;
  setDrawingState: (state: Partial<DrawingState>) => void;
  updateConnectedUsers: (users: User[]) => void;
}

export const useStore = create<WhiteboardState>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        currentRoom: null,
        connectedUsers: [],
        drawingState: {
          isDrawing: false,
          currentTool: 'pen',
          strokeColor: '#000000',
          strokeWidth: 2,
        },
        setCurrentUser: (user) => set({ currentUser: user }),
        setCurrentRoom: (room) => set({ currentRoom: room }),
        setDrawingState: (state) =>
          set((prev) => ({
            drawingState: { ...prev.drawingState, ...state },
          })),
        updateConnectedUsers: (users) => set({ connectedUsers: users }),
      }),
      {
        name: 'whiteboard-store',
      }
    )
  )
); 