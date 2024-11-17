import api from "@utils/axiosInstance";
import { ChangeStateSalaries } from "@/Services/humanResources";

export const approveWorkflow = (humanResourceId, state,message) => {
    console.log("ApproveWorkflow => ", humanResourceId);
    const data = {
        state: state,
        message: message,
    };
    console.log("Data => ", data);
    return api.post(ChangeStateSalaries(humanResourceId), data, { requiresAuth: true });
};

export const rejectWorkflow = (humanResourceId,state, message) => {
    console.log("Human Resource Id => ", humanResourceId);
    const data = {
        state: state,
        message: message,
    };
    return api.post(ChangeStateSalaries(humanResourceId), data, { requiresAuth: true });
};