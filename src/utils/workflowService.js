import api from "@utils/axiosInstance";
import { ChangeStateSalaries } from "@/Services/humanResources";

export const changeStateWorkflow = (humanResourceId, state, message) => {
  const data = {
    state: state,
    message: message,
  };
  return api.post(ChangeStateSalaries(humanResourceId), data, {
    requiresAuth: true,
  });
};

// export const rejectWorkflow = (humanResourceId,state, message) => {
//     const data = {
//         state: state,
//         message: message,
//     };
//     return api.post(ChangeStateSalaries(humanResourceId), data, { requiresAuth: true });
// };
