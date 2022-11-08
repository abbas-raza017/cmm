import { createSlice } from "@reduxjs/toolkit";

const machinesSlice = createSlice({
  name: 'machines',
  initialState: {
    machines: []
  },
  reducers: {
    addMachine: (state, action) => {
      state.machines.push(action.payload.machine as never);
    },
    removeMachine: (state, action) => {
      state.machines = state.machines.filter((m) => (m as any).id !== action.payload.id);
    },
    updateMachine: (state, action) => {
      const index = state.machines.map((m) => (m as any).id).indexOf(action.payload.machine.id);
      state.machines[index] = action.payload.machine as never;
    }
  }
});

export const addMachine = machinesSlice.actions.addMachine;
export const removeMachine = machinesSlice.actions.removeMachine;
export const updateMachine = machinesSlice.actions.updateMachine;
export default machinesSlice.reducer;
